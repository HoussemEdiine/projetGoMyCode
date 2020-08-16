import React,{useState} from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import api from '../service/api'

function Registration({history}) {
    const [email , setEmail]=useState('')
    const [password , setPassword]=useState('')
    const [firstname , setFirstname]=useState('')
    const [lastname , setLastname]=useState('')

    const handleSubmit = async (evt) =>{
        evt.preventDefault()
   const response = await  api.post('/register',{email , password,firstname,lastname})
   const userId  = response.data._id 
   if(userId){
       localStorage.setItem('user', userId)
       history.push('/')
   } 
   else{
       const {message } = response.data
       
        console.log(message)
   }  
      
 
    }
    

    return (
        <Form>
          <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Label for="exampleEmail" className="mr-sm-2">firstname</Label>
          <Input type="text" name="firstname"  placeholder="firstname" value={firstname} onChange={(e)=>setFirstname(e.target.value)}/>
        </FormGroup>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Label for="exampleEmail" className="mr-sm-2">Lastname</Label>
          <Input type="text" name="lastname" value={lastname} onChange={(e)=>setLastname(e.target.value)} placeholder="lastname" />
        </FormGroup>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Label for="exampleEmail" className="mr-sm-2">Email</Label>
          <Input type="email" name="email" value={email}   onChange={e => setEmail(e.target.value)}  placeholder="something@idk.cool" />
        </FormGroup>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Label for="examplePassword" className="mr-sm-2">Password</Label>
          <Input type="password" value={password} name="password" placeholder="don't tell!" onChange={(e)=>setPassword(e.target.value)} />
        </FormGroup>
      
        
        <Button onClick={handleSubmit}>Submit</Button>
      </Form>

    )
}

export default Registration
