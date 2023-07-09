import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
    const [name, setName] = React.useState("");
    const [image, setImage] = React.useState("");

    React.useEffect(() => {
        setName("");
        setImage("");
    }, [props.isOpen]);

    function handleNameAdd(e) {
        setName(e.target.value);
    }

    function handleImageAdd(e) {
        setImage(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onAddPlace({ name, link: image });
    }

    return (
        <PopupWithForm
            onSubmit={handleSubmit}
            name="card-add"
            title="Новое место"
            isOpen={props.isOpen}
            onClose={props.onClose}
            buttonText={props.isLoading ? "Создается..." : "Создать"}
            onCloseOverlay={props.onCloseOverlay}
        >
            <label className="form" id="create" name="newCard">
                <input
                    type="text"
                    id="place"
                    name="place"
                    className="popup__input popup__input_info_place"
                    minLength="2"
                    maxLength="40"
                    onChange={handleNameAdd}
                    value={name}
                    placeholder="Название"
                    required
                />
                <span className="popup__error" id="place-error" />
                <input
                    id="image"
                    name="image"
                    className="popup__input popup__input_info_image"
                    type="url"
                    onChange={handleImageAdd}
                    value={image}
                    placeholder="Ссылка на картинку"
                    required
                />
                <span className="popup__error" id="image-error" />
            </label>
        </PopupWithForm>
    );
}

export default AddPlacePopup;