package cs309.isucytes.poi;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * This class handles any queries we want for POIRepository.
 */
@Repository
public interface POIRepository extends JpaRepository<POI, Integer> {
	/**
	 * This query will return a POI given coordinates
	 * @param coordinates
	 * 	The coordinates to search for
	 * @return
	 * 	Optional POI object
	 */
	public Optional<POI> findByCoordinates(String coordinates);
	
	/**
	 * This query returns POI that have approved matching the specified value
	 * 
	 * @param approved Value of Approved to search for
	 * @return List of POIs matching approved
	 */
	public List<POI> findByApproved(Boolean approved);
}