import React from 'react';

function PopupWithForm({ name, isOpen, onClose, title, children, buttonText, onSubmit }) {
    return (
        <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''
            }`}>
            <div className="popup__container">
                <button type="button" className="popup__close" onClick={onClose} aria-label="закрыть окно редактирования" />
                <h2 className="popup__title">{title}</h2>
                <form className="form" name={name} onSubmit={onSubmit}>
                    {children}

                    <button type="submit" className="popup__button popup__submit"
                        aria-label="Сохранить">{buttonText}</button>
                </form>
            </div>
        </div>
    )
};

export default PopupWithForm;