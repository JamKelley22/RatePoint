package cs309.isucytes.userlist;

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
public class UserList {
	
	@Id
	@Column
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;
	
	@Column(nullable = false)
	private String listname;
	
	@ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	@JoinTable(name = "listitems",
    	joinColumns = { @JoinColumn(name = "list_id") },
    	inverseJoinColumns = { @JoinColumn(name = "poi_id") })
	private List<POI> poilist;

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
	
	
	
}
