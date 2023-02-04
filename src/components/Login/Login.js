import React, { useState,useEffect, useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const emailReducer=(state, action)=>{
  if(action.type==='USER_INPUT'){
    return {value: action.val, isValid: action.val.includes('@')};
  }
  if(action.type==='INPUT_BLUR'){
    return {value: state.value, isValid: state.value.includes('@')}
  }
  return {value: '', isValid: false};
}

const passReducer=(state, action)=>{
  if(action.type==='INPUT_PASS'){
    return {value: action.val, isValid: action.val.trim()>6};
  }
  if(action.type==='INPUT_BLUR'){
    return {value: state.value, isValid: state.value.trim()>6}
  }
  return {value: '', isValid: false};
}
const Login = (props) => {
 /*  const [enteredEmail, setEnteredEmail] = useState('');
  const [emailIsValid, setEmailIsValid] = useState(); */
const [emailState, dispatchEmail]=useReducer(emailReducer, {value: '', isValid: null})
const [passState,dispatchPass]=useReducer(passReducer, {value: '', isValid: null})

 /*  const [enteredPassword, setEnteredPassword] = useState('');
  const [passwordIsValid, setPasswordIsValid] = useState(); */
  const [enterCollegeName, setCollegeName]=useState('');
  const [collegeNameIsValid, setCollegeNameIsValid]=useState('');
  const [formIsValid, setFormIsValid] = useState(false);

  /* useEffect(()=>{
    console.log("form validating")
    const identifier=setTimeout(()=>{
      setFormIsValid(
        enteredPassword.trim().length > 6 && enteredEmail.includes('@') && enterCollegeName.trim().length>0
      );
    },500)
    return ()=>{
      console.log("cleanup!")
      clearTimeout(identifier);
    }
  },[enteredEmail,enterCollegeName,enteredPassword]); */
  const emailChangeHandler = (event) => {
    dispatchEmail({type: 'USER_INPUT', val: event.target.value})
    setFormIsValid(
      event.target.value.includes('@') && passState.isValid > 6  && enterCollegeName.trim().length>0
    );
  };

  const passwordChangeHandler = (event) => {
  dispatchPass({type: 'INPUT_PASS', val: event.target.value})
    setFormIsValid(
     emailState.isValid && event.target.value.trim().length > 6   && enterCollegeName.trim().length>0
    );

  };

  const validateEmailHandler = () => {
    dispatchEmail({type: 'INPUT_BLUR'})
  };

  const validatePasswordHandler = () => {
    dispatchPass({type: 'INPU_BLUR'})
  };
  const collegeNameChangeHandeler=(event)=>{
setCollegeName(event.target.value);
setFormIsValid(
  emailState.isValid && passState.isValid  && event.target.value.trim().length>0
);
  }
const validateCollegeHandler=(event)=>{
  setCollegeNameIsValid(enterCollegeName.includes('@'));
}
  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passState.value,enterCollegeName);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid=== false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            collegeNameIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="collegeName">CollegeName</label>
          <input
            type="text"
            id="collegeName"
            value={enterCollegeName}
            onChange={collegeNameChangeHandeler}
            onBlur={validateCollegeHandler}
          />
          </div>
           <div
          className={`${classes.control} ${
            passState.isValid === false ? classes.invalid : ''
          }`}
        >
           <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
