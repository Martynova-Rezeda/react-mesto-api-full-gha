import React from 'react';
import Popup from './Popup';

function PopupWithForm({
  isOpen,
  name,
  onClose,
  title,
  onSubmit,
  children,
  onLoading,
  buttonText = 'Сохранить',
}) {
  return (
    <Popup isOpen={isOpen} onClose={onClose} name={name}>
      <h2 className="popup__title">{title}</h2>
      <form
        className="popup__content popup__content-edit"
        action="#"
        method="post"
        name={name}
        onSubmit={onSubmit}
      >
        {children}
        <button className="popup__button-save" type="submit">
          {onLoading ? 'Сохранение...' : buttonText}
        </button>
      </form>
    </Popup>
  );
}
export default PopupWithForm;
