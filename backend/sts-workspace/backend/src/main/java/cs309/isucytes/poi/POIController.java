package cs309.isucytes.poi;

import java.util.List;
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

import cs309.isucytes.poi.POI;
import cs309.isucytes.poi.POIRepository;


@CrossOrigin
@RestController
@RequestMapping(path = "/pois/")
public class POIController {
	
	@Autowired
    POIRepository POIRepository;
	
	/**
	 * Returns a POI, if any, given an id
	 * 
	 * @param id ID to search for
	 * @return a POI that matched with the id 
	 */
	@ResponseBody
	@RequestMapping(method = RequestMethod.GET, path = "{id}")
	public ResponseEntity<?> getPOIByID(@PathVariable("id") Integer id) {
		Optional<POI> getPOI = POIRepository.findById(id);
		if(getPOI.isPresent()) {
			return new ResponseEntity<>(getPOI.get(), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
		}
	}
	
	/**
	 * Adds a POI to the db
	 * 
	 * @param poi New POI to be added
	 * @return a string that is returned on success
	 */
	@ResponseBody
	@RequestMapping(method = RequestMethod.POST)
	public ResponseEntity<?> addNewPOI (@RequestBody POI poi) {
		//if the poi we are about to add is not found, then we add it
		if(this.getPOIByID(poi.getId()).getStatusCode() == HttpStatus.NOT_FOUND) {
			POIRepository.save(poi);
			Optional<POI> getPOI = POIRepository.findById(poi.getId());
			return new ResponseEntity<>(getPOI.get(), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(null, HttpStatus.CONFLICT);
		}
	}
	
	/**
	 * Gets a JSON list of all POIS
	 * 
	 * @return a JSON list of all POIS
	 */
	@ResponseBody
	@RequestMapping(method = RequestMethod.GET)
	public List<POI> getAllPOIs(){
		return POIRepository.findAll();
	}
	
	/**
	 * Deletes a POI, if any, that matches id
	 * 
	 * @param id id of the POI to be deleted
	 * @return a String that is returned on success for deleting a POI
	 */
	@ResponseBody
	@RequestMapping(method = RequestMethod.DELETE, path = "{id}")
	public ResponseEntity<?> deletePOIByID(@PathVariable("id") Integer id) {
		Optional<POI> getPOI = POIRepository.findById(id);
		if(getPOI.isPresent()) {
			POIRepository.deleteById(id);
			return new ResponseEntity<>(getPOI.get(), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
		}
	}

}
