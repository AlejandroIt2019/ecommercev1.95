import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidarRutService {

  constructor() { }
  validateRUT(rut: number | string) {
    if (typeof rut !== 'string' && typeof rut !== 'number') {
      console.log(typeof rut)
      throw new TypeError('Input parameter must be of type string or integer')
    }

    const cleanRUT = typeof rut === 'string' ? this.clearRUT(rut) : String(rut)
    const checkDigit = [...cleanRUT].slice(-1)[0]
    const withoutCheckDigitRUT = cleanRUT.slice(0, -1)
    const obtainedCheckDigit = this.getCheckDigit(withoutCheckDigitRUT)

    return checkDigit.toLowerCase() === obtainedCheckDigit.toLowerCase()
  }
  getCheckDigit(rut: any) {
    const cleanRUT = this.clearRUT(rut)
    const reversedRUT = [...String(cleanRUT)].map(v => parseInt(v)).reverse()
    let result = 0

    for (let i = 0, j = 2; i < reversedRUT.length; i++, j < 7 ? j++ : j = 2) {
      result += reversedRUT[i] * j;
    }

    return (11 - (result % 11)) <= 9 ? String((11 - (result % 11))) : 'K'
  }
  clearRUT(rut: any) {
    return String(rut).replace(/[^0-9a-z]/gi, '');
  }
  generateRandomRUT(amount = 1, dots = false, hyphen = false) {
    const generatedRUTs = [...Array(amount).keys()].map(() => {
      const rut = Math.floor(1000000 + Math.random() * 30000000)
      return `${dots ? rut.toLocaleString() : rut}${hyphen ? '-' : ''}${this.getCheckDigit(rut)}`
    })

    return amount === 1 ? generatedRUTs[0] : generatedRUTs
  }
  validarRUT = (rut: string | number):boolean => {
    if (typeof rut === 'string' || typeof rut === 'number') {
      const rutSinFormato = this.limpiarRUT(rut);
      const rutSinDv = rutSinFormato.slice(0, -1);
      const rutDv = rutSinFormato.split('').pop()?.toLowerCase();

      return this.calcularDv(rutSinDv) === rutDv;
    }
    else {
      return false;
    }
  };
  calcularDv = (rut: any) => {
    let suma = 0;
    let rutReversa = this.limpiarRUT(rut).split('').reverse();
    console.log(rutReversa)

    for (let i = 0, j = 2; i < rutReversa.length; i++, j < 7 ? j++ : j = 2) {
      suma += parseInt(rutReversa[i]) * j;
    }

    let resultado = 11 - (suma % 11)
    if (resultado === 11) return '0';
    if (resultado === 10) return 'k';
    return String(resultado);
  };

  limpiarRUT = (rut: any) => {
    return String(rut).replace(/[^0-9a-z]/gi, '');
  }


}
