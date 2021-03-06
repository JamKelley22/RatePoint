package cs309.isucytes.poi;

import java.util.Collections;
import java.util.List;
import java.util.Map;
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
import cs309.isucytes.review.Review;
import cs309.isucytes.review.ReviewRepository;

/**
 *This class handles the end points for POIs. 
 */
@RestController
@RequestMapping(path = "/pois")
public class POIController {
	
	/**
	 * Connection to the database for POI table.
	 */
	@Autowired
    POIRepository POIRepository;
	
	/**
	 * Connection to the database for Review table. 
	 */
	@Autowired
	ReviewRepository reviewRepository;
	
	/**
	 * Returns a POI, if any, given an id
	 * 
	 * @param id ID to search for
	 * @return a POI that matched with the id 
	 */
	@CrossOrigin
	@ResponseBody
	@RequestMapping(method = RequestMethod.GET, path = "/{id}")
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
	 * @return an HTTP status code 
	 */
	@CrossOrigin
	@ResponseBody
	@RequestMapping(method = RequestMethod.POST)
	public ResponseEntity<?> addNewPOI (@RequestBody POI poi) {
		//if the poi we are about to add is not found, then we add it
		if(poi.getApproved() == null) {
			poi.setApproved(false);
		}
		if(POIRepository.findByCoordinates(poi.getCoordinates()).isPresent() == false) {
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
	@CrossOrigin
	@ResponseBody
	@RequestMapping(method = RequestMethod.GET)
	public List<POI> getAllPOIs(){
		return POIRepository.findAll();
	}
	
	/**
	 * Deletes a POI, if any, that matches id
	 * 
	 * @param id id of the POI to be deleted
	 * @return an HTTP status code
	 */
	@CrossOrigin
	@ResponseBody
	@RequestMapping(method = RequestMethod.DELETE, path = "/{id}")
	public ResponseEntity<?> deletePOIByID(@PathVariable("id") Integer id) {
		Optional<POI> getPOI = POIRepository.findById(id);
		if(getPOI.isPresent()) {
			POIRepository.deleteById(id);
			return new ResponseEntity<>(getPOI.get(), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
		}
	}
	
	/**
	 * Update a POI, if any, that matches id
	 * @param poi the POI that will be updated
	 * @param id id of the POI to be updated
	 * @return an HTTP status code
	 * 	 
	 */
	@CrossOrigin
	@ResponseBody
	@RequestMapping(method = RequestMethod.PUT, path = "/{id}")
	public ResponseEntity<POI> updatePOI(@PathVariable("id") Integer id, @RequestBody POI poi) {
		Optional<POI> getPOI = POIRepository.findById(id);
		if(getPOI.isPresent()) {
			getPOI.get().update(poi);
			POIRepository.save(getPOI.get());
			return new ResponseEntity<>(getPOI.get(), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
		}
	}
	
	/**
	 * Calculates the average rating of all reviews for a POI given its id.
	 * @param id the id of the POI.
	 * @return the average rating of all reviews for a POI.
	 */
	@CrossOrigin
	@ResponseBody
	@RequestMapping(method = RequestMethod.GET, path = "/{id}/average")
	public ResponseEntity<Map<String, String>> getAverageRating(@PathVariable("id") Integer id){
		Optional<POI> getPOI = POIRepository.findById(id);
		List<Review> getReviews = reviewRepository.findByPoi(id);
		if (!getPOI.isPresent()) {
			return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
		}
		
		if (getReviews.isEmpty()) {
			return new ResponseEntity<>(Collections.singletonMap("average", "0.0"), HttpStatus.OK);
		}
		
		Double d = new Double(reviewRepository.avgReviewsByPoiId(id));
		return new ResponseEntity<>(Collections.singletonMap("average", d.toString()), HttpStatus.OK);
	}
	
	/**
	 * Gets a list of POIs that are not approved. Useful for the Moderation queue.
	 * 
	 * @return List of POIS with approved=false
	 */
	@CrossOrigin
	@ResponseBody
	@RequestMapping(method = RequestMethod.GET, path = "/notapproved")
	public List<POI> getPOIsNotApproved() {
		return POIRepository.findByApproved(false);
	}
}
