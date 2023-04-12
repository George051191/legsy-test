import React, { FC } from 'react';

const FotoRenderer:FC<{ value:string }> = ({ value }) => {
  const imageSource = value;

  return (

    <img
      style={{
        width: '25px',
        height: '25px',
        position: 'absolute',
        right: '0px',
        top: '7px',
      }}
      src={imageSource}
      alt='kartinka' />
  );
};

export default FotoRenderer;
