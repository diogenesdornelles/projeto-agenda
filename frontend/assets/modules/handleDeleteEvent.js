import handleFullCalendar from "./handleFullCalendar";

export default function handleDeleteEvent() {
  const _csrf = document.querySelector('.event-info .csrfToken-event').value;
  const id = document.querySelector('.event-info #id-contact-event').value;
  const eventInfo = document.querySelector('.full-calendar #event-infos');
  let reqURLId = `/delete/event/${id}`;
  axios.delete(reqURLId, {
    data: {
      _csrf: _csrf,
    },
    headers: {
      'X-CSRFToken': _csrf,
    },
    withCredentials: true,
  })
  .then(() => { 
    eventInfo.innerHTML = "";
    eventInfo.style.width = '0';
    document.querySelector(".fc-dayGridMonth-button").click();
    handleFullCalendar();
  })
  .catch((error) => {console.log(error)});
}