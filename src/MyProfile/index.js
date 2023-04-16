import NavBar from "../NavBar";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router";
import {
  findUserByUsernameThunk,
  logoutThunk,
  profileThunk,
  updateUserThunk
} from "../services/user-thunks";
import {useToast} from "@chakra-ui/react";
import {GearFill} from "react-bootstrap-icons";
import {Button} from "react-bootstrap";
import {FIND_USER_ERROR} from "../reducers/user-reducer";

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
  const [birthday, setBirthday] = useState(undefined);
  const [bio, setBio] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [admin, setAdmin] = useState(false);
  const [privateProfile, setPrivateProfile] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

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

    async function getProfileByUsername(user) {
      const {payload} = await dispatch((findUserByUsernameThunk(user)));
      if (payload === undefined || payload === null) {
        return;
      }
      setProfile(payload);
    }

    console.log('reloading page');
    if (user) {
      if (currentUser && currentUser.username === user) {
        setIsCurrentUsersProfile(true);
      }
      getProfileByUsername(user);
      return;
    }
    console.log('about to get profile');
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
  }

  async function logOut() {
    await dispatch(logoutThunk());
    navigate("/login");
  }

  return (
      <div className="row">
        <NavBar active={isCurrentUsersProfile ? "profile" : "members"}/>
        <div className="col-6">
          {!editMode &&
              <h1>{firstName + " " + lastName}</h1>
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
                </div>
                <Button onClick={logOut}>
                  Log out
                </Button>
                <Button onClick={save}>Save</Button>
              </>
          }

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