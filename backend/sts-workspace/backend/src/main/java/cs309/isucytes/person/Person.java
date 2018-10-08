package cs309.isucytes.person;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

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
	 * The person's username, also primary key for this example.
	 */
	@Id
	private String username;

	/**
	 * A person's name
	 */
	@Column
	private String name;

	/**
	 * A person's email
	 */
	@Column
	private String email;

	/**
	 * A hashed password
	 */
	@Column
	private String password;

	/**
	 * A short biography about a person.
	 */
	@Column
	private String biography;

	/**
	 * Get's the person's username
	 * 
	 * @return a username as a string
	 */
	public String getUsername() {
		return username;
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
}
