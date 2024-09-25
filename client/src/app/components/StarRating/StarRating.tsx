import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { FaStarHalfAlt } from 'react-icons/fa';

const StarRating = ({starRating, size}: {starRating: number, size: number}) => {
  //const [selectedStars, setSelectedStars] = useState(0);


  // const handleStarClick = (starIndex: number) => {
  //   setSelectedStars(starIndex + 1);
  // };


  return (
    <div className='flex'>
      {[...Array(5)].map((_, index) => (
        <div className='cursor-pointer'>
          {
            starRating - (index ) > 0 ?
            starRating - (index ) < 1 ?
            <FaStarHalfAlt
              key={index}
              size={size} // Ajusta el tamaño de las estrellas
              color={'gold'}
              //onClick={() => handleStarClick(index)}
            />
            :
            <FaStar
            key={index}
            size={size} // Ajusta el tamaño de las estrellas
            color={'gold'}
            //onClick={() => handleStarClick(index)}
          />
          :
          <FaStar
          key={index}
          size={size} // Ajusta el tamaño de las estrellas
          color={'grey'}
          //onClick={() => handleStarClick(index)}
        />
          }
        </div>
      ))}
    </div>
  );
};

export default StarRating;