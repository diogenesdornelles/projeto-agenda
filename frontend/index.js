import 'core-js/stable';
import 'regenerator-runtime';
import 'regenerator-runtime/runtime';
import './assets/css/reset.css';
import './assets/css/style.css';
import './assets/css/styleCalendar.css';
import './assets/css/styleContactBook.css';
import './assets/css/styleHeader.css';
import './assets/css/styleHome.css';
import './assets/css/styleIndex.css';
import './assets/css/styleLogin.css';
import './assets/css/styleFooter.css';
import './assets/css/styleRegister.css';
import initContactBookApp from './assets/modules/initContactBookApp';
import loadImages from "./assets/modules/loadImages";
import manageLoggedUser from './assets/modules/manageLoggedUser';
import spaAppConfig from './assets/modules/spaAppConfig';
import clearInputs from './assets/modules/clearInputs';
// frontend

async function init() {
  try {
    await manageLoggedUser();
    // initialize SPA
    await spaAppConfig();
    // load images 
    await loadImages();
    // clear inputs
    clearInputs();
    // controll contactbook application
    initContactBookApp();

  } catch(e) {
    console.log(e);
  }
}


window.onload = init;
window.onclose = () => { 
  window.localStorage.removeItem("loggedUser");
};
