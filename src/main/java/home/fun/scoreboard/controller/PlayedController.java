package home.fun.scoreboard.controller;

import home.fun.scoreboard.model.Played;
import home.fun.scoreboard.service.PlayedService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/played")
public class PlayedController {
    public final PlayedService playedService;
    public static final String SUBMIT_PLAYED_GAME_ENDPOINT = "/submit";

    public PlayedController(PlayedService playedService) {
        this.playedService = playedService;
    }

    @PostMapping(SUBMIT_PLAYED_GAME_ENDPOINT)
    public Boolean submitPlayedGame(@RequestBody List<Played> playedGames) {
        return playedService.submitPlayedGames(playedGames);
    }
}
