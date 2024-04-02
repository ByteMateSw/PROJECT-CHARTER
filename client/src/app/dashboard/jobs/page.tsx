import React from 'react';

const CardWithDimensions = () => (
  <div className="page-container" style={{ overflowY: 'scroll', maxHeight: '100vh', padding: '1rem' }}>
    <div className="card-container" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
      {[...Array(10)].map((_, index) => (
        <div className="card" key={index} style={{
          width: '30.5625rem',
          height: '13.05981rem',
          flexShrink: 0,
          borderRadius: '0.25rem',
          background: 'var(--White, #FBFCFF)',
          boxShadow: '0px 4px 8px rgba(38, 39, 41, 0.1)',  
          padding: '1.5rem', 
          marginBottom: '1rem',  
          overflowY: 'auto' 
        }}>
          <h2 style={{
            width: '18.25rem',
            height: '1.79906rem',
            marginBottom: '0.5rem', 
            fontSize: '1.5rem', 
            lineHeight: '1.2', 
            overflow: 'hidden', 
            textOverflow: 'ellipsis' 
          }}>necesito personal de limpieza</h2>
          <h3 style={{
            width: '7.6875rem',
            height: '0.66631rem',
            marginBottom: '0.5rem', 
            fontSize: '0.75rem', 
            lineHeight: '1', 
            overflow: 'hidden', 
            textOverflow: 'ellipsis' 
          }}>limpieza</h3>
          <p style={{
            width: '29.125rem',
            fontSize: '0.75rem', 
            lineHeight: '1', 
            overflowY: 'auto', 
            maxHeight: '6rem' 
          }}>Texto de la tarjeta. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sed purus nec lectus commodo tincidunt. Phasellus non nibh eros. Sed vel orci in arcu pharetra viverra ut et dui. Nulla id volutpat velit. Donec eleifend lobortis mi, non dignissim arcu fermentum in. Integer quis vestibulum velit.</p>
        </div>
      ))}
    </div>
  </div>
);

export default CardWithDimensions;
