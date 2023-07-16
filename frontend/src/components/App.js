import { useEffect, useState } from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import ImagePopup from './ImagePopup.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import api from '../utils/Api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Login from './Login.js';
import Register from './Register.js';
import ProctectedRoute from './ProctectedRoute.js'
import InfoTooltip from './InfoTooltip.js';
import * as Authorisation from './Auth.js';


function App() {
    const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState({});
    const [currentUser, setCurrentUser] = useState({});
    const [cards, setCards] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [email, setEmail] = useState("");
    const [isRegistrationPopupOpen, setIsRegistrationPopupOpen] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [formRegisterValue, setFormRegisterValue] = useState({
        email: "",
        password: "",
    });
    const [formLoginValue, setFormLoginValue] = useState({
        email: "",
        password: "",
    });

    const navigate = useNavigate();
    const jwt = localStorage.getItem('userId');

    function handleTokenCheck() {
        if (jwt) {
            Authorisation.checkToken(jwt)
                .then((res) => {
                    setLoggedIn(true);
                    setEmail(res.email);
                    navigate("/");
                })
                .catch((err) => console.log(err));
        }
    }

    function signOut() {
        localStorage.clear('userId');
        navigate('/signin');
        setLoggedIn(false);
        console.log(currentUser);
    }

    function handleRegisterSubmit(evt) {
        evt.preventDefault();
        Authorisation.register(formRegisterValue.email, formRegisterValue.password)
            .then(() => {
                navigate('/signin');
                setFormRegisterValue({ email: '', password: '' });
                setIsSuccess(true);
            })
            .catch((err) => {
                setIsSuccess(false);
                console.log(err);
            })
            .finally(() => setIsRegistrationPopupOpen(true));
    }

    function handleLoginSubmit(evt) {
        evt.preventDefault();
        Authorisation.login(formLoginValue.email, formLoginValue.password)
            .then((res) => {
                if (res.jwt) {
                    localStorage.setItem('userId', res.jwt);
                    setFormLoginValue({ email: '', password: '' });
                    setEmail(formLoginValue.email);
                    setLoggedIn(true);
                    navigate('/');
                }
            })
            .catch((err) => {
                setIsSuccess(false);
                setIsRegistrationPopupOpen(true);
                console.log(err);
            });
    }

    useEffect(() => {
        handleTokenCheck();
    }, []);

    useEffect(() => {
        if (loggedIn) {
            Promise.all([api.getUserData(jwt), api.getInitialCards(jwt)])
                .then(([currentUser, cards]) => {
                    setCurrentUser(currentUser);
                    setCards(cards.reverse());
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }, [loggedIn])

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    function handleCardClick(card) {
        setIsImagePopupOpen(true);
        setSelectedCard(card);
    }


    function handleUpdateUser(data) {
        setIsLoading(true);
        api.sendUserData(data, jwt)
            .then(({ data }) => {
                const { name, about } = data;
                setCurrentUser({ ...currentUser, name: name, about: about });
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    function handleUpdateAvatar(data) {
        setIsLoading(true);
        api.sendAvatarData(data, jwt)
            .then(({ data }) => {
                const { avatar } = data;
                setCurrentUser({ ...currentUser, avatar: avatar });
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    function handleAddPlaceSubmit(data) {
        setIsLoading(true);
        api.addNewCard(data, jwt)
            .then((result) => {
                setCards([result, ...cards]);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i === currentUser._id);
        if (isLiked) {
            api.removeCardLike(card._id, jwt)
                .then((newCard) => {
                    setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
                })
                .catch((err) => console.log(err));
        } else {
            api.putCardLike(card._id, jwt)
                .then((newCard) => {
                    console.log(newCard)
                    setCards((state) => state.map((c) => c._id === card._id ? newCard : c));

                })
                .catch((err) => console.log(err));
        }
    }

    function handleCardDelete(card) {
        api.deleteCard(card._id, jwt)
            .then(() => {
                setCards((state) => state.filter((c) => c._id !== card._id));
            })
            .catch((err) => console.log(err));
    }

    function closeAllPopups() {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsImagePopupOpen(false);
        setSelectedCard({});
        setIsRegistrationPopupOpen(false);

    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <Header
                    loggedIn={loggedIn}
                    email={email}
                    onSignOut={signOut}
                />
                <Routes>
                    <Route
                        path="/"
                        element={
                            <ProctectedRoute
                                element={Main}
                                onEditAvatar={handleEditAvatarClick}
                                onEditProfile={handleEditProfileClick}
                                onAddPlace={handleAddPlaceClick}
                                onImage={handleCardClick}
                                onCardLike={handleCardLike}
                                onCardDelete={handleCardDelete}
                                cards={cards}
                                loggedIn={loggedIn}
                            />
                        }
                    />
                    <Route
                        path="/signup"
                        element={
                            <Register
                                onRegister={handleRegisterSubmit}
                                formRegisterValue={formRegisterValue}
                                setFormRegisterValue={setFormRegisterValue}
                            />
                        }
                    />
                    <Route
                        path="/signin"
                        element={
                            <Login
                                onLogin={handleLoginSubmit}
                                formLoginValue={formLoginValue}
                                setFormLoginValue={setFormLoginValue}
                            />
                        }
                    />
                </Routes>
                <Footer />
                <AddPlacePopup
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
                    onAddPlace={handleAddPlaceSubmit}
                    isLoading={isLoading}
                />
                <EditAvatarPopup
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}
                    onUpdateAvatar={handleUpdateAvatar}
                    isLoading={isLoading}
                />
                <EditProfilePopup
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                    onUpdateUser={handleUpdateUser}
                    isLoading={isLoading}
                />
                <ImagePopup
                    card={selectedCard}
                    isOpen={isImagePopupOpen}
                    onClose={closeAllPopups}
                />
                <InfoTooltip
                    onClose={closeAllPopups}
                    isOpen={isRegistrationPopupOpen}
                    isSuccess={isSuccess}
                    successText="Вы успешно зарегистрировались!"
                    errorText="Что-то пошло не так! Попробуйте ещё раз."
                />
            </div >
        </CurrentUserContext.Provider >

    );
}

export default App;