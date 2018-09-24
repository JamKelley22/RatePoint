package cs309.isucytes.review;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ReviewController {

	@RequestMapping("/test")
	public String sayHi() {
		return "TEST";
	}
	
}
