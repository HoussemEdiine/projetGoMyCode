import React,{useState,useEffect} from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import api from '../service/api'

function Products({history}) {
    // product state useState('')
    const [img , setImg]=useState(null)
    const[name,setName]=useState('')
    const [discription , setDiscription]=useState('')
    const [category , setCategoty] = useState('')
    const[price , setPrice] = useState(0)
    const [date , setDate] =useState('')
    const [username , setUsername] = useState('unknown')

   // const user_id = localStorage.getItem('userid')
    const user  = localStorage.getItem('user')
     const userid = localStorage.getItem('userid')
      console.log(user)
    useEffect(() =>{
    if(!user){
      history.push('/')
    }
   },[])
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
}
useEffect(()=>{
  api.get(`/user/${userid}`,{headers:{user : user}})
  .then(data =>setUsername(data.data.authData.user.firstname)) 
   

   
},[])
 








    return (
        <Form>
          <h1>{username}</h1>
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
      </Form>
    )
}

export default Products
