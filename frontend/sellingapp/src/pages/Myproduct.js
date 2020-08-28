import React,{useEffect,useState} from 'react'
import api from '../service/api'
import Card from './Card/Mycard'


function Myproduct() {
    const user  = localStorage.getItem('user')
    const userid=localStorage.getItem('userid')
    //states
   const [product,setproduct]=useState([])
   useEffect(() => {
    api.get('/products',{headers:{user}})
    .then(data=>{setproduct(data.data.product)
       }   )
   
}, [])
const myproduct = product.filter(el =>{
 return userid === el.user
})
console.log(myproduct)

    return (
        <React.Fragment>
        <h1>My uploaded products </h1>
        <div
        style={{
            display: 'flex',
            flex: 'column',
            justifyContent: 'space-evenly',
            flexWrap: 'wrap',
          }}
        >
          
            {
                myproduct.map(el =>(
                    <Card myproduct={el}/>
                ))
            }
            
        </div>
        </React.Fragment>
    )
}

export default Myproduct
