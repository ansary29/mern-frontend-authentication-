import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import styles from "./styles.module.css";


function Main() {


  const [number, setNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!number || !dateOfBirth || !gender || !age) {
      return alert("Please fill all the fields !")
    }
    try {
      const response = await axios.post("https://mern-login-register-profile.herokuapp.com/profile", {
        number, dateOfBirth, gender, age
      });
      setNumber('');
      setDateOfBirth('');
      setGender('');
      setAge('');
      toast.success(response.data)
    } catch (err) {
      toast.error(err.response.data);
    }
  }

	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};

  return (
    <div   >
		<div  >
		<nav className={styles.navbar}>
				<h1>Welcome </h1>
				<button className={styles.white_btn} onClick={handleLogout}>
					Logout
				</button>
			</nav>
	<div className={styles.profile_form_container}  >
      <form onSubmit={handleSubmit} >
        <div class="form-group">
          <h2 className="pro">Profile Update</h2>
          <label>Mobile Number</label>
          <input
            type="text"
            class="form-control"
            placeholder="**********"
            minLength="10"
            value={number}
            className={styles.input}
            onChange={e => setNumber(e.target.value)}
          />
        </div>
        <div class="form-group">
          <label>Date of Birth</label>
          <input
            type="date"
            class="form-control"
            value={dateOfBirth}
            className={styles.input}
            onChange={e => setDateOfBirth(e.target.value)}
          />
        </div>
        <div class="form-group">
          <p>Gender</p>
          <input type="radio" name="gender" value="gender" className={styles.input}
            onChange={e => setGender(e.target.value)}
          /> Male &nbsp;
          <input type="radio" name="gender" value="gender" className={styles.input}
            onChange={e => setGender(e.target.value)}
          /> Female &nbsp;
          <input type="radio" name="gender" value="gender" className={styles.input}
            onChange={e => setGender(e.target.value)}
          /> Transgender
        </div>
        <div class="form-group">
          <label>Age</label>
          <input
            type="text"
            class="form-control"
            placeholder="Age"
            value={age}
            className={styles.input}
            onChange={e => setAge(e.target.value)}
          />
        </div>
        <button type="submit" class="btn btn-success">Update</button>
      </form>
    </div>
  </div>
</div>
  )
}

export default Main;
