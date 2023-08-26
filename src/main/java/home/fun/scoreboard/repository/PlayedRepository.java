package home.fun.scoreboard.repository;

import home.fun.scoreboard.model.Played;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PlayedRepository extends JpaRepository<Played, Integer> {
    List<Played> findByIsFoosballTrue();
    List<Played> findByIsFoosballFalse();
}
