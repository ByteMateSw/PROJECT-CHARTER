import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

const StarRatingVote = () => {
  const [selectedStars, setSelectedStars] = useState(0);


  const handleStarClick = (starIndex: number) => {
    setSelectedStars(starIndex + 1);
  };


  return (
    <div className='flex'>
      {[...Array(5)].map((_, index) => (
        <div key={index} className='cursor-pointer'>
            <FaStar
              size={24} // Ajusta el tamaño de las estrellas
              color={index < selectedStars ? 'gold' : 'gray'}
              onClick={() => handleStarClick(index)}
            />

        </div>
      ))}
    </div>
  );
};

export default StarRatingVote;