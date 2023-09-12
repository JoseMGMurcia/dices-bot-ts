import { SET_GET_CONSTANTS_ES } from "../constants/message.constant";
import { NUMBERS } from "../constants/number.constants";
import { AttackRoll, SetResponse } from "../models/get-set.model";
import { cutDicesRolls, isRollMsg } from "./message.utils";

export const isSetRollMsg = (text: string) => text.toLowerCase().startsWith(SET_GET_CONSTANTS_ES.SET_ROLL_TEXT);

export const isGetRollMsg = (text: string) => text.toLowerCase().startsWith(SET_GET_CONSTANTS_ES.GET_ROLL_TEXT);

export const isAttackRollMsg = (text: string) => text.toLowerCase().startsWith(SET_GET_CONSTANTS_ES.ROLL_TYPES.ATTACK);

export const manageSetRoll = (text: string, author: string): SetResponse => {
  const parts = formatSetGetText(text).split(' ');
  console.log(parts);
  if (parts?.[NUMBERS.N_1].startsWith(SET_GET_CONSTANTS_ES.ROLL_TYPES.ATTACK)) {
    if ( parts.length < NUMBERS.N_5 ) {
      return {message: 'Faltan parámetros para setear el ataque', success: false};
    }
    if ( isNaN(Number(parts[NUMBERS.N_2])) || isNotARollString(parts[NUMBERS.N_3]) || (parts[NUMBERS.N_4] && isNotARollString(parts[NUMBERS.N_4])) ){
      return {message: 'Parámetros no válidos', success: false};
    }
    const attackRoll: AttackRoll = {
      owner: author,
      attack: Number(parts[NUMBERS.N_2]),
      damage: parts[NUMBERS.N_3],
      specialDamage: parts[NUMBERS.N_4] ? parts[NUMBERS.N_4] : undefined,
      damageModifier: parts[NUMBERS.N_5] ? parts[NUMBERS.N_5] : '',

    };
    return {message: 'Se ha guardado correctamente la tirada', success: true, attacRoll: attackRoll};
  }
  return {message: 'Parámetros incorrectos', success: false};
};

export const isNotARollString = (text: string): boolean => cutDicesRolls(text).some((roll) => !isRollMsg(roll))

export const formatSetGetText = (text: string): string => text.replace(/\s+/g, ' ').toLocaleLowerCase();
