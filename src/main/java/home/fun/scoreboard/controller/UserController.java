package home.fun.scoreboard.controller;

import home.fun.scoreboard.model.User;
import home.fun.scoreboard.model.dto.HighScoreDto;
import home.fun.scoreboard.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {
    private static final String CREATE_USER_ENDPOINT = "/submit";
    private static final String GET_HIGH_SCORES_ENDPOINT = "/highScores/{isFoosball}";
    private static final String GET_ALL_USERS_ENDPOINT = "/findAll";

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping(CREATE_USER_ENDPOINT)
    public User addUser(@RequestBody User user) {
        return userService.addUser(user.getUserName());
    }

    @GetMapping(GET_HIGH_SCORES_ENDPOINT)
    public List<HighScoreDto> getHighScores(@PathVariable Boolean isFoosball) {
        return userService.getHighScores(isFoosball);
    }

    @GetMapping(GET_ALL_USERS_ENDPOINT)
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }
}
