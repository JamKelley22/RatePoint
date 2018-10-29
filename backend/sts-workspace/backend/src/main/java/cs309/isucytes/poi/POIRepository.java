package cs309.isucytes.poi;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface POIRepository extends JpaRepository<POI, Integer> {
	// Only need to define methods here if we need specific 
	// queries. Fine to leave blank for now
}