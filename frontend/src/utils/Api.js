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
  getUserData(jwt) {
    return this._request(`${this._link}users/me`, {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${jwt}`,
        'Content-Type': 'application/json',
      },
    })
  }
  
  //Получение карточек с сервера
  getInitialCards(jwt) {
    return this._request(`${this._link}cards`, {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${jwt}`,
        'Content-Type': 'application/json',
      },
    })
  }

  // Отправка информации о пользователе на сервер
  sendUserData(profileData, jwt) {
    return this._request(`${this._link}users/me`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${jwt}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: profileData.name,
        about: profileData.about
      })
    })
  }

  //Добавление новой карточки
  addNewCard({ name, link}, jwt) {
    return this._request(`${this._link}cards`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${jwt}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, link })
    })
  }

  // Удаление карточки с сервера
  deleteCard(cardId, jwt) {
    return this._request(`${this._link}cards/${cardId}`, {
      headers: {
        'Authorization': `Bearer ${jwt}`,
        'Content-Type': 'application/json',
      },
      method: 'DELETE',
    })
  }

  // Отправка лайка на сервер
  putCardLike(cardId, jwt) {
    return this._request(`${this._link}cards/${cardId}/likes`, {
      headers: {
        'Authorization': `Bearer ${jwt}`,
        'Content-Type': 'application/json',
      },
      method: 'PUT',
    })
  }

  // Удаление лайка на сервере
  removeCardLike(cardId, jwt) {
    return this._request(`${this._link}cards/${cardId}/likes`, {
      headers: {
        'Authorization': `Bearer ${jwt}`,
        'Content-Type': 'application/json',
      },
      method: 'DELETE',
    })
  }

  // Отправка информации об аватаре на сервер
  sendAvatarData(avatarLink, jwt) {
    return this._request(`${this._link}users/me/avatar`, {
      headers: {
        'Authorization': `Bearer ${jwt}`,
        'Content-Type': 'application/json',
      },
          method: 'PATCH',
      body: JSON.stringify({ avatar: avatarLink.avatar })
    })
  }
}


const api = new Api({
  link: 'http://localhost:3001/',
});

export default api;