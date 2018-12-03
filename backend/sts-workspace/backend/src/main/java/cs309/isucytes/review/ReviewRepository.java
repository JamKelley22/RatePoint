package cs309.isucytes.review;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Repository class for <code>Review</code> domain objects All method names are compliant with Spring Data naming
 * conventions so this interface can easily be extended for Spring Data See here: http://static.springsource.org/spring-data/jpa/docs/current/reference/html/jpa.repositories.html#jpa.query-methods.query-creation
 */
@Repository
public interface ReviewRepository extends JpaRepository<Review, Integer> {
	/**
	 * This query returns a list of Reviews given a POI.
	 * @param poi the POI field to search for in all reviews.
	 * @return the list of reviews whose POI field match the argument's. 
	 */
	public List<Review> findByPoi(Integer poi);	
	
	/**
	 * This SQL query returns the average rating of the reviews whose POI field
	 * matches the argument's.
	 * @param poi The POI field to find reviews by.
	 * @return A double of all the averages for the reviews found. 
	 */
	@Query("select avg(r.rating) from Review r where r.poi = :poi")
	public Double avgReviewsByPoiId(@Param("poi") Integer poi);
	
	/**
	 * This query returns a list of Reviews that have flagged set to true.
	 * @param flagged The boolean parameter to find Reviews by.
	 * @return A list of reviews that are flagged if flagged is set to true. 
	 */
	public List<Review> findByFlagged(boolean flagged);
}
