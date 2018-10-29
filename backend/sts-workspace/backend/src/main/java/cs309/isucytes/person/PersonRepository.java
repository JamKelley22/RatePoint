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
public interface PersonRepository extends JpaRepository<Person, Integer> {
	// Only need to define methods here if we need specific queries.

	/**
	 * Looks up a person by the given username
	 * 
	 * @param username username to search for
	 * @return Optional Person object
	 */
	public Optional<Person> findByUsername(String username);

	/**
	 * Looks up a user by email
	 * 
	 * @param email email to look for
	 * @return Optional Person object
	 */
	public Optional<Person> findByEmail(String email);

	/**
	 * deletes a person by their username
	 * @param username username to look for
	 * @return
	 */
	public Optional<Person> deleteByUsername(String username);
}
