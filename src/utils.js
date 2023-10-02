import sw1 from './images/sw1.jpg';
import sw2 from './images/sw2.jpeg';
import sw3 from './images/sw3.jpeg';
import sw4 from './images/sw4.jpg';
import sw5 from './images/sw5.jpeg';
import sw6 from './images/sw6.jpeg';
import none from './images/none.jpeg';

export const currencyFormatter = new Intl.NumberFormat(undefined, {
  currency: "idr",
  style: "currency",
  minimumFractionDigits: 0,
})

export const getMoviePrice = (id) => {
  switch(id) {
    case 1:
      return 34000
    case 2:
      return 35000
    case 3:
      return 36000
    case 4:
      return 31000
    case 5:
      return 32000
    case 6:
      return 33000
    default:
      return 30000
  }
}

export const getMovieImage = (id) => {
  switch (id) {
    case 1:
      return sw1
    case 2:
      return sw2
    case 3:
      return sw3
    case 4:
      return sw4
    case 5:
      return sw5
    case 6:
      return sw6
    default:
      return none
  }
}