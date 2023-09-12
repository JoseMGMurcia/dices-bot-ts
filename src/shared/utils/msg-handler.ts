import { Message } from "discord.js";
import { getTotal, manageRolls } from "./dices.utils";
import { NUMBERS } from "../constants/number.constants";
import { FUMBLE_TYPES_TEXT_ES, MELEE_FUMBLE_START, MELEE_FUMBLE_START_2, NATURAL_FUMBLE_START, RANGED_FUMBLE_START, YOU_ROLL_FOR_A_ES } from "../constants/message.constant";
import { MELEE_FUMBLES, NATURAL_FUMBLES, RANGED_FUMBLES } from "../constants/fumble.constants";
import { getFumbleText } from "./fumble.utils";
import { AttackRoll, SuccesLevel, successLiterals } from "../models/get-set.model";
import { getMaximunDamage, getSuccessLevel } from "./attack.utils";
import { getAuthor } from "./message.utils";

export const getRollText = (msg: Message): string => {
  const total: number = manageRolls(msg.content);
  const roll = msg.content.replaceAll(' ', '');
  return `${getAuthor(msg)} tira: ${roll} y saca: ${total}`
}

export const getFunbleMsg = (msg: Message): string => {
  const secondPart = msg.content.split(' ')[NUMBERS.N_1]?.toLocaleLowerCase();
  let text = `${getAuthor(msg)}: ${FUMBLE_TYPES_TEXT_ES}`;

  if(secondPart){
    const fumbleTarget = Math.floor(Math.random() * NUMBERS.N_100) + NUMBERS.N_1;

    text = secondPart.startsWith(   MELEE_FUMBLE_START ) ||  secondPart.startsWith( MELEE_FUMBLE_START_2 ) ?
      `${getAuthor(msg)}, ${YOU_ROLL_FOR_A_ES} ${fumbleTarget}: ${getFumbleText(fumbleTarget, MELEE_FUMBLES)}` : text;
    text = secondPart.startsWith(  RANGED_FUMBLE_START ) ? `${getAuthor(msg)}, ${YOU_ROLL_FOR_A_ES} ${fumbleTarget}: ${getFumbleText(fumbleTarget, RANGED_FUMBLES)}` : text;
    text = secondPart.startsWith( NATURAL_FUMBLE_START ) ? `${getAuthor(msg)}, ${YOU_ROLL_FOR_A_ES} ${fumbleTarget}: ${getFumbleText(fumbleTarget, NATURAL_FUMBLES)}` : text;
  }
  return text;
};

export const getAttackMsg = (msg: Message, attackRolls: AttackRoll[]): string => {
  const attackRoll = attackRolls.find((roll) => roll.owner === getAuthor(msg));
  const rolled = getTotal(['d100']);
  const succesLevel = getSuccessLevel(attackRoll?.attack || NUMBERS.N_5, rolled);
  const damageMapper = {
    [SuccesLevel.CRITICAL]: getMaximunDamage(attackRoll?.specialDamage || ''),
    [SuccesLevel.SPECIAL]: attackRoll?.specialDamage,
    [SuccesLevel.SUCCESS]: attackRoll?.damage,
    [SuccesLevel.FUMBLE]: '',
    [SuccesLevel.FAILURE]: '',
  }
  const modifier = attackRoll?.damageModifier ? getTotal([attackRoll?.damageModifier]) : NUMBERS.N_0;
  const damage = manageRolls(damageMapper[succesLevel] || '');
  const loc = getTotal(['d20']);
  const seccondPart = succesLevel === SuccesLevel.FUMBLE || succesLevel === SuccesLevel.FAILURE ? '': `\n ${damage + modifier} de daño en la loc ${loc}`
  return  `${getAuthor(msg)}: (${rolled} / ${attackRoll?.attack}) - ${successLiterals[succesLevel]}${seccondPart}`;
};

export const getPercentagesRollMsg = (msg: Message): string => {
  const roll = msg.content.substring(NUMBERS.N_1).replaceAll(' ', '');
  const target = eval(roll);
  console.log('target', target );
  const rolled = getTotal(['d100']);
  const succesLevel = getSuccessLevel(Number(target), rolled);
  return `${getAuthor(msg)} saca ${rolled} / ${target} - ${successLiterals[succesLevel]}`;
};

