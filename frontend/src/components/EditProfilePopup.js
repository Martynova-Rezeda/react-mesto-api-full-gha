import React from 'react';
import { useState, useEffect, useContext } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({ isOpen, onClose, onUpdateUser, onLoading }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      username: name,
      job: description,
    });
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="edit-form"
      named="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Сохранить"
      onLoading={onLoading}
    >
      <label className="popup__chapter">
        <input
          id="name-input"
          className="popup__field popup__field_type_username"
          name="username"
          type="text"
          value={name || ''}
          onChange={handleChangeName}
          placeholder="Имя"
          required
        />
        <span className="name-input-error popup__input-error"></span>
      </label>
      <label className="popup__chapter">
        <input
          id="job-input"
          className="popup__field popup__field_type_profession"
          name="job"
          type="text"
          value={description || ''}
          onChange={handleChangeDescription}
          placeholder="О себе"
          required
        />
        <span className="job-input-error popup__input-error"></span>
      </label>
    </PopupWithForm>
  );
}
export default EditProfilePopup;
