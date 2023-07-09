import React from 'react';
import logo from '../images/header__logo.svg';
import { Route, Routes, Link } from 'react-router-dom';

function Header({ loggedIn, email, onSignOut }) {
    const [isMenuVisible, setIsMenuVisible] = React.useState(false);
    function onClickMenu() {
        setIsMenuVisible(!isMenuVisible);
    }

    return (

        <header className="header page__header">
            <img className="header__logo" src={logo} alt="Логотип Mesto Russia" />
            <Routes>
                {!loggedIn ? (
                    <>
                        <Route
                            path="/signup"
                            element={
                                <Link to="/signin" className="header__link">
                                    Войти
                                </Link>
                            }
                        />
                        <Route
                            path="/signin"
                            element={
                                <Link to="/signup" className="header__link">
                                    Регистрация
                                </Link>
                            }
                        />
                    </>
                ) : (
                    <Route
                        path="/"
                        isMenuVisible='false'
                        element={
                            <>
                                <button
                                    className={`menu ${isMenuVisible ? 'menu_active' : ""
                                        }`}
                                    type="button"
                                    onClick={onClickMenu}
                                >
                                    <span
                                        className={`menu__line ${isMenuVisible ? 'menu__line_active' : ""
                                            }`}
                                    ></span>
                                    <span
                                        className={`menu__line ${isMenuVisible ? 'menu__line_active' : ""
                                            }`}
                                    ></span>
                                    <span
                                        className={`menu__line ${isMenuVisible ? 'menu__line_active' : ""
                                            }`}
                                    ></span>
                                </button>
                                <div
                                    className={`header__user ${isMenuVisible ? 'header__user_active' : ""
                                        }`}
                                >
                                    <span className="header__link">{email}</span>
                                    <span
                                        onClick={onSignOut}
                                        className="header__link header__signOut"
                                    >
                                        Выйти
                                    </span>
                                </div>
                            </>
                        }
                    />
                )}
            </Routes>
        </header>
    )
};

export default Header;