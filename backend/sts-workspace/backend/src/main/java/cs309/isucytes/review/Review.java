package cs309.isucytes.review;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Review {
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private Integer id;
	
	private Integer poi;

	private Integer rating;
	
	private String title;
	
	private String body;
	
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
	
}
