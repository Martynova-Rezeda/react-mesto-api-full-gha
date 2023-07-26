import React from 'react';
import { useRef } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, onLoading }) {
  const avatarRef = useRef('');

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="update-avatar-form"
      named="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Сохранить"
      onLoading={onLoading}
    >
      <label className="popup__chapter">
        <input
          id="avatar-input"
          className="popup__field popup__field_type_avatarlink"
          name="link"
          type="url"
          placeholder="Ссылка на картинку"
          required
          ref={avatarRef}
        />
        <span className="avatar-input-error popup__input-error"></span>
      </label>
    </PopupWithForm>
  );
}
export default EditAvatarPopup;
