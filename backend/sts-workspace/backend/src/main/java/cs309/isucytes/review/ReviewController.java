package cs309.isucytes.review;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ReviewController {

	@Autowired
    ReviewRepository reviewRepository;

	@RequestMapping(method = RequestMethod.POST, path = "/reviews/new")
	public @ResponseBody String addNewReview (@RequestBody Review review) {
		reviewRepository.save(review);
		return "Saved";
	}
	
	@RequestMapping(method = RequestMethod.GET, path = "/reviews/get")
	public @ResponseBody Iterable<Review> getAllReviews(){
		return reviewRepository.findAll();
	}
	 
}
