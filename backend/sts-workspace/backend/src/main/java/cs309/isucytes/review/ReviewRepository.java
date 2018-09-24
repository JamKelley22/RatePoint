package cs309.isucytes.review;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

/**
 * Repository class for <code>Review</code> domain objects All method names are compliant with Spring Data naming
 * conventions so this interface can easily be extended for Spring Data See here: http://static.springsource.org/spring-data/jpa/docs/current/reference/html/jpa.repositories.html#jpa.query-methods.query-creation
 */
@Repository
public interface ReviewRepository extends JpaRepository<Review, Integer> {

	//query to return everything from review table
    @Query("SELECT r FROM Review")
    public List<Review> returnAll();
}
