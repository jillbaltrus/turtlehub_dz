import NavBar from "../NavBar";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router";
import {
  findUserByIdThunk,
  logoutThunk,
  profileThunk,
  updateUserThunk
} from "../services/user-thunks";
import {Divider, HStack, Text, useToast} from "@chakra-ui/react";
import {
  Balloon,
  ChatLeft,
  Envelope,
  GearFill,
  Phone
} from "react-bootstrap-icons";
import {Button} from "react-bootstrap";
import {FIND_USER_ERROR} from "../reducers/user-reducer";
import UpcomingEvents from "./UpcomingEvents";

function MyProfile() {
  const {user} = useParams();
  const {error, currentUser} = useSelector((state) => state.user);
  const [profile, setProfile] = useState(currentUser);
  const [isCurrentUsersProfile, setIsCurrentUsersProfile] = useState(
      currentUser && currentUser.username === user
  );
  const [editMode, setEditMode] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthday, setBirthday] = useState('');
  const [bio, setBio] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [admin, setAdmin] = useState(false);
  const [privateProfile, setPrivateProfile] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const dateOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };

  useEffect(() => {
    if (currentUser !== null && currentUser !== undefined) {
      setUsername(currentUser.username);
      setPassword(currentUser.password);
      setFirstName(currentUser.firstName);
      setLastName(currentUser.lastName);
      setBirthday(currentUser.birthday);
      setBio(currentUser.bio);
      setEmail(currentUser.email);
      setPhone(currentUser.phone);
      setAdmin(currentUser.admin);
      setPrivateProfile(currentUser.private);
    }
  }, [currentUser]);

  useEffect(() => {
    if (profile !== null && profile !== undefined) {
      setUsername(profile.username);
      setPassword(profile.password);
      setFirstName(profile.firstName);
      setLastName(profile.lastName);
      setBirthday(profile.birthday);
      setBio(profile.bio);
      setEmail(profile.email);
      setPhone(profile.phone);
      setAdmin(profile.admin);
      setPrivateProfile(profile.private);
    }
  }, [profile]);

  useEffect(() => {
        if (error === FIND_USER_ERROR) {
          navigate('/members');
          toast({
            position: 'top',
            title: 'User not found',
            description: `The user ${user} does not exist`,
            status: 'error',
            duration: 9000,
            isClosable: true,
          });
        }
      },
      [error]);

  useEffect(() => {
    async function getProfile() {
      const {payload} = await dispatch(profileThunk());
      setProfile(payload);
    }

    async function getProfileById(user) {
      const {payload} = await dispatch((findUserByIdThunk(user)));
      if (payload === undefined || payload === null) {
        return;
      }
      setProfile(payload);
    }

    if (user) {
      if (currentUser && currentUser._id === user) {
        setIsCurrentUsersProfile(true);
      }
      getProfileById(user);
      return;
    }
    getProfile();
    setIsCurrentUsersProfile(true);
  }, []);

  function save() {
    const newProfile = {
      "_id": profile._id,
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
    dispatch(updateUserThunk(newProfile));
    setEditMode(false);
    toast({
      position: 'top',
      title: 'Profile saved',
      status: 'success',
      duration: 9000,
      isClosable: true,
    });
  }

  async function logOut() {
    await dispatch(logoutThunk());
    navigate("/login");
  }

  function getAge(birthdayString) {
    const today = new Date();
    const birthday = new Date(birthdayString);
    const age = today.getFullYear() - birthday.getFullYear();
    const monthDifference = today.getMonth() - birthday.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 &&
        today.getDate() < birthday.getDate())) {
      return age - 1;
    }
    return age;
  }

  return (
      <div className="row">
        <NavBar active={isCurrentUsersProfile ? "profile" : "members"}/>
        <div className="col-6">
          {!editMode &&
              <>
                <Text fontSize="5xl" className={"m-2 mb-0 pb-0"}>{firstName
                    + " " + lastName}</Text>
                <Divider borderWidth={'2px'} borderColor={'#75bde0'}/>
                {bio.length > 0 &&
                    <HStack className="m-3 mb-0">
                      <ChatLeft className="mb-1" size={35}></ChatLeft>
                      <Text fontSize="2xl" className="m-3">{bio}</Text>
                    </HStack>
                }
                <HStack className="m-3 mb-0 mt-0">
                  <Balloon className="mb-1" size={35}></Balloon>
                  <Text fontSize="2xl" className="m-3">Born {new Date(
                      birthday).toLocaleDateString("en-US",
                      dateOptions)} ({getAge(birthday)} years old)</Text>
                </HStack>
                {(isCurrentUsersProfile || !privateProfile) &&
                    <>
                      <HStack className="m-3 mb-0 mt-0">
                        <Phone className="mb-1" size={35}></Phone>
                        <Text fontSize="2xl" className="m-3">Phone
                          number: {phone}</Text>
                      </HStack>
                      <HStack className="m-3 mt-0">
                        <Envelope className="mb-1" size={35}></Envelope>
                        <Text fontSize="2xl"
                              className="m-3">Email: {email}</Text>
                      </HStack>
                    </>
                }
                <Divider borderWidth={'2px'} borderColor={'#75bde0'}/>
              </>
          }
          {editMode &&
              <>
                <div>
                  <div>
                    <label className="form-label" htmlFor="first-name-input">First
                      Name</label>
                    <input type="text" id="first-name-input"
                           value={firstName} className="form-control"
                           onChange={(event) => setFirstName(
                               event.target.value)}/>
                  </div>
                  <div>
                    <label className="form-label" htmlFor="last-name-input">Last
                      Name</label>
                    <input type="text" id="last-name-input"
                           className="form-control"
                           value={lastName}
                           onChange={(event) => setLastName(
                               event.target.value)}/>
                  </div>
                  <div className="form-group mb-1">
                    <label className="form-label"
                           htmlFor="username-input">Username:</label>
                    <input className="form-control" id="username-input"
                           type="text" value={username}
                           onChange={(event) => setUsername(
                               event.target.value)}/>
                  </div>
                  <div className="form-group mb-1">
                    <label className="form-label"
                           htmlFor="password-input">Password:</label>
                    <input className="form-control" id="password-input"
                           type="text" value={password}
                           onChange={(event) => setPassword(
                               event.target.value)}/>
                  </div>
                  <div className="form-group mb-1">
                    <label className="form-label"
                           htmlFor="email-input">Email:</label>
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
                           id="date-input"
                           value={birthday.toString().split('T')[0]}
                           onChange={(event) => setBirthday(
                               event.target.value)}/>
                  </div>
                  <div className="form-group mb-1">
                    <label htmlFor="bio-input"
                           className="form-label">Bio:</label>
                    <textarea className="form-control" id="bio-input" rows="3"
                              value={bio}
                              onChange={(event) => setBio(event.target.value)}>
                    </textarea>
                  </div>
                  <div className="form-check form-switch form-control-lg pb-0">
                    <input className="form-check-input custom-switches"
                           checked={admin}
                           type="checkbox"
                           role="switch"
                           id="admin-switch"
                           onChange={() => setAdmin(!admin)}/>
                    <label className="form-check-label" htmlFor="admin-switch">
                      Are you an administrator?
                    </label>
                  </div>
                  <div className="form-check form-switch form-control-lg pb-0">
                    <input className="form-check-input custom-switches"
                           checked={privateProfile}
                           type="checkbox"
                           role="switch"
                           id="private-profile-switch"
                           onChange={() => setPrivateProfile(!privateProfile)}/>
                    <label className="form-check-label"
                           htmlFor="private-profile-switch">
                      Hide your email and phone number from others?
                    </label>
                  </div>
                </div>
                <div className="text-center m-3">
                  <Button onClick={logOut}>
                    Log out
                  </Button>
                  <Button onClick={save}>Save</Button>
                  <Button onClick={() => setEditMode(false)}>Cancel</Button>
                </div>
              </>
          }
          {!editMode && <UpcomingEvents user={profile}/>}

        </div>
        {isCurrentUsersProfile ?
            <div className={"col-2 float-left"}>
              <GearFill role="button" onClick={() => setEditMode(true)}
                        size={32}
                        className={'float-left mt-2'}></GearFill>
            </div>
            : ''}
      </div>
  );
}

export default MyProfile;