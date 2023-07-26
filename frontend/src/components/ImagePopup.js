import React from 'react';
import Popup from './Popup';

function ImagePopup({ card, onClose, isOpen }) {
  return (
    <Popup isOpen={isOpen} onClose={onClose} name="card">
      <img className="popup__card-image" src={card.link} alt={card.name} />
      <h2 className="popup__card-title">{card.name}</h2>
    </Popup>
  );
}
export default ImagePopup;
