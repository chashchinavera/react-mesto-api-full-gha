import React from 'react';
import PopupWithForm from './PopupWithForm';
import CurrentUserContext from '../contexts/CurrentUserContext';


function EditProfilePopup(props) {
    const currentUser = React.useContext(CurrentUserContext);

    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, props.isOpen]);

    function handleNameEdit(e) {
        setName(e.target.value);
    }

    function handleDescriptionEdit(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateUser({
            name,
            about: description,
        });
    }

    return (
        <PopupWithForm
            onSubmit={handleSubmit}
            name="profile"
            title="Редактировать профиль"
            isOpen={props.isOpen}
            onClose={props.onClose}
            buttonText={props.isLoading ? 'Сохранение...' : 'Сохранить'}
            // onCloseOverlay={props.onCloseOverlay}
        >
            <label
                className="form"
                id="submit"
                name="user">
                <input
                    type="text"
                    onChange={handleNameEdit}
                    value={name || ''}
                    id="info"
                    name="name"
                    className="popup__input popup__input_info_name"
                    placeholder="Имя"
                    required
                    minLength="2"
                    maxLength="40"
                />
                <span
                    className="popup__error"
                    id="info-error"
                />
                <input
                    type="text"
                    onChange={handleDescriptionEdit}
                    value={description || ''}
                    id="status"
                    name="description"
                    className="popup__input popup__input_info_status"
                    placeholder="О себе"
                    required
                    minLength="2"
                    maxLength="200"
                />
                <span
                    className="popup__error"
                    id="status-error"
                />
            </label>
        </PopupWithForm>
    )
}

export default EditProfilePopup;


