import React from 'react';
import Popup from './Popup';

import notOkPath from '../images/xUnion.svg';
import okPath from '../images/union1.svg';

function InfoTooltip({ isOpen, isRegistered, onClose }) {
  return (
    <Popup isOpen={isOpen} onClose={onClose} name="info">
      <img
        className="popup__info-image"
        src={isRegistered ? okPath : notOkPath}
        alt="Значок результата регистрации"
      />
      <h2 className={`popup__info-title`}>
        {isRegistered
          ? 'Вы успешно зарегестрировались!'
          : 'Что-то пошло не так! Попробуйте еще раз.'}
      </h2>
    </Popup>
  );
}
export default InfoTooltip;
