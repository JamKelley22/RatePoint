package cs309.isucytes.review;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table
public class Review {
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private Integer id;
	
	@Column
	private Integer poi;

	@Column
	private Integer rating;
	
	@Column
	private String title;
	
	@Column
	private String body;
	
	@Column 
	private String author;

	public Integer getId() {
		return this.id;
	}
	
	public void setId(Integer id) {
		this.id = id;
	}
	
	public Integer getPoi() {
		return this.poi;
	}
	
	public void setPoi(Integer poi) {
		this.poi = poi;
	}
	
	public Integer getRating() {
		return this.rating;
	}
	
	public void setRating(Integer rating) {
		this.rating = rating;
	}
	
	public String getTitle() {
		return this.title;
	}
	
	public void setTitle(String title) {
		this.title = title;
	}
	
	public String getBody() {
		return this.body;
	}
	
	public void setBody(String body) {
		this.body = body;
	}
	
	public String getAuthor() {
		return author;
	}

	public void setAuthor(String author) {
		this.author = author;
	}
	
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
