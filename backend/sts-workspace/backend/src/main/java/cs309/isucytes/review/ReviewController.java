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
	
	@ResponseBody
	@RequestMapping(method = RequestMethod.GET)
	public List<Review> getAllReviews(){
		return reviewRepository.findAll();
	}
	
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
	 
}
