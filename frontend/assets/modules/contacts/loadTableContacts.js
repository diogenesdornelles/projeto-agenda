export default function loadTableContacts (url) {
  setTimeout(() => {
    // eslint-disable-next-line no-undef
    axios.get(url)
      .then(response => {
        document.querySelector('.index #table-contacts').innerHTML = response.data
      })
      .catch(error => console.log(error))
  }, 500)
}
