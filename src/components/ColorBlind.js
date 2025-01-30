import React, { useState } from 'react';

const ColorBlindToggle = ({ onToggle }) => {
  const [isColorBlindMode, setIsColorBlindMode] = useState(false);

  const handleToggle = () => {
    setIsColorBlindMode(!isColorBlindMode);
    onToggle(!isColorBlindMode);
  };

  return (
    <button onClick={handleToggle} className="btn btn-primary m-2">
      {isColorBlindMode ? 'Disable Color Blind Mode' : 'Enable Color Blind Mode'}
    </button>
  );
};

export default ColorBlindToggle;
