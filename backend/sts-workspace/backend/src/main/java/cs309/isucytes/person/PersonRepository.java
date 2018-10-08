package cs309.isucytes.person;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repository class for Person objects.
 * 
 * @author Sam Stifter
 *
 */
@Repository
public interface PersonRepository extends JpaRepository<Person, String> {
	// Only need to define methods here if we need specific queries.
}
