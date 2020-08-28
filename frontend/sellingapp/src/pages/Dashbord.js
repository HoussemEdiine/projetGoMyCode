import React , {useState,useEffect,}  from 'react'
import {useHistory} from 'react-router-dom'
import  {Button} from 'reactstrap'
import api from '../service/api'
import Card from './Card/Card'


function Dashbord() {
    const user  = localStorage.getItem('user')
    const userid=localStorage.getItem('userid')
    //states
   const [product,setproduct]=useState([])
   const [status , setstatus]=useState(0)
   
   const hsitory = useHistory()
       
     useEffect(() => {
         api.get('/products',{headers:{user}})
         .then(data=>{setproduct(data.data.product)
            setstatus(data.request.status)}   )
        
     }, [])
      
     useEffect(()=>{
         console.log(status)
      if(status===403){
          hsitory.push('/login')
      }
     },[])
    
          
//delete function 
const removeitem = async (productid) => {

    await api.delete(`/product/${productid}`,{headers:{user}})
    window.location.reload(true)


  
}



    return (
    <React.Fragment>
            <h1 style={{alignItems:'center'}}>All Products</h1>
<div style={{
            display: 'flex',
            flex: 'column',
            justifyContent: 'space-evenly',
            flexWrap: 'wrap',
          }}>
             
              
         { product.map((el ,i)=>(
         <div>
        <Card  product={el}/>

        {
        userid === el.user ? <Button color='danger' onClick={()=>removeitem(el._id)}>Delete</Button> :
        ""
        }
        
         </div>
         ))}

        </div>

    </React.Fragment>
        
        
         
    )
}

export default Dashbord
