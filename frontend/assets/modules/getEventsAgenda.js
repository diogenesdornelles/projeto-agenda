export default async function getEventsAgenda() {
  try {
    let response;
    response = await axios.get('/eventos/agenda');
    if (response.data.length === 0) {
      response = [{}]
      return response;
    } else {
      return response.data;
    }
  } catch (e) {
    console.log(e)
  }
}
