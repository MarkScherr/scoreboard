package home.fun.scoreboard.service;

import home.fun.scoreboard.model.Played;
import home.fun.scoreboard.model.User;
import home.fun.scoreboard.model.dto.HighScoreDto;
import home.fun.scoreboard.repository.PlayedRepository;
import home.fun.scoreboard.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class UserService {
    private final PlayedRepository playedRepository;
    private final UserRepository userRepository;


    public UserService(PlayedRepository playedRepository,
                       UserRepository userRepository) {
        this.playedRepository = playedRepository;
        this.userRepository = userRepository;
    }

    public User addUser(String userName) {
        User user = new User();
        user.setUserName(userName);
        return userRepository.save(user);
    }


    public List<HighScoreDto> getHighScores(Boolean isFoosball) {
        List<Played> playedList= isFoosball ?
                playedRepository.findByIsFoosballTrue() :
                playedRepository.findByIsFoosballFalse();
        return calculateTopScoreList(playedList);
    }

    private List<HighScoreDto> calculateTopScoreList(List<Played> playedList) {
        List<HighScoreDto> highScores = new ArrayList<>();
        Map<Integer, HighScoreDto> userMap = new HashMap<>();
        for (Played played : playedList) {
            Integer userId = played.getUserId();
            Boolean isWin= played.getIsWin();
            Integer wins = isWin ? 1 : 0;
            Integer losses = isWin ? 0 : 1;
            Integer totalPlayedGames = 1;
            if (userMap.containsKey(userId)) {
                wins = userMap.get(userId).getWins() + wins;
                losses = userMap.get(userId).getLosses() + losses;
                totalPlayedGames = userMap.get(userId).getTotalPlayedGames() + totalPlayedGames;
            }
            HighScoreDto highScore = HighScoreDto.builder()
                    .userName(userRepository.findById(userId).get().getUserName())
                    .wins(wins)
                    .losses(losses)
                    .totalPlayedGames(totalPlayedGames)
                    .build();
            userMap.put(userId, highScore);
        }
        for (Integer key : userMap.keySet()) {
            highScores.add(userMap.get(key));
        }
        double winPercentageAverage = determineAverageWinPercentage(highScores);
        sortByWeightedAverage(highScores, winPercentageAverage);

        return highScores;
    }

    private double determineAverageWinPercentage(List<HighScoreDto> highScores) {
        double averageWinPercentage = 0.0;
        double totalWinPercentage = 0.0;
        for (HighScoreDto highScoreDto : highScores) {
            Integer wins = highScoreDto.getWins();
            totalWinPercentage = (double) wins / (wins + highScoreDto.getLosses()) + totalWinPercentage;
        }
        return totalWinPercentage / highScores.size();
    }

    private void sortByWeightedAverage(List<HighScoreDto> highScores, double winPercentageAverage) {
        for (HighScoreDto highScore : highScores) {
            highScore.setWeightedRanking(calculatedWeightedRanking(highScore, winPercentageAverage));
        }
        highScores.sort(Comparator.comparing(HighScoreDto::getWeightedRanking).reversed());
    }

    private Double calculatedWeightedRanking(HighScoreDto highScore, double winPercentageAverage) {
        Integer wins = highScore.getWins();
        Integer losses = highScore.getLosses();
       return (wins + 420 * winPercentageAverage) / (wins + losses + 420);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}
