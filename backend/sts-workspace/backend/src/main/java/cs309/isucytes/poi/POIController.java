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
	
	@ResponseBody
	@RequestMapping(method = RequestMethod.GET, path = "/get/{id}")
	public Optional<POI> getPOIByID(@PathVariable("id") Integer id) {
		return POIRepository.findById(id);
	}
	
	@ResponseBody
	@RequestMapping(method = RequestMethod.POST, path = "/new")
	public String addNewPOI (@RequestBody POI poi) {
		POIRepository.save(poi);
		return "You Saved " + poi.getName();
	}
	
	@ResponseBody
	@RequestMapping(method = RequestMethod.GET, path = "/get")
	public Iterable<POI> getAllPOIs(){
		return POIRepository.findAll();
	}
	
	@ResponseBody
	@RequestMapping(method = RequestMethod.DELETE, path = "/delete/{id}")
	public String deletePOI(@PathVariable("id") Integer id){
		POIRepository.deleteById(id);
		return "You deleted a POI!";
	}

}
