export default function enableFormAttEvent () {
  const btnSave = document.querySelector('#btn-calendario-save');
  const date = document.querySelector('#date-contact-event');
  const timeStart = document.querySelector('#timestart-contact-event');
  const timeEnd = document.querySelector('#timeend-contact-event');
  const type = document.querySelector('#type-contact-event');
  const title = document.querySelector('#title-contact-event');
  btnSave.removeAttribute('disabled');
  date.removeAttribute('readonly');
  timeStart.removeAttribute('readonly');
  timeEnd.removeAttribute('readonly');
  type.removeAttribute('disabled');
  title.removeAttribute('readonly');
}
