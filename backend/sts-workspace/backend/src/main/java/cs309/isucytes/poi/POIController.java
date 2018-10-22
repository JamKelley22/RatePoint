package cs309.isucytes.poi;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import cs309.isucytes.poi.POI;
import cs309.isucytes.poi.POIRepository;


@RestController
@RequestMapping(path = "/pois")
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
	@RequestMapping(method = RequestMethod.GET, path = "/get/{id}")
	public Optional<POI> getPOIByID(@PathVariable("id") Integer id) {
		return POIRepository.findById(id);
	}
	
	/**
	 * Adds a POI to the db
	 * 
	 * @param poi New POI to be added
	 * @return a string that is returned on success
	 */
	@ResponseBody
	@RequestMapping(method = RequestMethod.POST, path = "/new")
	public String addNewPOI (@RequestBody POI poi) {
		POIRepository.save(poi);
		return "You Saved " + poi.getName();
	}
	
	/**
	 * Gets a JSON list of all POIS
	 * 
	 * @return a JSON list of all POIS
	 */
	@ResponseBody
	@RequestMapping(method = RequestMethod.GET, path = "/get")
	public Iterable<POI> getAllPOIs(){
		return POIRepository.findAll();
	}
	
	/**
	 * Deletes a POI, if any, that matches id
	 * 
	 * @param id id of the POI to be deleted
	 * @return a String that is returned on success for deleting a POI
	 */
	@ResponseBody
	@RequestMapping(method = RequestMethod.DELETE, path = "/delete/{id}")
	public String deletePOI(@PathVariable("id") Integer id){
		POIRepository.deleteById(id);
		return "You deleted a POI!";
	}

}
