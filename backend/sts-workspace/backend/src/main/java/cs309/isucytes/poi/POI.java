package cs309.isucytes.poi;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import cs309.isucytes.userlist.Userlist;

@Entity
@Table
public class POI {

	/**
	 * The id associated with a unique POI. 
	 */
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column
	private Integer id;

	/**
	 * The name given to the POI. 
	 */
	@Column
	private String name;

	/**
	 * The description of the POI. 
	 */
	@Column
	private String description;

	/**
	 * Cooridinates of the POI. Stored as latitude, longitude. 
	 */
	@Column
	private String coordinates;

	/**
	 * This field determines if the POI is approved to be viewed on the page.
	 */
	@Column
	private Boolean approved;

	/**
	 * This field holds the Imgur URL for the image associated with the POI.
	 */
	@Column
	private String pictures;

	@ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL, mappedBy = "poilist")
	private List<Userlist> listsBelongingTo;


	/**
	 * Returns the id of a POI. 
	 * @return The id of the POI. 
	 */
	public Integer getId() {
		return id;
	}

	/**
	 * Sets the id of a POI.
	 * @param id The id to set.  
	 */
	public void setId(Integer id) {
		this.id = id;
	}

	/**
	 * Returns the name of the POI. 
	 * @return the name of the POI. 
	 */
	public String getName() {
		return name;
	}

	/**
	 * Sets the name of the POI.
	 * @param name The name to set for the POI. 
	 */
	public void setName(String name) {
		this.name = name;
	}

	/**
	 * Gets the description of a POI. 
	 * @return The description of a POI.
	 */
	public String getDescription() {
		return description;
	}

	/**
	 * Sets the description of the POI
	 * @param description The new description of a POI.
	 */
	public void setDescription(String description) {
		this.description = description;
	}

	/**
	 * Gets the Coordinates of the POI. 
	 * @return The coordinates of the POI. 
	 */
	public String getCoordinates() {
		return coordinates;
	}

	/**
	 * Sets the coordinates of the POI.
	 * @param coordinates the new coordinates for the POI.
	 */
	public void setCoordinates(String coordinates) {
		this.coordinates = coordinates;
	}

	/**
	 * Gets the approved field from a POI.
	 * @return the approved field from the POI.
	 */
	public Boolean getApproved() {
		return approved;
	}

	/**
	 * Set the approved field of the POI.
	 * @param approved a boolean parameter that 
	 */
	public void setApproved(Boolean approved) {
		this.approved = approved;
	}

	/**
	 * Gets the picture field for a POI.
	 * @return A string field for the POI.
	 */
	public String getPictures() {
		return pictures;
	}

	/**
	 * Set the picture field of the POI given a string.
	 * @param pictures The picture field to be stored.
	 */
	public void setPictures(String pictures) {
		this.pictures = pictures;
	}

	/**
	 * Updates the POI given a poi object.
	 * @param poi The POI whose values you want in the updated POI.
	 */
	public void update(POI poi) {
		if(poi.getName() != null ) {
			this.name = poi.getName();
		}

		if(poi.getDescription() != null ) {
			this.description = poi.getDescription();
		}

		if(poi.getCoordinates() != null ) {
			this.coordinates = poi.getCoordinates();
		}

		if(poi.getApproved() != null ) {
			this.approved = poi.getApproved();
		}

		if(poi.getPictures() != null ) {
			this.pictures = poi.getPictures();
		}
	}
}
