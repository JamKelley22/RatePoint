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

import cs309.isucytes.userlist.Userlist;

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
	@RequestMapping(method = RequestMethod.POST, path = "/people")
	public ResponseEntity<Person> newPerson(@RequestBody Person person) {
		if (this.getPersonByUsername(person.getUsername()).getStatusCode() == HttpStatus.NOT_FOUND) {
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
	@RequestMapping(method = RequestMethod.GET, path = "/people")
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
	@RequestMapping(method = RequestMethod.GET, path = "/people/{username}")
	public ResponseEntity<Person> getPersonByUsername(@PathVariable("username") String username) {
		Optional<Person> getPerson = personRepository.findByUsername(username);
		if (getPerson.isPresent()) {
			return new ResponseEntity<>(getPerson.get(), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
		}
	}

	/**
	 * Delete a person by a given Username
	 * 
	 * @param username username to delete passed in URL
	 * @return username if deleted, nothing if not found, along with HTTP codes
	 */
	@ResponseBody
	@RequestMapping(method = RequestMethod.DELETE, path = "/people/{username}")
	public ResponseEntity<Person> deletePersonByUsername(@PathVariable("username") String username) {
		Optional<Person> getPerson = personRepository.findByUsername(username);
		if (getPerson.isPresent()) {
			personRepository.deleteByUsername(username);
			return new ResponseEntity<>(getPerson.get(), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
		}
	}
	
	@ResponseBody
	@RequestMapping(method = RequestMethod.POST, path = "/people/{username}/lists")
	public ResponseEntity<Person> addNewUserList (@PathVariable("username") String username, @RequestBody Userlist userlist) {
		Optional<Person> getPerson = personRepository.findByUsername(username);
		if (getPerson.isPresent()) {
			List<Userlist> personList = getPerson.get().getLists();
			personList.add(userlist);
			getPerson.get().setLists(personList);
			personRepository.save(getPerson.get());
			return new ResponseEntity<>(getPerson.get(), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
		}
	}
	
	/**
	 * Update the person at the given username with the given information. Checks
	 * for conflicts on emails and usernames.
	 * 
	 * @param username Username of profile to update.
	 * @param person   Information to update with.
	 * @return person if update, 404 if not found, 409 if email or username
	 *         conflict.
	 */
	@ResponseBody
	@RequestMapping(method = RequestMethod.PUT, path = "/people/{username}")
	public ResponseEntity<Person> updatePerson (@PathVariable("username") String username, @RequestBody Person person) {
		Optional<Person> getPerson = personRepository.findByUsername(username);
		if (getPerson.isPresent()) {
			String potentialUsername = person.getUsername();
			String potentialEmail = person.getEmail();
			
			if (potentialUsername != null && !potentialUsername.equals(getPerson.get().getUsername()) && personRepository.findByUsername(potentialUsername).isPresent()) {
				return new ResponseEntity<>(null, HttpStatus.CONFLICT);
			}
			
			if (potentialEmail != null && !potentialEmail.equals(getPerson.get().getEmail()) && personRepository.findByEmail(potentialEmail).isPresent() ) {
				return new ResponseEntity<>(null, HttpStatus.CONFLICT);
			}
			
			getPerson.get().update(person);
			personRepository.save(getPerson.get());
			
			return new ResponseEntity<>(getPerson.get(), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
		}
	}
	
	/**
	 * Verify's a person login by their username
	 * 
	 * @param username username to search for
	 * @return Person if the login succeeds, 404 if no user found, 401 if incorrect
	 *         password if login fails (i.e. password does not match.
	 */
	@ResponseBody
	@RequestMapping(method = RequestMethod.PUT, path = "/verify")
	public ResponseEntity<Person> verifyPersonLogic(@RequestBody Person person) {
		Optional<Person> getPerson = personRepository.findByUsername(person.getUsername());
		if (getPerson.isPresent()) {
			if (getPerson.get().getPassword().equals(person.getPassword())) {
				return new ResponseEntity<>(getPerson.get(), HttpStatus.OK);
			}
			return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
		} else {
			return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
		}
	}
}
