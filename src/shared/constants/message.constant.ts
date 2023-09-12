export const DICE_SEPARATOR = 'D';

export const FUMBLE_TEXT_ES = 'pifia';
export const YOU_ROLL_FOR_A_ES = 'sacas un:';

export const FUMBLE_TYPES_TEXT_ES = 'Los tipos de pifia son:\n - Cuerpo a cuerpo\n- Distancia\n- Natural\n\nPrueba a poner Pifia seguido de uno de los 3 tipos';

export const MELEE_FUMBLE_START = 'cu';
export const MELEE_FUMBLE_START_2 = 'cc';
export const RANGED_FUMBLE_START = 'di';
export const NATURAL_FUMBLE_START = 'na';

export const SET_GET_CONSTANTS_ES = {
  SET_ROLL_TEXT: 'set',
  GET_ROLL_TEXT: 'get',
  ROLL_TYPES:{
    ATTACK: 'at',  
  }
}

export const helpText = 
  `Comandos disponibles:
- Tirar dados: cualquier texto que contenga solo números , +, - y d ( ej: 1d20+5 ).
- Tirar 1d100 y saber el tipo de exito: t habilidad ( ej: t50)( ej: t75+15-10 ).
- Tirar pifias: poner pifia seguido de uno de los 3 tipos cc, di o na ( ej: pifia cc ).
- Guardar una tirada de ataque para tirarla despues
  set at habilidad daño daño especial modificador de daño
  ( ej: set at 50 1d8+1 2d8+2 1d4 ).
- Tirar un ataque guardado: at.
- Consultar un ataque guardado: get at.
- Ayuda: help o ?`;