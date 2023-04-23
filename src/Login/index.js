import NavBar from "../NavBar";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {loginThunk} from "../services/user-thunks";
import {Button} from "react-bootstrap";
import {useToast} from '@chakra-ui/react';
import {Link} from "react-router-dom";
import {LOGIN_FAILURE} from "../reducers/user-reducer";

function Login() {
  const {error, currentUser} = useSelector((state) => state.user);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();

  const handleLogin = async () => {
    await dispatch(loginThunk({username, password}));
  };

  useEffect(() => {
        if (error === LOGIN_FAILURE) {
          toast({
            position: 'top',
            title: 'Login error',
            description: 'Invalid credentials',
            status: 'error',
            duration: 9000,
            isClosable: true,
          })
        } else if (error === null && currentUser !== null) {
          navigate('/');
        }
      },
      [error, currentUser]);

  return (
      <div className="row">
        <NavBar active="login"/>
        <div className="col-8">
          <h2>Welcome!</h2>
          <div>
            <label htmlFor="username-field">Username:</label>
            <input className="form-control" id="username-field"
                   type="text" value={username}
                   onChange={(event) => setUsername(event.target.value)}
            />
          </div>
          <div className={"mt-3"}>
            <label htmlFor="password-field">Password:</label>
            <input className="form-control" id="password-field"
                   type="password" value={password}
                   onChange={(event) => setPassword(event.target.value)}/>
          </div>
          <div className="text-center mt-3">
            <Button onClick={handleLogin}>Log in</Button>
          </div>
          <div className="text-center">
            <Link to="/register">Create an account</Link>
          </div>
        </div>
      </div>
  );
}

export default Login;