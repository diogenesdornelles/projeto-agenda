export default function loadTableContacts(url) {
  setTimeout(() => {
    axios.get(url)
    .then(response => {
      document.querySelector('.index #table-contacts').innerHTML = response.data;
    })
    .catch(error => console.log(error));
    }, 500)
}
