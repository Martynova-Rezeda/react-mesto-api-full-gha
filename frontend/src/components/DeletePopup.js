import React from 'react';
import PopupWithForm from './PopupWithForm';

function DeletePopup({ card, isOpen, onClose, onLoading, onSubmit }) {
  const handleSubmitDeleteCard = (e) => {
    e.preventDefault();
    onSubmit(card._id);
   
  };
  return (
    <PopupWithForm
      title="Вы уверенны?"
      name="delete-card"
      named="Да"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmitDeleteCard}
      buttonText="Да"
      onLoading={onLoading}
    ></PopupWithForm>
  );
}

export default DeletePopup;
