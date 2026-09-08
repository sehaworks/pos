import React from 'react';
import { IoBackspaceOutline } from 'react-icons/io5';

const Keypad = ({ onNumClick, onDeleteClick }) => {
  const nums = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '00', '0'];

  return (
    <div className="keypad">
      {nums.map((num) => (
        <div key={num} className={`numBtn num${num}`} onClick={() => onNumClick(num)}>
          {num}
        </div>
      ))}
      <div className="numBtn backBtn" onClick={onDeleteClick}>
        <IoBackspaceOutline />
      </div>
    </div>
  );
};

export default Keypad;