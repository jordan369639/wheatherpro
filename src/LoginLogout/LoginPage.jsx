import React, { useEffect, useRef, useState } from 'react'
import "./signup.css";
import backImg from "./signupbackground.jpg"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { app } from '../Firebase/firebase';
import { useDispatch } from 'react-redux';
import { adduser } from '../app/LoginLogout';
const SignUp = ({email}) => {
const auth = getAuth(app);
const refemail = useRef(null);
const refpassword = useRef(null);
const refcpassword = useRef(null);
const [password,setpasswrdmismatch] = useState(false);
const [signup,Setsignup] = useState(false);
const dispatch = useDispatch()

useEffect(() => {
refemail.current.value = email
}, [])

const register = (e)=>{
  if(refpassword.current.value === refcpassword.current.value){
    createUserWithEmailAndPassword(auth, refemail.current.value, refpassword.current.value)
    .then((userCredential) => {

      const user = userCredential.user;
    
      

    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage)
  
    });
  }else{
    setpasswrdmismatch(true)
  }
  
e.preventDefault()
  }
  const signin = (e)=>{
    e.preventDefault();
  signInWithEmailAndPassword(auth, refemail.current.value, refpassword.current.value)
  .then((user) => {

   
    dispatch(adduser({
      userId: user.uid,
      email: user.email,
      name: user.name
    }))
console.log(user)
 
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage)
  });
  }
  return (
    <>
    <div className="signup"
    style={{
        backgroundImage: `url(${backImg})`
    }}>


        <div className="container">
{signup ? <>  <form action="">
<input type="email" name="" id="signupmail" placeholder='Enter your email'className='signin' ref={refemail}/>
<input type="password" name="" id="siguppasswrd" placeholder='password'className='signin' ref={refpassword}/>
<input type="password" name="" id="signupcpasswrd" placeholder='confirm password'className='signin'ref={refcpassword}/>
<p style={{color:"red"}} className={`passwrd ${password && 'wrongpasswrd'}`}>Password Mismatch</p>
<button className='submit' onClick={register}>sign up</button>  
<h3><span className='span1'>Already A StreamSync user?</span> <span className='span2' onClick={()=> Setsignup(false)}> Sign in </span></h3>
            </form></>:<>
            
            <form action="">
<input type="email" name="" id="sinmail" placeholder='Enter your email'className='signin' ref={refemail}/>
<input type="password" name="" id="sinpawwsrd" placeholder='password'className='signin' ref={refpassword}/>
<button className='submit' onClick={(e) => signin(e)}>sign in</button>  
<h3><span className='span1'>New to StreamSync?</span> <span className='span2' onClick={()=> Setsignup(true)}> Sign up now </span></h3>
            </form>
            
            </>}
          

        </div>
    </div>
    
    
    
    </>
  )
}

export default SignUp