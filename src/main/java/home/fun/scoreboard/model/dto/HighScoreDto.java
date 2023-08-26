package home.fun.scoreboard.model.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class HighScoreDto {
    private String userName;
    private Integer wins;
    private Integer losses;
    private Integer totalPlayedGames;
    private Double weightedRanking;
}
