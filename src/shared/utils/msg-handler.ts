import { Message } from "discord.js";
import { getTotal, manageRolls } from "./dices.utils";
import { NUMBERS } from "../constants/number.constants";
import { YOU_ROLL_FOR_A_ES } from "../constants/message.constant";
import { FUMBLES } from "../constants/fumble.constants";
import { getFumbleText } from "./fumble.utils";
import { successLiterals } from "../models/get-set.model";
import { getSuccessLevel } from "./attack.utils";
import { getAuthor } from "./message.utils";
import { formatToOneSpace } from "./set-get-roll.utils";

export const getRollText = (msg: Message): string => {
  const total: number = manageRolls(msg.content);
  const roll = msg.content.replaceAll(' ', '');
  return `${getAuthor(msg)} tira: ${roll} y saca: ${total}`
}

export const getFunbleMsg = (msg: Message): string => {
  const fumbleTarget = Math.floor(Math.random() * NUMBERS.N_100) + NUMBERS.N_1;
  return `${getAuthor(msg)}, ${YOU_ROLL_FOR_A_ES} ${fumbleTarget}: ${getFumbleText(fumbleTarget, FUMBLES)}`;
};

export const getModificator = (text: string): number => {
  text =  formatToOneSpace(text);
  const parts = text.split(' ');
  if (parts[NUMBERS.N_1]) {
    const mod = parts[NUMBERS.N_1];
    return (mod.startsWith('+') || mod.startsWith('-')) && !isNaN(eval(mod))? eval(mod) : NUMBERS.N_0;

  } else if (text.indexOf('+') > NUMBERS.N_0 || text.indexOf('-') > NUMBERS.N_0) {
    const mod = text.substring(text.indexOf('+') > NUMBERS.N_0 ? text.indexOf('+') : text.indexOf('-'));
    const nodNumber = mod.substring(NUMBERS.N_1);
    return !isNaN(Number(nodNumber)) && !isNaN(eval(mod))? eval(mod) : NUMBERS.N_0;
  }
  return NUMBERS.N_0;
};

export const getPercentagesRollMsg = (msg: Message): string => {
  const roll = msg.content.substring(NUMBERS.N_1).replaceAll(' ', '');
  const target = eval(roll);
  const rolled = getTotal(['d100']);
  const succesLevel = getSuccessLevel(Number(target), rolled);
  return `${getAuthor(msg)} saca ${rolled} / ${target} - ${successLiterals[succesLevel]}`;
};

