package payroll;


import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;


//JPA annotation to make this object ready to store
@Entity
class Employee {

	//attributes for domain object marked with JPA annotations
	private @Id @GeneratedValue Long id;
	private String name;
	private String role;

	Employee(String name, String role) {
		this.name = name;
		this.role = role;
	}
}
