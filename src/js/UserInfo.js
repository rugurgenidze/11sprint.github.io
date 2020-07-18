"use strict";

export class UserInfo {
  constructor(userName, userJob, userAvatar, inputName, inputJob) {
    this.userName = userName;
    this.userJob = userJob;
    this.userAvatar = userAvatar;
    this.inputName = inputName;
    this.inputJob = inputJob;
  }
  setUserInfo(newName, newJob, newAvatar) {
    //получили с сервера
    this.name = newName;
    this.about = newJob;
    this.avatar = newAvatar;
  }
  updateUserInfo() {
    //записали на странице
    this.userName.textContent = this.name;
    this.userJob.textContent = this.about;
    this.userAvatar.style.backgroundImage = `url(${this.avatar})`;
  }
  renderUserInfo(){
    //при открытии формы
    this.inputName.value = this.userName.textContent;
    this.inputJob.value = this.userJob.textContent;
  }
}