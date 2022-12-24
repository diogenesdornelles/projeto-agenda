import handleRegisterNewUser from './handleRegisterNewUser';
import handleLoginUser from './handleLoginUser';
import handleSaveContact from "./handleSaveContact";
import handleUpdateContact from "./handleUpdateContact";
import handleSearchContact from "./handleSearchContact";
import handleDeleteContact from "./handleDeleteContact";
import handleCopyContact from "./handleCopyContact";
import handleLoadTableContacts from "./handleLoadTableContacts";
import handleNewEventContact from "./handleNewEventContact";
import showInsertNewPerson from "./showInsertNewPerson";
import hiddenInsertNewPerson from "./hiddenInsertNewPerson";
import handleFullCalendar from "./handleFullCalendar";
import clearInputs from "./clearInputs";
import handleDeleteEvent from "./handleDeleteEvent";
import handleUpdateEvent from "./handleUpdateEvent";
import enableFormAttEvent from "./enableFormAttEvent";

export default function handleContactBookApp() {

  document.addEventListener('click', handleOperations);

  function handleOperations(event){
    if (event.target.tagName.toLowerCase() === 'button' || event.target.tagName.toLowerCase() === 'a'){
      switch (event.target.innerText.toLowerCase()) {
        case 'buscar': handleSearchContact();
        break;
        case 'inserir contato': showInsertNewPerson();
        break;
        case 'limpar': clearInputs();
        break;
        case 'carregar lista': handleLoadTableContacts();
        break;
        case 'fechar': hiddenInsertNewPerson();
        break;
        case 'enviar': handleSaveContact();
        break;
        case 'deletar': handleDeleteContact(event.target);
        break;
        case 'atualizar': handleUpdateContact(event.target);
        break;
        case 'copiar': handleCopyContact(event.target);
        break;
        case 'abrir agenda': handleFullCalendar();
        break;
        case 'agendar': handleNewEventContact(event.target);
        break;
        case 'apagar': handleDeleteEvent();
        break;
        case 'editar': enableFormAttEvent(event.target);
        break;
        case 'salvar': handleUpdateEvent();
        break;
        case 'logar': handleLoginUser();
        break;
        case 'registrar': handleRegisterNewUser();
        break;
      } 
    }
  }
}
