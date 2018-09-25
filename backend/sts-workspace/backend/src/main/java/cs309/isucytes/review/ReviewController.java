package cs309.isucytes.review;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ReviewController {

	@Autowired
    ReviewRepository reviewRepository;

	@RequestMapping("/test")
	public String sayHi() {
		return "TEST";
	}

	@RequestMapping(method = RequestMethod.POST, path = "/reviews/new")
	public @ResponseBody String addNewReview (@RequestParam Integer poi, @RequestParam Integer rating, 
			@RequestParam String title, @RequestParam String body) {
		// @ResponseBody means the returned String is the response, not a view name
		// @RequestParam means it is a parameter from the GET or POST request
		Review r = new Review();
		r.setPoi(poi);
		r.setRating(rating);
		r.setTitle(title);
		r.setBody(body);
		reviewRepository.save(r);
		return "Saved";
	}
	
	@RequestMapping(method = RequestMethod.GET, path = "/reviews/get")
	public @ResponseBody Iterable<Review> getAllReviews(){
		return reviewRepository.findAll();
	}
	 
}
