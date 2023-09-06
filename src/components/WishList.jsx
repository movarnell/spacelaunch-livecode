import React from 'react'
import { v4 as uuidv4 } from 'uuid';
import {AiOutlineClose} from 'react-icons/ai'

function WishList({favorites, deleteFavorite}) {
console.log(favorites)


  return (
    <div> 
        <h1 className='display-5 text-center'>Favorites</h1>
        {favorites.length === 0 && <h4 className='text-center fw-bold'>No favorites yet</h4>}
        <div className="row m-4">
        <ul className='list-group' key={uuidv4()}>
        {favorites.map((fav) => {
            return (
             
                <li className='list-group-item' key={fav.id}>
                    
                {fav.company} {fav.date}
                <div className="float-end">
                <a href='#'  onClick={() => deleteFavorite(fav.id)}>
                      <AiOutlineClose  size={"1.5rem"} /> 
                    </a>
                    </div>
                    
                </li>
            )
        })}
        </ul>

    </div>
    </div>
    )
}

export default WishList