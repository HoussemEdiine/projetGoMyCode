import React,{useState,useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import api from '../service/api'

function Products() {
    // product state useState('')
    const [img , setImg]=useState(null)
    const[name,setName]=useState('')
    const [discription , setDiscription]=useState('')
    const [category , setCategoty] = useState('')
    const[price , setPrice] = useState(0)
    const [date , setDate] =useState('')
    //user matter
    const [usersession , setusersession]=useState(null)
    const [username , setUsername] = useState(null)
     const history = useHistory()
   // const user_id = localStorage.getItem('userid')
    const user  = localStorage.getItem('user')
     const userid = localStorage.getItem('userid')
      console.log(user)

      
 
    
//handle submit 
const handlesubmit = async ev =>{
    ev.preventDefault()
    
     console.log(localStorage.getItem('userid')
     )

     const productData = new FormData()
     productData.append('img',img)
     productData.append('name',name)
     productData.append('discription',discription)
     productData.append('price',price)
     productData.append('category',category)
     if(name!=="" && 
        discription !=="" &&
        category !==""
        && date !=="" &&
        img !== null)
        {
         await api.post('/product',productData,{ headers :{ user }})   
        }
        setName('')
        setImg(null)
        setPrice(0)
        setDiscription('')
        setCategoty('')
        setDate('')
     history.push('/Dashbord')   
}
// fetching data from data
useEffect(()=>{

  api.get(`/user/${userid}`,{headers:{user : user}})
  .then(data =>{setUsername(data.data.authData.user.firstname)
              setusersession(data.status)
            console.log(data)})
        
              if(username===null){
               setUsername('Loading....')
              }
              
},[])

//display user
console.log(usersession)

useEffect(()=>{
if(usersession===403){
  history.push('/login')
}
},[usersession])

// session control

   // logout function
    const logout =  () =>{
       localStorage.removeItem('user')
       localStorage.removeItem('userid')
       history.push('/login')
     }

  
   

      
 // 


    return (
      <div>
{ user ?
  

        (<Form>
          <div>
            <h1>{username}</h1>
            <Button color='danger' onClick={logout}>Logout</Button>
          </div>
          
            <h2>adding product</h2>
             <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Label  className="mr-sm-2">product image</Label>
          <Input type="file"  onChange={(e)=>setImg(e.target.files[0])}/>
        </FormGroup>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Label  className="mr-sm-2">product name</Label>
          <Input type="text"   placeholder="prodcut name"  value={name} onChange={(e)=>setName(e.target.value)}/>
        </FormGroup>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Label className="mr-sm-2">discription</Label>
          <Input type="text"   placeholder="discription"  value={discription} onChange={(e)=>setDiscription(e.target.value)}/>
        </FormGroup>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Label className="mr-sm-2">price</Label>
          <Input type="number"   placeholder="price"  value={price} onChange={(e)=>setPrice(e.target.value)}/>
        </FormGroup>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Label for="exampleEmail" className="mr-sm-2">category</Label>
          <Input type="text" placeholder="category"  value={category} onChange={(e)=>setCategoty(e.target.value)}/>
        </FormGroup>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Label  className="mr-sm-2">Date</Label>
          <Input type="date" value={date} onChange={(e)=>setDate(e.target.value)} />
        </FormGroup>
        
        <Button onClick={handlesubmit}>Submit</Button>
      </Form>):
      history.push('/login')
}
      </div>
    )
    
}

export default Products
