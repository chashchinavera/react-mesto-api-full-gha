class Api {

  constructor({ link, headers }) {
    this._link = link;
    this._headers = headers;
  }
  //Универсальный метод запроса с проверкой ответа
  _request(url, options) {
    return fetch(url, options).then(this._handleResponse)
  }

  //Обработка ответа сервера
  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`код ошибки: ${res.status}`);
    }
  }

  //Получение информации о пользователе
  getUserData(token) {
    return this._request(`${this._link}users/me`, {
      headers: this._headers,
      // credentials: 'include',
      authorization: `Bearer ${token}`,
    })
  }

  // Отправка информации о пользователе на сервер
  sendUserData(profileData, token) {
    return this._request(`${this._link}users/me`, {
      method: 'PATCH',
      headers: this._headers,
      // credentials: 'include',
      authorization: `Bearer ${token}`,
      body: JSON.stringify({
        name: profileData.name,
        about: profileData.about
      })
    })
  }

  //Получение карточек с сервера
  getInitialCards(token) {
    return this._request(`${this._link}cards`, {
      headers: this._headers,
      // credentials: 'include',
      authorization: `Bearer ${token}`,
    })
  }

  //Добавление новой карточки
  addNewCard({ name, link, token }) {
    return this._request(`${this._link}cards`, {
      method: 'POST',
      headers: this._headers,
      // credentials: 'include',
      authorization: `Bearer ${token}`,
      body: JSON.stringify({ name, link })
    })
  }

  // Удаление карточки с сервера
  deleteCard(cardId, token) {
    return this._request(`${this._link}cards/${cardId}`, {
      headers: this._headers,
      method: 'DELETE',
      // credentials: 'include',
      authorization: `Bearer ${token}`,
    })
  }

  // Отправка лайка на сервер
  putCardLike(cardId, token) {
    return this._request(`${this._link}cards/${cardId}/likes`, {
      headers: this._headers,
      method: 'PUT',
      // credentials: 'include',
      authorization: `Bearer ${token}`,
    })
  }

  // Удаление лайка на сервере
  removeCardLike(cardId, token) {
    return this._request(`${this._link}cards/${cardId}/likes`, {
      headers: this._headers,
      method: 'DELETE',
      // credentials: 'include',
      authorization: `Bearer ${token}`,
    })
  }

  // Отправко информации об аватаре на сервер
  sendAvatarData(avatarLink, token) {
    return this._request(`${this._link}users/me/avatar`, {
      headers: this._headers,
      method: 'PATCH',
      // credentials: 'include',
      authorization: `Bearer ${token}`,
      body: JSON.stringify({ avatar: avatarLink.avatar })
    })
  }
}


const api = new Api({
  link: 'http://localhost:3001/',
  // link: 'https://mesto.chashchinavera.nomoreparties.sbs/',
  headers: {
    'Content-Type': 'application/json',
  }
});

export default api;