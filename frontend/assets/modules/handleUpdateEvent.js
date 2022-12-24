import disableFormAttEvent from './disableFormAttEvent';
import handleFrontEnd from "./handleFrontEnd";
import handleFullCalendar from "./handleFullCalendar";
const moment = require('moment');

export default function handleUpdateEvent() {

  const eventInfo = document.querySelector('.full-calendar #event-infos');
  const date = document.querySelector('#date-contact-event');
  const timeStart = document.querySelector('#timestart-contact-event');
  const timeEnd = document.querySelector('#timeend-contact-event');
  const type = document.querySelector('#type-contact-event');
  const title = document.querySelector('#title-contact-event');
  const _csrf = document.querySelector('.event-info .csrfToken-event');
  const id = document.querySelector('#id-contact-event').value;
  
  const arrayEls = [date.checkValidity(), timeStart.checkValidity(), timeEnd.checkValidity(), type.checkValidity(), title.checkValidity()];
  if (arrayEls.includes(false)) return;

  const checkData = date.value && timeStart.value && timeEnd.value && type.value && title.value;
  if (!checkData) {
    alert('Informar dados corretamente!');
    return;
  }
  
  const dayInit = moment('09:00','HH:mm');
  const dayFinal = moment('18:00','HH:mm');
  const h1 = moment(timeStart.value,'HH:mm');
  const h2 = moment(timeEnd.value,'HH:mm');
  const isMajor = h2 >= h1;
  let onDayEvent;
  if (dayFinal >= h1 && h1 >= dayInit) {
    onDayEvent = true;
  } else {
    onDayEvent = false;
  }

  if (!isMajor) {
    alert('Hora de início do evento maior que a de fim!');
    return;
  }

  if (!onDayEvent) {
    alert('Evento fora do horário regular: 09:00 a 18:00');
    return;
  }
  
  axios.put(`/atualizar/evento/${id}`, {
    _csrf: _csrf.value,
    start: `${date.value}T${timeStart.value}`,
    end: `${date.value}T${timeEnd.value}`,
    type: type.value,
    title: title.value,
  })
  .then(() => {
    handleFrontEnd(`attevent`, id);
    eventInfo.innerHTML = "";
    eventInfo.style.width = '0';
    document.querySelector(".fc-dayGridMonth-button").click();
    handleFullCalendar();
    disableFormAttEvent();
  }).catch(error => console.log(error)) 
}
