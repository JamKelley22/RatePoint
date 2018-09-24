package cs309.isucytes.review;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ReviewController {

	@Autowired
    ReviewRepository reviewRepository;

	@RequestMapping("/test")
	public String sayHi() {
		return "TEST";
	}
	
	//post controller
	@RequestMapping(method = RequestMethod.POST, path = "/reviews/new")
	public String saveReview(Review review) {
		reviewRepository.save(review);
		return "New Review " + review.getTitle() + " saved";
	}
	 
}
