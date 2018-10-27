package cs309.isucytes.userlist;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserlistRepository extends JpaRepository<Userlist, Integer> {
	// Only need to define methods here if we need specific 
	// queries. Fine to leave blank for now
}
