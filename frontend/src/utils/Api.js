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
  getUserData() {
    return this._request(`${this._link}users/me`, {
      headers: this._headers
    })
  }

  // Отправка информации о пользователе на сервер
  sendUserData(profileData) {
    return this._request(`${this._link}users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: profileData.name,
        about: profileData.about
      })
    })
  }

  //Получение карточек с сервера
  getInitialCards() {
    return this._request(`${this._link}cards`, {
      headers: this._headers
    })
  }

  //Добавление новой карточки
  addNewCard({ name, link }) {
    return this._request(`${this._link}cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({ name, link })
    })
  }

  // Удаление карточки с сервера
  deleteCard(cardId) {
    return this._request(`${this._link}cards/${cardId}`, {
      headers: this._headers,
      method: 'DELETE',
    })
  }

  // Отправка лайка на сервер
  putCardLike(cardId) {
    return this._request(`${this._link}cards/${cardId}/likes`, {
      headers: this._headers,
      method: 'PUT',
    })
  }

  // Удаление лайка на сервере
  removeCardLike(cardId) {
    return this._request(`${this._link}cards/${cardId}/likes`, {
      headers: this._headers,
      method: 'DELETE',
    })
  }

  // Отправко информации об аватаре на сервер
  sendAvatarData(avatarLink) {
    return this._request(`${this._link}users/me/avatar`, {
      headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify({ avatar: avatarLink.avatar })
    })
  }
}


const api = new Api({
  link: 'https://mesto.nomoreparties.co/v1/cohort-60/',
  headers: {
    authorization: '547614fb-6c6c-41a0-81d5-2f6d1a17b0c6',
    'Content-Type': 'application/json'
  }
});

export default api;