import React from 'react';
import successImage from '../images/popup__icon_success.svg';
import errorImage from '../images/popup__icon_error.svg';

function InfoTooltip({ isOpen, onClose, isSuccess, successText, errorText, }) {
  return (
    <div
      className={`popup popup_type_registration ${
        isOpen ? "popup_opened" : ""
    }`}
    >
      <div className="popup__container">
        <button
          className="popup__close"
          type="button"
          onClick={onClose}
        ></button>
        <img
          src={isSuccess ? successImage : errorImage}
          alt={isSuccess ? successText : errorText}
          className="popup__icon"
        />
        <h2 className="popup__message">
          {isSuccess ? successText : errorText}
        </h2>
      </div>
    </div>
  );
}

export default InfoTooltip;