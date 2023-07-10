const BASE_URL = 'https://mesto.chashchinavera.nomoreparties.sbs';

export const register = (email, password) => {
    return fetch(`${BASE_URL}/signup`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    })
        .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
        .then((data) => data);
}

export const login = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    })
        .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
        .then((data) => data);
}

export const checkToken = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    })
        .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
        .then((data) => data.data);
}