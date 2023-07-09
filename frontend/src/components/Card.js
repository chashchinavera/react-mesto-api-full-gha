import React from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext.js';

function Card(props) {
    const currentUser = React.useContext(CurrentUserContext);

    function handleClick() {
        props.onCardClick(props.card);
    }

    function handleLikeClick() {
        props.onCardLike(props.card);
    }

    function handleDeleteCard() {
        props.onCardDelete(props.card);
    }

    const isOwn = props.card.owner._id === currentUser._id;
    const isLiked = props.card.likes.some(
        i => i._id === currentUser._id
    );


    const cardLikeButtonClassName = (
        `element__like_button ${isLiked && 'element__like_active'
        }`
    );;

    return (
        <article className="element">
            <img
                className="element__image"
                src={props.card.link}
                alt={props.card.name}
                onClick={handleClick}
            />
            {(isOwn &&
                <button
                    type="button"
                    className="element__delete"
                    aria-label="Удалить"
                    onClick={handleDeleteCard}
                />
            )}
            <div className="element__info">
                <h2 className="element__title">{props.card.name}</h2>
                <div className="element__like">
                    <button
                        type="button"
                        className={cardLikeButtonClassName}
                        aria-label="Мне нравится"
                        onClick={handleLikeClick}
                    />
                    <p className="element__like_counter">{props.card.likes.length}</p>
                </div>
            </div>
        </article>
    )
};

export default Card;