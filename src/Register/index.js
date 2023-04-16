import NavBar from "../NavBar";
import React, {useEffect} from "react";
import {useNavigate} from "react-router";
import {useSelector} from "react-redux";
import {useToast} from '@chakra-ui/react';
import {REGISTRATION_FAILURE} from "../reducers/user-reducer";
import RegistrationForm from "./RegistrationForm";

function Register() {
  const {currentUser, error} = useSelector((state) => state.user);
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
        if (error === REGISTRATION_FAILURE && currentUser === null) {
          toast({
            position: 'top',
            title: 'Registration error',
            description: 'Sorry, the chosen username is taken!',
            status: 'error',
            duration: 9000,
            isClosable: true,
          })
        } else if (error === null && currentUser !== null) {
          navigate('/');
          toast({
            position: 'top',
            title: 'Account successfully created',
            status: 'success',
            duration: 9000,
            isClosable: true,
          })
        }
      },
      [error, currentUser]);

  return (
      <div className="row">
        <NavBar active="login"/>
        <div className="col-8">
          <h2>Create an account</h2>
          <RegistrationForm/>
        </div>
      </div>
  );
}

export default Register;