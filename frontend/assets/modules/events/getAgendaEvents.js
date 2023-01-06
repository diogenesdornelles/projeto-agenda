export default async function getAgendaEvents () {
  try {
    // eslint-disable-next-line no-undef
    const response = await axios.get('/eventos/agenda')
    console.log(response)
    if (response.data.length === 0) {
      return [{}]
    } else {
      return response.data
    }
  } catch (e) {
    console.log(e)
  }
}
