import React, { useState } from 'react'
import { Heading } from '../components/Heading'
import { SubHeading } from '../components/SubHeading'
import { InputBox } from '../components/InputBox'
import { BottomWar } from '../components/BottomWar'
import {Button} from '../components/Button'
import axios from 'axios'

const Signup = () => {
  const [firstName,setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username,setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className='bg-slate-500 h-screen flex justify-center'>
        <div className='flex flex-col justify-center'>
            <div className='rounded-lg bg-white w-80 text-center p-2 h-max px-4'>
            <Heading label={"Sign up"}></Heading>
            <SubHeading label={"Enter your information to create an account"}></SubHeading>
            <InputBox placeholder='john' label={'First Name'} onChange={e => {setFirstName(e.target.value)}}></InputBox>
            <InputBox placeholder='Doe' label={'Last Name'}  onChange={e => {setLastName(e.target.value)}}></InputBox>
            <InputBox placeholder='x@gmail.com' label={'Email'}  onChange={e => {setUsername(e.target.value)}}></InputBox>
            <InputBox placeholder='123456' label={'Password'}  onChange={e => {setPassword(e.target.value)}}></InputBox>
            <div className='pt-4'>
                <Button onClick = {async () => {
                  const response = await axios.post('http://localhost:3000/api/v1/user/signup',{
                   firstname: firstName,
                   lastname: lastName,
                   username: username,
                   password: password
                  });
                  localStorage.setItem("token",response.data.token)
                }}label={'Sign up'}></Button>
            </div>
            <BottomWar label={'Already have an account?'} buttonText={"Sign in"} to={'/signin'}></BottomWar>
            </div>

        </div>
    </div>
  )
}

export default Signup