import React from 'react';
import Card from './Card.js';
import CurrentUserContext from '../contexts/CurrentUserContext.js';

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content page__content">
      <section className="profile content__section">
        <div className="profile__avatar">
          <img className="profile__image" src={currentUser.avatar} alt="Аватар" />
          <button type="button" className="profile__redact" aria-label="редактирование аватара" onClick={props.onEditAvatar} />
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button type="button" className="profile__edit" aria-label="редактирование профиля" onClick={props.onEditProfile} />
          <p className="profile__status">{currentUser.about}</p>
        </div>
        <button type="button" className="profile__add" aria-label="добавление карточки" onClick={props.onAddPlace} />
      </section>
      <section className="elements content__section" aria-label="Карточки">
        {props.cards.map((card) => (
          <Card
            card={card}
            onCardClick={props.onImage}
            onCardLike={props.onCardLike}
            onCardDelete={props.onCardDelete}
            key={card._id}
          />
        ))}
      </section>
    </main>
  )
};

export default Main;