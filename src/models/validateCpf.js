class ValidateCpf {
  constructor(cpf){
    this.arrayCpf = cpf.replace(/\D+/g, '').split('');
    this.firstDigit = false;
    this.secondDigit = false;
  }

  validate(){
    if (typeof this.arrayCpf === undefined) return false;
    if (this.arrayCpf.length !== 11) return false;
    if (this.isSequence()) return false;
    this.firstDigit = this.verifyDigits(9);
    this.secondDigit = this.verifyDigits(10);
    const result = this.result();
    return result;
  }

  verifyDigits(position){
    let cont = position + 1;
    const result = this.arrayCpf.slice(0, position).reduce((acc, current) => {
      acc += Number(current) * cont;
      cont--;
      return acc;
    }, 0);

    if ((result * 10) % 11 === Number(this.arrayCpf[position])) {
      return true;
    } false;
  }

  result(){
    return this.firstDigit && this.secondDigit ? true : false;
  } 

  isSequence = function(){
    let cpfClear = this.arrayCpf.join("");
    return (cpfClear[0].repeat(cpfClear.length) === cpfClear);
  }
}

module.exports = {
  ValidateCpf
}