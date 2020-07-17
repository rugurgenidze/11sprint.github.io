"use strict";
import './pages/index.css';
import {Card} from './js/Card';
import {CardList} from './js/CardList';
import {Popup} from './js/Popup';
import {BigImage} from './js/BigImage';
import {UserInfo} from './js/UserInfo';
import {Api} from './js/Api';
import {FormValidator} from './js/FormValidator';
(function () {

  const placesList = document.querySelector(".places-list");
  const inputTitle = document.forms.new.elements.name;
  const inputLink = document.forms.new.elements.link;
  const userInfoButton = document.querySelector(".user-info__button");
  const editButton = document.querySelector(".edit__button");
  const popup = document.querySelector(".popup");
  const userPopup = document.querySelector(".user__popup");
  const imagePopup = document.querySelector(".popup_images");
  const inputName = document.forms.edit.elements.user;
  const inputJob = document.forms.edit.elements.job;
  const userName = document.querySelector(".user-info__name");
  const userJob = document.querySelector(".user-info__job");
  const userAvatar = document.querySelector(".user-info__photo");
  const serverUrl = NODE_ENV === 'development' ? 'http://praktikum.tk' : 'https://praktikum.tk'

  const baseConfig = {
    url: `${serverUrl}/cohort11`,
    headers: {
      authorization: 'cc615823-ef15-4d60-93a6-503a3bdccd7a',
      'Content-Type': 'application/json'
    }
  }

  const cardList = new CardList(placesList, createPlace);
  const popupEdit = new Popup(popup);
  const popupUser = new Popup(userPopup);
  const popupImage = new BigImage(imagePopup);
  const userInfo = new UserInfo(userName, userJob, userAvatar, inputName, inputJob);
  const popupValidator = new FormValidator(popup);
  const userPopupValidator = new FormValidator(userPopup);
  const api = new Api(baseConfig);

  function addNewPlace(evt) {
    evt.preventDefault();
    const form = document.forms.new;
    const newPlace = new Card();
    const newCard = {
      name: inputTitle.value,
      link: inputLink.value,
    };
    placesList.appendChild(newPlace.createCard(newCard));
    form.reset();
    popupEdit.close();
  }

  function createPlace(elem) {
    const card = new Card();
    return card.createCard(elem);
  }

  function addBigImage(event) {
    event.preventDefault();
    if (event.target.classList.contains("place-card__image")) {
      popupImage.open();
    }
  }

  //для изменения данных в форме пользователя
  function userProfile(evt) {
    evt.preventDefault();
    api.editUserInformation(inputName.value, inputJob.value)
      .then(res => {
        userInfo.setUserInfo(res.name, res.about, res.avatar)
        userInfo.updateUserInfo();
        popupUser.close();
      })
      .catch((err) => {
        console.log(err);
      })

  }

  function setCards() {
    api.getCards()
      .then(res => {
        cardList.render(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }


  //информация о пользователе
  api.getUserInformation()
    .then(res => {
      userInfo.setUserInfo(res.name, res.about, res.avatar);
      userInfo.updateUserInfo();
    })
    .catch((err) => {
      console.log(err);
    });
  //открытие формы
  editButton.addEventListener("click", () => {
    userInfo.renderUserInfo();
    popupUser.open();
  });
  userPopup.addEventListener("submit", userProfile);

  popup.addEventListener("submit", addNewPlace);

  placesList.addEventListener("click", addBigImage);

  userInfoButton.addEventListener("click", popupEdit.open);

  popupValidator.setEventListeners();

  userPopupValidator.setEventListeners();
  setCards();
})();

// Добрый день!

// Все критические замечания устранены, отлично!

// ## Итог

// - класс Api реализован согласно поставленной задаче
// - информация о пользователе  (имя, подпись и аватар) подгружаются с сервера (GET запрос)
// - имя и о себе можно отредактировать (отправляется PATCH запрос, новые данные)
// - карточки подгружаются с сервера (GET запрос)
// - обязательный функционал работает без багов
// - корректная работа с асинхронным кодом
// - DOM изменяется только после того, как запрос успешно выполнен
// - ошибки сервера обрабатываются

// Работа принята!

// ## Можно лучше

// Большое количество параметров лучше передвать в метод или в конструктор используя деструктуризацию.

// Например в коде:
// ~~~
// const newClass = new Class({ windowOne, userForm, popupObj })
// ~~~
// А внутри класса:
// ~~~
// constructor ({ userForm, popupObj, windowOne }) {...}
// ~~~
// И тогда порядок переменных будет неважен, это удобно