package cs309.isucytes.person;

import java.util.Optional;

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
	public Optional<Person> findByUsername(String username);
	
	public Optional<Person> findByEmail(String email);
}
