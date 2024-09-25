import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

const StarRating = () => {
  const [selectedStars, setSelectedStars] = useState(0);


  const handleStarClick = (starIndex: number) => {
    setSelectedStars(starIndex + 1);
  };


  return (
    <div className='flex'>
      {[...Array(5)].map((_, index) => (
        <div className='cursor-pointer'>
            <FaStar
              key={index}
              size={24} // Ajusta el tamaño de las estrellas
              color={index < selectedStars ? 'gold' : 'gray'}
              onClick={() => handleStarClick(index)}
            />

        </div>
      ))}
    </div>
  );
};

export default StarRating;