import hiddenInsertNewPerson from "./hiddenInsertNewPerson";
import loadTableContacts from "./loadTableContacts";

export default function handleSearch() {
    
  let reqURL;
  const value = document.querySelector('.container-contactBook #text-search').value;
  if (value){
    if (document.querySelector('.container-contactBook #option-search-cpf').checked) {
      reqURL = `/agenda/searchContact/CPF/${value.trim()}`
    } else {
      reqURL = `/agenda/searchContact/name/${value.trim()}`
    }
    loadTableContacts(reqURL);
    hiddenInsertNewPerson();
  } else {
    alert('Informe dados de pesquisa!')
  }
}