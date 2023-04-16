import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {registerThunk} from "../services/user-thunks";
import {Button} from "react-bootstrap";

function RegistrationForm() {
  const [enableButton, setEnableButton] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthday, setBirthday] = useState(undefined);
  const [bio, setBio] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [admin, setAdmin] = useState(false);
  const [privateProfile, setPrivateProfile] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    const user = {
      "username": username,
      "password": password,
      "firstName": firstName,
      "lastName": lastName,
      "birthday": birthday,
      "bio": bio,
      "email": email,
      "phone": phone,
      "admin": admin,
      "private": privateProfile,
    }
    await dispatch(registerThunk(user));
  };

  useEffect(() => {
        setEnableButton(username.length > 0 && password.length > 3
            && firstName.length > 0 && lastName.length > 0 && birthday
            && email.length > 4 && phone.length > 3);
      },
      [username, password, firstName, lastName, birthday, email,
        phone]);

  return (
      <>
        <div className="form-group mb-1">
          <label className="form-label"
                 htmlFor="username-input">Username:</label>
          <input className="form-control" id="username-input"
                 type="text" value={username}
                 onChange={(event) => setUsername(event.target.value)}/>
        </div>
        <div className="form-group mb-1">
          <label className="form-label"
                 htmlFor="password-input">Password:</label>
          <input className="form-control" id="password-input"
                 type="password" value={password}
                 onChange={(event) => setPassword(event.target.value)}/>
          <p>Must be at least 3 characters.</p>
        </div>
        <div className="form-group mb-1">
          <label className="form-label" htmlFor="first-name-input">First
            name:</label>
          <input className="form-control" id="first-name-input"
                 type="text" value={firstName}
                 onChange={(event) => setFirstName(event.target.value)}/>
        </div>
        <div className="form-group mb-1">
          <label className="form-label" htmlFor="last-name-input">Last
            name:</label>
          <input className="form-control" id="last-name-input"
                 type="text" value={lastName}
                 onChange={(event) => setLastName(event.target.value)}/>
        </div>
        <div className="form-group mb-1">
          <label className="form-label" htmlFor="email-input">Email:</label>
          <input className="form-control" id="email-input"
                 type="text" value={email}
                 onChange={(event) => setEmail(event.target.value)}/>
        </div>
        <div className="form-group mb-1">
          <label className="form-label" htmlFor="phone-input">Phone
            number:</label>
          <input className="form-control" type={"number"}
                 value={phone} id="phone-input"
                 onChange={(event) => setPhone(event.target.value)}/>
        </div>
        <div className="form-group mb-1">
          <label htmlFor="date-input" className="form-label">
            Birthday:
          </label>
          <input type="date" className="form-control"
                 id="date-input" value={birthday}
                 onChange={(event) => setBirthday(event.target.value)}/>
        </div>
        <div className="form-group mb-1">
          <label htmlFor="bio-input" className="form-label">Bio:</label>
          <textarea className="form-control" id="bio-input" rows="3"
                    value={bio}
                    onChange={(event) => setBio(event.target.value)}>
            </textarea>
        </div>
        <div className="form-check form-switch form-control-lg pb-0">
          <input className="form-check-input custom-switches" type="checkbox"
                 role="switch"
                 id="admin-switch"
                 onChange={() => setAdmin(!admin)}/>
          <label className="form-check-label" htmlFor="admin-switch">
            Are you an administrator?
          </label>
        </div>
        <div className="form-check form-switch form-control-lg pb-0">
          <input className="form-check-input custom-switches" type="checkbox"
                 role="switch"
                 id="private-profile-switch"
                 onChange={() => setPrivateProfile(!privateProfile)}/>
          <label className="form-check-label" htmlFor="private-profile-switch">
            Display your email and phone number to others?
          </label>
        </div>
        <div className="text-center m-3">
          <Button disabled={!enableButton}
                  onClick={handleSubmit}>Register</Button>
        </div>
      </>
  );
}

export default RegistrationForm;