export default function clearInputs () {
  const texts = document.querySelectorAll('TEXTAREA')
  if (texts.length > 0) {
    // eslint-disable-next-line no-return-assign
    texts.forEach(element => element.value = '')
  }
  const inputs = document.querySelectorAll('INPUT')
  // eslint-disable-next-line no-return-assign
  inputs.forEach(element => element.value = '')
}
