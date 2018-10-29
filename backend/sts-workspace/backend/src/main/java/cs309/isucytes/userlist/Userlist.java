package cs309.isucytes.userlist;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import cs309.isucytes.poi.POI;

@Entity
@Table
public class Userlist {

	@Id
	@Column
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;

	@Column(nullable = false)
	private String listname;

	@ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	@JoinTable(name = "listitems", joinColumns = { @JoinColumn(name = "listid") }, inverseJoinColumns = {
			@JoinColumn(name = "poiid") })
	private List<POI> poilist = new ArrayList<>();

	@Column
	private Integer listuser;

	/**
	 * @return the listname
	 */
	public String getListname() {
		return listname;
	}

	/**
	 * @param listname the listname to set
	 */
	public void setListname(String listname) {
		this.listname = listname;
	}

	/**
	 * @return the id
	 */
	public Integer getId() {
		return id;
	}

	/**
	 * @return the poilist
	 */
	public List<POI> getPoilist() {
		return poilist;
	}

	/**
	 * @param poilist the poilist to set
	 */
	public void setPoilist(List<POI> poilist) {
		this.poilist = poilist;
	}

	/**
	 * @param poi poi to add to the list
	 */
	public void addPoi(POI poi) {
		poilist.add(poi);
	}

	/**
	 * @return the listuser
	 */
	public Integer getListuser() {
		return listuser;
	}

	/**
	 * @param listuser the listuser to set
	 */
	public void setListuser(Integer listuser) {
		this.listuser = listuser;
	}

	/**
	 * Updates the list with the given list object. Ignores null values.
	 * 
	 * @param userlist values to update to
	 */
	public void update(Userlist userlist) {
		if (userlist.getListname() != null) {
			this.listname = userlist.getListname();
		}

		if (userlist.getListuser() != null) {
			this.listuser = userlist.getListuser();
		}

		if (userlist.getPoilist() != null && !userlist.getPoilist().isEmpty()) {
			this.poilist = userlist.getPoilist();
		}
	}
}
