export default function clearInputs(){
  const texts = document.querySelectorAll('TEXTAREA');
  if (texts.length > 0) {
    texts.forEach(element => element.value = '');
  }
  const inputs = document.querySelectorAll('INPUT');
  inputs.forEach(element => element.value = '');
}