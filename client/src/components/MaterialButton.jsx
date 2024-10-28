import React, { useState } from 'react';

const MaterialButton = ({ table, onClick, index, margin='10px', text_color='rgb(210, 210, 200)', text_size= '15px', variant = 'normal', is_upper=false }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Define color schemes for different variants
  const getColorScheme = (variant) => {
    switch (variant) {
      case 'success':
        return {
          backgroundColor: isHovered ? 'rgba(76, 175, 80, 0.8)' : 'rgba(76, 175, 80, 0)', // green
          borderColor: isHovered ? 'rgb(76, 175, 80)' : 'rgb(150, 150, 150)',
        };
      case 'delete':
        return {
          backgroundColor: isHovered ? 'rgba(244, 67, 54, 0.8)' : 'rgba(244, 67, 54, 0)', // red
          borderColor: isHovered ? 'rgb(244, 67, 54)' : 'rgb(150, 150, 150)',
        };
      default:
        return {
          backgroundColor: isHovered ? 'rgba(40, 40, 40, 0.8)' : 'rgba(40, 40, 40, 0)', // default gray
          borderColor: isHovered ? 'rgb(255, 255, 255)' : 'rgb(150, 150, 150)',
        };
    }
  };

  const { backgroundColor, borderColor } = getColorScheme(variant);

  return (
    <button
      key={index}
      type="button"
      className=""
      style={{
        maxWidth: '250px',
        margin: `${margin}`,
        textTransform: is_upper ? 'uppercase' : 'none',
        backgroundColor,
        border: `3px solid ${borderColor}`,
        borderRadius: '10px',
        padding: '10px',
        fontSize: `${text_size}`,
        color: isHovered ? 'rgb(210, 210, 200)' : `${text_color}`,
        transition: 'all 0.3s ease-in-out',
        transform: isHovered ? 'scale(1.05)' : 'scale(1)',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {table.replace(/_/g, ' ')}
    </button>
  );
};

export default MaterialButton;
