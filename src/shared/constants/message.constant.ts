export const DICE_SEPARATOR = 'D';

export const FUMBLE_TEXT_ES = 'pifia';
export const YOU_ROLL_FOR_A_ES = 'sacas un:';

export const SW_INDEX = 'sw ';

export const helpText = 
  `Comandos disponibles:
- Tirar dados: cualquier texto que contenga solo números , +, - y d ( ej: 1d20+5 ).
- Tirar 1d100 y saber el tipo de exito: t habilidad ( ej: t50)( ej: t75+15-10 ).
- Tirar pifias: poner pifia.
- Ayuda: help o ?`;
// TODO add SW help


export const SW_HELP_TEXT =
  `El texto debe enpezar con 'sw ' y luego los dados a tirar separados por espacios o +
  Los dados deben tener la forma de un número seguido sin espacios de una de las siguientes combinaciones de letras:
  ve, pu, am, ro, az, bl, ne
  ( ej: sw 2ve 1pu 3am 4ro 5az 6bl 7ne )`;
