package cs309.isucytes.person;

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
import javax.persistence.OneToMany;
import javax.persistence.Table;

import cs309.isucytes.userlist.Userlist;

/**
 * Represents a person in our SQL table
 * 
 * @author Sam Stifter
 *
 */
@Entity
@Table
public class Person {

	/**
	 * The unique identifier for a person
	 */
	@Id
	@Column
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;

	/**
	 * The person's username, also primary key for this example.
	 */
	@Column(length=30, unique=true, nullable=false)
	private String username;

	/**
	 * A person's name
	 */
	@Column
	private String name;

	/**
	 * A person's email
	 */
	@Column(unique=true)
	private String email;

	/**
	 * A hashed password
	 */
	@Column(nullable=false)
	private String password;

	/**
	 * A short biography about a person.
	 */
	@Column
	private String biography;
	
	/**
	 * Role that the user is assigned (0 = user, 1 = mod, 2 = admin);
	 */
	@Column
	private Integer role;

	@OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	@JoinColumn(name = "listuser")
	private List<Userlist> lists = new ArrayList<>();
	
	/**
	 * get the unique identifier of a person
	 * 
	 * @return ID of the person
	 */
	public Integer getId() {
		return id;
	}

	/**
	 * Get's the person's username
	 * 
	 * @return a username as a string
	 */
	public String getUsername() {
		return username;
	}

	/**
	 * Change a person's username
	 * 
	 * @param username new username
	 */
	public void setUsername(String username) {
		this.username = username;
	}

	/**
	 * Changes a person's username.
	 * 
	 * @param username New username
	 */
	public void setId(String username) {
		this.username = username;
	}

	/**
	 * gets a person name.
	 * 
	 * @return Name in a String
	 */
	public String getName() {
		return name;
	}

	/**
	 * Changes a person's display name
	 * 
	 * @param name new display name for user
	 */
	public void setName(String name) {
		this.name = name;
	}

	/**
	 * Gets the email for a user.
	 * 
	 * @return email in a string
	 */
	public String getEmail() {
		return email;
	}

	/**
	 * Sets a new email for a person
	 * 
	 * @param email email to change to
	 */
	public void setEmail(String email) {
		this.email = email;
	}

	/**
	 * Gets a hash of the user password.
	 * 
	 * @return password hash
	 */
	public String getPassword() {
		return password;
	}

	/**
	 * Set a new password for the user.
	 * 
	 * @param password hashed password
	 */
	public void setPassword(String password) {
		this.password = password;
	}

	/**
	 * Get the Biography that a user has written about themselves.
	 * 
	 * @return String with the biography.
	 */
	public String getBiography() {
		return biography;
	}

	/**
	 * Set a new biography for a user.
	 * 
	 * @param biography new biography for user
	 */
	public void setBiography(String biography) {
		this.biography = biography;
	}

	/**
	 * Gets a users role as an int
	 * 
	 * @return the role
	 */
	public Integer getRole() {
		return role;
	}

	/**
	 * Updates the users role (integer)
	 * 
	 * @param role the role to set
	 */
	public void setRole(Integer role) {
		this.role = role;
	}

	/**
	 * Get the lists a user owns
	 * 
	 * @return the lists
	 */
	public List<Userlist> getLists() {
		return lists;
	}

	/**
	 * Updates the lists that a user has
	 * 
	 * @param lists the lists to set
	 */
	public void setLists(List<Userlist> lists) {
		this.lists = lists;
	}
	
	/**
	 * Updates the person with the given person's info. Does not change ID.
	 * 
	 * @param person person to update the called object with.
	 */
	public void update(Person person) {
		if (person.getUsername() != null) {
			this.username = person.getUsername();
		}
		
		if (person.getName() != null) {
			this.name = person.getName();
		}
		
		if (person.getEmail() != null) {
			this.email = person.getEmail();
		}
		
		if (person.getPassword() != null) {
			this.password = person.getPassword();
		}
		
		if (person.getBiography() != null) {
			this.biography = person.getBiography();
		}
		
		if (person.getRole() != null) {
			this.role = person.getRole();
		}
		
		if (person.getLists() != null && !person.getLists().isEmpty()) {
			this.lists = person.getLists();
		}
	}
}
