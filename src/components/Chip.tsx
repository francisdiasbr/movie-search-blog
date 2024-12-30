import React from 'react';

interface ChipProps {
  label: string;
}

const Chip: React.FC<ChipProps> = ({ label }) => {
  return (
    <span
      style={{
        display: 'inline-block',
        padding: '6px 12px',
        borderRadius: '16px',
        backgroundColor: '#8ACE00',
        fontSize: '14px',
        color: '#333',
        margin: '4px',
      }}
    >
      {label}
    </span>
  );
};

export default Chip; 