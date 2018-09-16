package org.springframework.samples.petclinic.ta;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "expertise")
public class Expertise {

    @Id
    private int exp_id;

    private String exp_name;

    private int ta_id;

	public int getExp_id() {
		return exp_id;
	}

	public void setExp_id(int exp_id) {
		this.exp_id = exp_id;
	}

	public String getExp_name() {
		return exp_name;
	}

	public void setExp_name(String exp_name) {
		this.exp_name = exp_name;
	}

	public int getTa_id() {
		return ta_id;
	}

	public void setTa_id(int ta_id) {
		this.ta_id = ta_id;
	}
    
    
}
