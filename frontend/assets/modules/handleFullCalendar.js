import { Calendar } from '@fullcalendar/core';
import ptBrLocale from '@fullcalendar/core/locales/pt-br';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';
import disableFormAttEvent from './disableFormAttEvent';
import getEventsAgenda from './getEventsAgenda';

function getEvent(element){
    setTimeout(() => {
      axios.get(`${element.href}/true`)
      .then(response => {
        const container = document.querySelector('.full-calendar #event-infos');
        container.innerHTML = response.data;
      })
      .catch(error => console.log(error));
      }, 500)
}

export default async function handleFullCalendar(){
  try {
    const data = await getEventsAgenda();
    const calendarEl = document.getElementById('calendar');
    const divCalendar = document.querySelector('.full-calendar');
    const eventInfo = document.querySelector('.full-calendar #event-infos');
    divCalendar.style.display = 'flex';
    divCalendar.scrollIntoView(true, {
      behavior: "smooth",
    });
  
    const calendar = new Calendar(calendarEl, {
      plugins: [ interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin ],
      initialView: 'dayGridMonth',
      locale: ptBrLocale,
      displayEventTime: true,
      slotLabelFormat: 'HH:mm',
      headerToolbar: {
        left: "prev,next today",
        center: 'title',
        right: 'dayGridMonth,listWeek'
      },
      // timeGridWeek, timeGridDay // not
      //listWeek,dayGridMonth // work
      initialDate: Date.now(),
      navLinks: true,
      selectable: true,
      editable: true,
      dayMaxEvents: true,
      titleFormat: {
        year: 'numeric', month: 'numeric', day: 'numeric',
      },
      buttonText: {
        today: 'Hoje',
        month: 'Mês',
        week: 'Semana',
        day: 'Hoje',
        list: 'Lista'
      },
      events: data,
      eventColor: '#000'
    });
  
    calendar.setOption('locale', 'pt-br');
    calendar.render();

    document.addEventListener('click', (event) => {     
      if (event.target.href.includes('/mostrar/evento')){
        event.preventDefault();
        eventInfo.style.width = '45%';
        document.querySelector(".fc-dayGridMonth-button").click();
        getEvent(event.target);
      }
    });
    const btnClose = document.querySelector('#btn-calendario-close');
    btnClose.onclick = () => {
      document.querySelector('.full-calendar #event-infos').innerHTML = "";
      divCalendar.style.display = 'none';
      eventInfo.style.width = '0';
      disableFormAttEvent();
    }
  } catch (e) {
    console.log(e)
  }
}
