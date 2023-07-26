import React from 'react';
import { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace, onLoading }) {
  const [title, setTitle] = useState('');
  const [picture, setPicture] = useState('');

  function handleChangeTitle(e) {
    setTitle(e.target.value);
  }

  function handleChangePicture(e) {
    setPicture(e.target.value);
  }

  useEffect(() => {
    setTitle('');
    setPicture('');
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddPlace({
      name: title,
      link: picture,
    });
  };

  return (
    <PopupWithForm
      title="Новое место"
      name="add-form"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Создать"
      onLoading={onLoading}
    >
      <label className="popup__chapter">
        <input
          id="cardname-input"
          className="popup__field popup__field_type_cardname"
          name="title"
          type="text"
          placeholder="Название"
          required
          onChange={handleChangeTitle}
          value={title || ''}
        />
        <span className="cardname-input-error popup__input-error"></span>
      </label>
      <label className="popup__chapter">
        <input
          id="link-input"
          className="popup__field popup__field_type_picturelink"
          name="image"
          type="url"
          placeholder="Ссылка на картинку"
          required
          onChange={handleChangePicture}
          value={picture || ''}
        />
        <span className="link-input-error popup__input-error"></span>
      </label>
    </PopupWithForm>
  );
}
export default AddPlacePopup;
