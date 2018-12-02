package cs309.isucytes.review;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * This class defines a review entry in our database. 
 *
 */
@Entity
@Table
public class Review {
	
	/**
	 * Id column on Review.
	 */
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private Integer id;
	
	/**
	 * POI column on Review.
	 */
	@Column
	private Integer poi;

	/**
	 * Column to store the rating for a review.
	 */
	@Column
	private Integer rating;
	
	/**
	 * Column to store the title for a review. 
	 */
	@Column
	private String title;
	
	/**
	 * Column to store the body for a review.
	 */
	@Column
	private String body;
	
	/**
	 * Column to store the author for a review. 
	 */
	@Column 
	private String author;

	/**
	 * Gets the id of a review.
	 * @return the id of a review.
	 */
	public Integer getId() {
		return this.id;
	}
	
	/**
	 * Sets the id of a review.
	 * @param id the id to set. 
	 */
	public void setId(Integer id) {
		this.id = id;
	}
	
	/**
	 * Gets the POI from a review.
	 * @return the POI the review was posted in.
	 */
	public Integer getPoi() {
		return this.poi;
	}
	
	/**
	 * Sets the poi field of a review.
	 * @param poi POI field to set.
	 */
	public void setPoi(Integer poi) {
		this.poi = poi;
	}
	
	/**
	 * Gets the rating value for a review.
	 * @return an Integer rating value for a review. 
	 */
	public Integer getRating() {
		return this.rating;
	}
	
	/**
	 * Sets the rating for a review.
	 * @param rating the rating to set. 
	 */
	public void setRating(Integer rating) {
		this.rating = rating;
	}
	
	/**
	 * Gets the title of a review.
	 * @return the title of a review.
	 */
	public String getTitle() {
		return this.title;
	}
	
	/**
	 * Sets the title of a review.
	 * @param title gets the title of a review. 
	 */
	public void setTitle(String title) {
		this.title = title;
	}
	
	/**
	 * Gets the body of a review.
	 * @return the body of a review.
	 */
	public String getBody() {
		return this.body;
	}
	
	/**
	 * Sets the body of a review.
	 * @param body the body to set in a review. 
	 */
	public void setBody(String body) {
		this.body = body;
	}
	
	/**
	 * Gets the author corresponding to a review. 
	 * @return the author of a review.
	 */
	public String getAuthor() {
		return author;
	}

	/**
	 * Sets the author of a review. 
	 * @param author the new author to set. 
	 */
	public void setAuthor(String author) {
		this.author = author;
	}
	
	/**
	 * This method updates a review given a review object.
	 * @param review This review object contains all fields that the new review will contain.
	 */
	public void updateReview(Review review) { 
		if (review.getPoi() != null) {
			this.poi = review.getPoi();
		}
		
		if (review.getRating() != null) {
			this.rating = review.getRating();
		}
		
		if (review.getTitle() != null) {
			this.title = review.getTitle();
		}
		
		if (review.getBody() != null) {
			this.body = review.getBody();
		}
	}	
}
