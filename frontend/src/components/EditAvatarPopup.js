import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
    const avatarEdit = React.useRef();

    React.useEffect(() => {
        avatarEdit.current.value = "";
    }, [props.isOpen]);

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateAvatar({ avatar: avatarEdit.current.value });
    }

    return (
        <PopupWithForm
            onSubmit={handleSubmit}
            name="avatar"
            title="Обновить аватар"
            buttonText={props.isLoading ? "Сохранение..." : "Сохранить"}
            isOpen={props.isOpen}
            onClose={props.onClose}
            onCloseOverlay={props.onCloseOverlay}
        >
            <label
                className="form"
                id="avatarForm"
                name="userAvatar"
            >
                <input
                    type="url"
                    ref={avatarEdit}
                    id="avatar"
                    name="avatarUrl"
                    className="popup__input popup__input_avatar"
                    placeholder="Cсылка на аватар"
                    required
                />
                <span
                    className="popup__error"
                    id="avatar-error"
                />
            </label>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;