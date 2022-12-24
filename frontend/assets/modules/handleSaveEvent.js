import handleFrontEnd from "./handleFrontEnd";
const moment = require('moment');

export default function saveEvent(id) {
  
  const _name = document.querySelector('#schedule-name');
  const surname = document.querySelector('#schedule-surname');
  const date = document.querySelector('#date');
  const timeStart = document.querySelector('#timestart');
  const timeEnd = document.querySelector('#timeend');
  const type = document.querySelector('#event-options');
  const title = document.querySelector('#title-event');
  const _csrf = document.querySelector('.header-table ._csrf');
  
  const arrayEls = [_name.checkValidity(), surname.checkValidity(), date.checkValidity(), timeStart.checkValidity(), timeEnd.checkValidity(), type.checkValidity(), title.checkValidity()];
  if (arrayEls.includes(false)) return;

  const checkData = _name.value && surname.value && date.value && timeStart.value && timeEnd.value && type.value && title.value;
  if (!checkData) {
    alert('Informar todos os dados corretamente!');
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

  axios.post(`/salvar/evento/${id}`, {
    _csrf: _csrf.dataset.csrftoken,
    name: _name.value,
    surname: surname.value,
    start: `${date.value}T${timeStart.value}:00`,
    end: `${date.value}T${timeEnd.value}:00`,
    type: type.value,
    title: title.value,
  })
  .then(() => {
    handleFrontEnd(`event`, id);
  }).catch(error => console.log(error));
}