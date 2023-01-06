export default function disableFormAttEvent () {
  const btnSave = document.querySelector('#btn-calendario-save')
  const date = document.querySelector('#date-contact-event')
  const timeStart = document.querySelector('#timestart-contact-event')
  const timeEnd = document.querySelector('#timeend-contact-event')
  const type = document.querySelector('#type-contact-event')
  const title = document.querySelector('#title-contact-event')
  btnSave.disabled = true
  date.readonly = true
  timeStart.readonly = true
  timeEnd.readonly = true
  type.disabled = true
  title.readonly = true
}
