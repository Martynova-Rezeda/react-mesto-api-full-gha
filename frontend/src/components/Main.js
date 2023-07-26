import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({
  cards,
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__info">
          <img
            className="profile__avatar"
            src={currentUser.avatar}
            alt="Ваше фото"
          />
          <button
            type="button"
            aria-label="Сменить аватар"
            className="profile__avatar-button-edit"
            onClick={onEditAvatar}
          ></button>
          <div className="profile__info-card">
            <div className="profile__info-text">
              <h1 className="profile__info-title">{currentUser.name}</h1>
              <button
                type="button"
                aria-label="Редактировать"
                className="profile__button-edit"
                onClick={onEditProfile}
              ></button>
            </div>
            <p className="profile__info-subtitle">{currentUser.about}</p>
          </div>
        </div>
        <button
          type="button"
          aria-label="Добавить"
          className="profile__button-add"
          onClick={onAddPlace}
        ></button>
      </section>
      <section className="elements">
        {cards.map((card) => {
          return (
            <Card
              card={card}
              key={card._id}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          );
        })}
      </section>
    </main>
  );
}
export default Main;
