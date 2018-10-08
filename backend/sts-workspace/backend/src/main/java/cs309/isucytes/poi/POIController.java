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
	
	
	@RequestMapping(method = RequestMethod.GET, path = "/get/{id}")
	public Optional<POI> getIdByValue(@PathVariable("id") Integer id) {
		return POIRepository.findById(id);
	}
	
	@RequestMapping(method = RequestMethod.POST, path = "/new")
	public @ResponseBody String addNewReview (@RequestBody POI poi) {
		POIRepository.save(poi);
		return "You Saved " + poi.getName();
	}
	
	@RequestMapping(method = RequestMethod.GET, path = "/get")
	public @ResponseBody Iterable<POI> getAllPOIs(){
		return POIRepository.findAll();
	}

}
