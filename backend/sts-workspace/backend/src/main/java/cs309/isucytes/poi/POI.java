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

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column
	private Integer id;

	@Column
	private String name;

	@Column
	private String description;

	@Column
	private String coordinates;

	@Column
	private Boolean approved;

	@Column
	private String pictures;

	@ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL, mappedBy = "poilist")
	private List<Userlist> listsBelongingTo;


	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getCoordinates() {
		return coordinates;
	}

	public void setCoordinates(String coordinates) {
		this.coordinates = coordinates;
	}

	public Boolean getApproved() {
		return approved;
	}

	public void setApproved(Boolean approved) {
		this.approved = approved;
	}

	public String getPictures() {
		return approved;
	}

	public void setPictures(String pictures) {
		this.pictures = pictures;
	}

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
