import saveEvent from "./handleSaveEvent";
import clearInputs from "./clearInputs";

function configureUIModal(modal){
  modal.style.display = "flex";
  modal.style.flexDirection = "column";
  modal.style.width = '45vw';
  modal.style.height = '75vh';
  modal.style.position = "absolute";
  modal.style.top = "50%";
  modal.style.left = "50%";
  modal.style.transform = "translate(-50%, -50%)";
}

function setDataOnFields(lis) {
  const _name = document.querySelector('#schedule-name');
  const surname = document.querySelector('#schedule-surname');
  const infos = [];
  clearInputs();
  lis.forEach((li) => {
    infos.push(li.innerText);
  })
  _name.value = infos[0];
  surname.value = infos[1];
}

export default function handleNewEventContact(element) {
  const modal = document.querySelectorAll('DIALOG')[1];
  const ul = element.parentNode.parentNode;
  const lis = ul.querySelectorAll('LI:not(.li-btns)');
  const btnClose = document.querySelector('#dialog-btn-close-schedule');
  const btnSend = document.querySelector('#dialog-btn-send-schedule');
  const id = element.dataset.id;  
  modal.showModal();
  configureUIModal(modal);
  setDataOnFields(lis);
  btnClose.onclick = () => {
    clearInputs();
    modal.close();
    modal.style.display = 'none';
  }
  btnSend.addEventListener('click', () => saveEvent(id), {once : true});
}
