package home.fun.scoreboard.model;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name="played")
public class Played {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "played_id")
    private Integer playedId;
    @Column(name = "user_id")
    private Integer userId;
    @Column(name = "is_win")
    private Boolean isWin;
    @Column(name = "is_foosball")
    private Boolean isFoosball;
    @Column(name = "points_for")
    private Integer pointsFor;
    @Column(name = "points_against")
    private Integer pointsAgainst;
}
