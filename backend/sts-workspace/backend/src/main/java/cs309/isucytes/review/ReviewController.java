package cs309.isucytes.review;

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

import cs309.isucytes.poi.POIRepository;

/**
 * This class controls the end points for Reviews. 
 *
 */
@RestController
@RequestMapping(path = "/reviews")
public class ReviewController {

	/**
	 * Connection to the database for review table on the DB.
	 */
	@Autowired
    ReviewRepository reviewRepository;
	
	/**
	 * Connection to the database for POI table on the DB.
	 */
	@Autowired
	POIRepository POIRepository; 

	/**
	 * Takes in a new review to add to the database.
	 * @param review New review to be added.
	 * @return the JSON object and the proper HTTP status
	 */
	@CrossOrigin
	@ResponseBody
	@RequestMapping(method = RequestMethod.POST)
	public ResponseEntity<Review> addNewReview(@RequestBody Review review) {
		if(POIRepository.findById(review.getPoi()).isPresent()){
			reviewRepository.save(review);
			Optional<Review> getReview = reviewRepository.findById(review.getId());
			return new ResponseEntity<>(getReview.get(), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
		}
	}
	
	/**
	 * Returns all reviews in the database.
	 * @return An array of JSON reviews.
	 */
	@CrossOrigin
	@ResponseBody
	@RequestMapping(method = RequestMethod.GET)
	public List<Review> getAllReviews(){
		return reviewRepository.findAll();
	}
	
	/**
	 * Returns all reviews in the database relating to a specific POI, if any.
	 * @param PoiID the id of the POI we are trying to get reviews from. 
	 * @return An array of JSON reviews for a POI.
	 */
	@CrossOrigin
	@ResponseBody
	@RequestMapping(method = RequestMethod.GET, path = "/poi/{id}")
	public List<Review> getAllReviewsByPOI(@PathVariable("id") int PoiID){
		return reviewRepository.findByPoi(PoiID);
	}
	
	/**
	 * Gets a review by its id, if it exits.
	 * @param id id to search for
	 * @return Review with the specified id, if any, and proper HTTP status.
	 */
	@CrossOrigin
	@ResponseBody
	@RequestMapping(method = RequestMethod.GET, path = "/{id}")
	public ResponseEntity<Review> getReviewByID(@PathVariable("id") int id){
		Optional<Review> getReview = reviewRepository.findById(id);
		if(getReview.isPresent()) {
			return new ResponseEntity<>(getReview.get(), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
		}
	}
	
	/**
	 * This method gets all reviews that are flagged. 
	 * @return the list of all reviews that are flagged
	 */
	@CrossOrigin
	@ResponseBody
	@RequestMapping(method = RequestMethod.GET, path = "/flagged")
	public List<Review> getAllFlaggedReviews(){
		//loop thru review and return those that are null 
		return reviewRepository.findByFlagged(true);
	}
	
	/**
	 * Deletes a review, if any, in the database given an id.
	 * @param id id to search for
	 * @return Deleted review and an HTTP status. 
	 */
	@CrossOrigin
	@ResponseBody
	@RequestMapping(method = RequestMethod.DELETE, path = "/{id}")
	public ResponseEntity<Review> deleteReviewByID(@PathVariable("id") Integer id) {
		Optional<Review> getReview = reviewRepository.findById(id);
		if(getReview.isPresent()) {
			reviewRepository.deleteById(id);
			return new ResponseEntity<>(getReview.get(), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
		}
	}
	
	/**
	 * Updates a review, if any, in the database given an id.
	 * @param id the id to search for.
	 * @param review the review that will be updated.
	 * @return Updated review and an HTTP status. 
	 */
	@CrossOrigin
	@ResponseBody
	@RequestMapping(method = RequestMethod.PUT, path = "/{id}")
	public ResponseEntity<Review> updateReview(@PathVariable("id") Integer id, @RequestBody Review review) {
		Optional<Review> getReview = reviewRepository.findById(id);
		if(getReview.isPresent()) {
			getReview.get().updateReview(review);
			reviewRepository.save(getReview.get());
			return new ResponseEntity<>(getReview.get(), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
		}
	}
}
