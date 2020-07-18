"use strict";

export class Api {
  constructor(baseConfig) {
    this.url = baseConfig.url;
    this.headers = baseConfig.headers;
  }

  getCards() {
    return fetch(this.url + '/cards', {
      method: 'GET',
      headers: this.headers
    })
      .then(this.getResponse);
  }

  getUserInformation() {
    return fetch(this.url + '/users/me', {
      method: 'GET',
      headers: this.headers
    })
      .then(this.getResponse);
  }

  editUserInformation(newName, newJob) {
    return fetch(this.url + '/users/me', {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name: newName,
        about: newJob,
      })
    })
      .then(this.getResponse);
  }

  // Отлично!
  getResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
}