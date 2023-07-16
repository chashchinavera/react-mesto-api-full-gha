import React, { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({
    card,
    onCardClick,
    onCardLike,
    onCardDelete
}) {
    const currentUser = useContext(CurrentUserContext);

    const isOwn = currentUser._id === card.owner;
    const isLiked = card.likes.some(i => i === currentUser._id);

    function handleClick() {
        onCardClick(card);
    };

    function handleLikeClick() {
        onCardLike(card);
    };

    function handleDeleteCard() {
        onCardDelete(card);
    };

    const cardLikeButtonClassName = (
        `element__like_button ${isLiked && 'element__like_active'}`
    );

    return (
        <article className="element">
            <img
                className="element__image"
                src={card.link}
                alt={card.name}
                onClick={handleClick}
            />
            {isOwn &&
                <button
                    type="button"
                    className="element__delete"
                    aria-label="Удалить"
                    onClick={handleDeleteCard}
                />
            }
            <div className="element__info">
                <h2 className="element__title">{card.name}</h2>
                <div className="element__like">
                    <button
                        type="button"
                        className={cardLikeButtonClassName}
                        aria-label="Мне нравится"
                        onClick={handleLikeClick}
                    />
                    <p className="element__like_counter">{card.likes.length}</p>
                </div>
            </div>
        </article>
    )
};

export default Card;