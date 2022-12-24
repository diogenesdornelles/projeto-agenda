export default function handleCopyContact(element){
  let infos = [];
  let data = ['Nome: ', 'Sobrenome: ', 'Email: ', 'telefone: ', 'Data de nascimento: ', 'Sexo: ', 'CPF: '];
  let text = '';
  const ul = element.parentNode.parentNode;
  const lis = ul.querySelectorAll('LI:not(.li-btns)');
  lis.forEach((li) => {
    infos.push(li.innerText);
  })
  infos.forEach((info, index) => {
    text += `${data[index]}${info} \n`;
  })
  navigator.clipboard.writeText(text);
  alert(`Dados do contato: \n ${text}`);
}