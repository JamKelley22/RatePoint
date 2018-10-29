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

@CrossOrigin
@RestController
@RequestMapping(path = "/reviews")
public class ReviewController {

	@Autowired
    ReviewRepository reviewRepository;

	/**
	 * Takes in a new review to add to the database.
	 * @param review New review to be added.
	 * @return the JSON object and the proper HTTP status
	 */
	@ResponseBody
	@RequestMapping(method = RequestMethod.POST)
	public ResponseEntity<?> addNewReview(@RequestBody Review review) {
		if(this.getReviewByID(review.getId()).getStatusCode() == HttpStatus.NOT_FOUND) {
			reviewRepository.save(review);
			Optional<Review> getReview = reviewRepository.findById(review.getId());
			return new ResponseEntity<>(getReview.get(), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(null, HttpStatus.CONFLICT);
		}
	}
	
	/**
	 * Returns all reviews in the database.
	 * @return An array of JSON reviews.
	 */
	@ResponseBody
	@RequestMapping(method = RequestMethod.GET)
	public List<Review> getAllReviews(){
		return reviewRepository.findAll();
	}
	
	/**
	 * Returns all reviews in the database relating to a specific POI, if any.
	 * @return An array of JSON reviews for a POI.
	 */
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
	@ResponseBody
	@RequestMapping(method = RequestMethod.GET, path = "/{id}")
	public ResponseEntity<?> getReviewByID(@PathVariable("id") int id){
		Optional<Review> getReview = reviewRepository.findById(id);
		if(getReview.isPresent()) {
			return new ResponseEntity<>(getReview.get(), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
		}
	}
	
	/**
	 * Deletes a review, if any, in the database given an id.
	 * @param id id to search for
	 * @return Deleted review and an HTTP status. 
	 */
	@ResponseBody
	@RequestMapping(method = RequestMethod.DELETE, path = "/{id}")
	public ResponseEntity<?> deleteReviewByID(@PathVariable("id") Integer id) {
		Optional<Review> getReview = reviewRepository.findById(id);
		if(getReview.isPresent()) {
			reviewRepository.deleteById(id);
			return new ResponseEntity<>(getReview.get(), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
		}
	}
}
