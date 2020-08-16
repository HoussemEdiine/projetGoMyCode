import React , { useState} from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import api from '../service/api'

function Login({history}) {
 const [email , setEmail]=useState('h@hotmail')
 const [password , setPassword]=useState('****')
 const handleChange = async (e) =>{
     setEmail(e.target.value)
 }
 
   
 const handleSubmit  = async  evt => {
   evt.preventDefault()
   const response = await  api.post('/login',{email , password})
   const userId  = response.data.user_id 
   const user  = response.data.user
   if(userId && user){
       localStorage.setItem('userid', userId)
       localStorage.setItem('user',user)
       history.push('/dashbord')
   } 
   else{
       const {message } = response.data
       
        console.log(message)
   }     
 }
 console.log( localStorage)
    return (
        <div>
        <Form >
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Label for="exampleEmail" className="mr-sm-2">Email</Label>
          <Input type="email" name="email" value={email}   onChange={handleChange}  placeholder="something@idk.cool" />
        </FormGroup>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Label for="examplePassword" className="mr-sm-2">Password</Label>
          <Input type="password" value={password} name="password" placeholder="don't tell!" onChange={(e)=>setPassword(e.target.value)} />
        </FormGroup>
        <Button onClick={handleSubmit}>Submit</Button>
      </Form>
    
      </div>
    )
}

export default Login
