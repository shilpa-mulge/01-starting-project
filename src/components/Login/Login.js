import React, { useState,useEffect, useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';

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
    return {value: action.val, isValid: action.val.trim().length>6};
  }
  if(action.type==='INPUT_BLUR'){
    return {value: state.value, isValid: state.value.trim().length>6}
  }
  return {value: '', isValid: false};
}

const collegeReducer=(state,action)=>{
  if(action.type==='INPUT_COLLEGE'){
    return {value: action.val, isValid: action.val.trim().length>0};
  }
  if(action.type==='INPUT_BLUR'){
    return {value: state.value, isValid: state.value.trim().length>0}
  }
  return {value: '', isValid: false};
}

const Login = (props) => {
 /*  const [enteredEmail, setEnteredEmail] = useState('');
  const [emailIsValid, setEmailIsValid] = useState(); */
const [emailState, dispatchEmail]=useReducer(emailReducer, {value: '', isValid: null})
const [passState,dispatchPass]=useReducer(passReducer, {value: '', isValid: null})
const [collegeStat, dispatchCollege]=useReducer(collegeReducer, {value: '', isValid: null})

 /*  const [enteredPassword, setEnteredPassword] = useState('');
  const [passwordIsValid, setPasswordIsValid] = useState(); */
  const [enterCollegeName, setCollegeName]=useState('');
  //const [collegeNameIsValid, setCollegeNameIsValid]=useState('');
  const [formIsValid, setFormIsValid] = useState(false);

const {isValid:emailIsValid}=emailState;
const {isValid:passwordIsValid}=passState;
const {isValid:collegeNameIsValid}=collegeStat;

   useEffect(()=>{
    console.log("form validating")
    const identifier=setTimeout(()=>{
      setFormIsValid(
       passwordIsValid && emailIsValid && collegeNameIsValid
      );
    },500)
    return ()=>{
      console.log("cleanup!")
      clearTimeout(identifier);
    }
  },[emailIsValid, collegeNameIsValid ,passwordIsValid]); 
  const emailChangeHandler = (event) => {
    dispatchEmail({type: 'USER_INPUT', val: event.target.value})
    setFormIsValid(
      event.target.value.includes('@') && passState.isValid > 6  && collegeStat.isValid
    );
  };

  const passwordChangeHandler = (event) => {
  dispatchPass({type: 'INPUT_PASS', val: event.target.value})
   /*  setFormIsValid(
     emailState.isValid && event.target.value.trim().length > 6   && enterCollegeName.trim().length>0
    ); */

  };

  const validateEmailHandler = () => {
    dispatchEmail({type: 'INPUT_BLUR'})
  };

  const validatePasswordHandler = () => {
    dispatchPass({type: 'INPUT_BLUR'})
  };
  const collegeNameChangeHandeler=(event)=>{
dispatchCollege({type: 'INPUT_COLLEGE', val: event.target.value});
/* setFormIsValid(
  emailState.isValid && passState.isValid  && event.target.value.trim().length>0
); */
  }
const validateCollegeHandler=(event)=>{
  dispatchCollege({type: 'INPUT_BLUR'})
  ///setCollegeNameIsValid(enterCollegeName.includes('@'));
}
  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passState.value, collegeStat.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>

          <Input
            type="email"
            id="email"
            label="E-Mail"
            isValid={emailIsValid}
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}/>
        
      
        
          <Input
            type="text"
            id="collegeName"
            label="collegeName"
            value={collegeStat.value}
            isValid={collegeNameIsValid}
            onChange={collegeNameChangeHandeler}
            onBlur={validateCollegeHandler}
          />
        
          
          <Input
            type="password"
            id="password"
            label="Password"
            value={passState.value}
            isValid={passwordIsValid}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
      
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
