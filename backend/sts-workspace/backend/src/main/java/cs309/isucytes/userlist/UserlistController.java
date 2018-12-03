package cs309.isucytes.userlist;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

/**
 * The Controller for UserLists
 */
@RestController
@RequestMapping(path = "/lists")
public class UserlistController {

	/**
	 * Creates an instance of the repository to perform queries.
	 */
	@Autowired
	UserlistRepository userlistRepository;

	/**
	 * Gets a list with the given ID
	 * 
	 * @param id ID to look for
	 * @return List if found, 404 if not
	 */
	@CrossOrigin(origins="*")
	@ResponseBody
	@RequestMapping(method = RequestMethod.GET, path = "/{id}")
	public ResponseEntity<Userlist> getUserlistByID(@PathVariable("id") Integer id) {
		Optional<Userlist> getList = userlistRepository.findById(id);
		if (getList.isPresent()) {
			return new ResponseEntity<>(getList.get(), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
		}
	}

	/**
	 * Updates a list at the given id, but IDs themselves can't be updated.
	 * 
	 * @param id ID to look for
	 * @param userlist new User List
	 * @return Userlist if updated, 404 if not found
	 */
	@CrossOrigin(origins="*")
	@ResponseBody
	@RequestMapping(method = RequestMethod.PUT, path = "/{id}")
	public ResponseEntity<Userlist> updateUserlist(@PathVariable("id") Integer id, @RequestBody Userlist userlist) {
		Optional<Userlist> getList = userlistRepository.findById(id);
		if (getList.isPresent()) {
			getList.get().update(userlist);
			userlistRepository.save(getList.get());
			return new ResponseEntity<>(getList.get(), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
		}
	}

	/**
	 * Delete the list at the id
	 * @param id ID to look for
	 * @return List that was deleted, or 404 if it didn't exist.
	 */
	@CrossOrigin(origins="*")
	@ResponseBody
	@RequestMapping(method = RequestMethod.DELETE, path = "/{id}")
	public ResponseEntity<Userlist> deleteUserlist(@PathVariable("id") Integer id) {
		Optional<Userlist> getList = userlistRepository.findById(id);
		if (getList.isPresent()) {
			userlistRepository.deleteById(id);
			return new ResponseEntity<>(getList.get(), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
		}
	}
}