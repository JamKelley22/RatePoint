package cs309.isucytes.person;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
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
	@RequestMapping(method = RequestMethod.POST, path = "person/new")
	public String newPerson(@RequestBody Person person) {
		personRepository.save(person);
		return "Person " + person.getName() + " saved.";
	}

	/**
	 * Get a list of all people in the DB
	 * 
	 * @return JSON array of all people in the DB
	 */
	@ResponseBody
	@RequestMapping(method = RequestMethod.GET, path = "person/get")
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
	@RequestMapping(method = RequestMethod.GET, path = "person/get/{username}")
	public Optional<Person> getPersonById(@PathVariable("username") String username) {
		return personRepository.findById(username);
	}

}
