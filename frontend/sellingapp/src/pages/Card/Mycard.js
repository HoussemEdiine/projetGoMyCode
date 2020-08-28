import React from 'react'
import './MovieCard.css'
function Mycard({myproduct:{name , discription , price ,img_url ,category,user}}) {
    return (
        
        <div className='container'>
      <div className='movie'>
        <div className='movie-img'>
          <img alt='movie poster' src={img_url} />
        </div>
        <div className='text-movie-cont'>
          <div className='mr-grid'>
            <div className='col1'>
            <h2>{name}</h2>
              <ul className='movie-gen'>
                 <p>{discription}</p>
              </ul>
            </div>
            <div className='col2'>
    <h3>{user}</h3>
            </div>
          </div>
          <div className='mr-grid summary-row'>
    <h5>{price}$</h5>
    <p>{category}</p>
          </div>
        </div>
      </div>
        </div>
    )
}

export default Mycard
