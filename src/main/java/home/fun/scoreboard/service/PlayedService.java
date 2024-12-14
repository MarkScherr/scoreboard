package home.fun.scoreboard.service;

import home.fun.scoreboard.model.Played;
import home.fun.scoreboard.repository.PlayedRepository;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
public class PlayedService {
    private final PlayedRepository playedRepository;

    public PlayedService(PlayedRepository playedRepository) {
        this.playedRepository = playedRepository;
    }

    @Transactional
    public Boolean submitPlayedGames(List<Played> playedGames) {
        boolean isSuccessful = true;
        for (Played played : playedGames) {
            Integer id = playedRepository.save(played).getPlayedId();
            if (id == null) {
                isSuccessful = false;
            }
        }
        return isSuccessful;
    }
}
