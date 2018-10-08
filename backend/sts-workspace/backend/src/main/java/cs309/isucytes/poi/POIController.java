package cs309.isucytes.poi;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import cs309.isucytes.poi.POI;
import cs309.isucytes.poi.POIRepository;

@RestController
@RequestMapping("/poi")
public class POIController {
	
	@Autowired
    POIRepository POIRepository;
	
	//not yet complete
	@RequestMapping(method = RequestMethod.GET, path = "/{id}")
	String getIdByValue(@PathVariable Integer id) {
		return "ID is " + id;
	}
	
	@RequestMapping(method = RequestMethod.POST, path = "/new")
	public @ResponseBody String addNewReview (@RequestParam String name, @RequestParam String description, 
			@RequestParam String coordinates, @RequestParam Boolean approved) {
		POI poiToCreate = new POI();
		poiToCreate.setName(name);
		poiToCreate.setDescription(description);
		poiToCreate.setCoordinates(coordinates);
		poiToCreate.setApproved(approved);
		POIRepository.save(poiToCreate);
		return "Saved";
	}

}
