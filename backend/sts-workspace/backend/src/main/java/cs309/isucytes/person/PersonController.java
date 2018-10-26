package cs309.isucytes.person;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/people")
public class PersonController {

	@Autowired
	PersonRepository personRepository;

	/**
	 * Takes in a new person to add to the database
	 * 
	 * @param person New person to be added
	 * @return success message upon completion.
	 */
	@ResponseBody
	@RequestMapping(method = RequestMethod.POST, path = "/")
	public ResponseEntity<?> newPerson(@RequestBody Person person) {
		if (this.getPersonById(person.getUsername()).getStatusCode() == HttpStatus.NOT_FOUND) {
			personRepository.save(person);
			return new ResponseEntity<>(person, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(null, HttpStatus.CONFLICT);
		}
	}

	/**
	 * Get a list of all people in the DB
	 * 
	 * @return JSON array of all people in the DB
	 */
	@ResponseBody
	@RequestMapping(method = RequestMethod.GET, path = "/")
	public List<Person> getAllPeople() {
		return personRepository.findAll();
	}

	/**
	 * Finds a Person by username, if they exist.
	 * 
	 * @param username username to search for
	 * @return Person with the username, if they exist.
	 */
	@ResponseBody
	@RequestMapping(method = RequestMethod.GET, path = "/{username}")
	public ResponseEntity<?> getPersonById(@PathVariable("username") String username) {
		Optional<Person> getPerson = personRepository.findByUsername(username);
		if (getPerson.isPresent()) {
			return new ResponseEntity<>(getPerson.get(), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
		}
	}

}
