import React from 'react';
import './Resto.css';
import { Blurhash } from 'react-blurhash';

const Resto = ({ restaurants, showBlurhash, handleClick }) => {
  return (
    <div>
      {restaurants.map((restaurant) => {
        return (
          <div className='resto-container' key={restaurant.name}>
            {
              showBlurhash ? <Blurhash
                hash={restaurant.blurhash}
                width={400}
                height={300}
                resolutionX={32}
                resolutionY={32}
                punch={1}
                className='resto-image'
                id='resto-imageID'
              /> : <img src={restaurant.image} className='resto-image' data-test='restaurant-image' onClick={() => { handleClick(restaurant) }} alt={restaurant.name} />
            }
            <p className='resto-name'>{restaurant.name}</p>
          </div>
        )
      })}
    </div>
  )
}

export default Resto

