import { Client, Message } from 'discord.js';
import { post } from '../shared/utils/post.utils';
import { SW_HELP_TEXT, SW_INDEX } from '../shared/constants/message.constant';
import { BEGINING_SW_NUMBER_REGEX, SPACE_AND_PLUS_REGEX } from '../shared/constants/regex.constants';
import { PLUS_SYMBOL, SPACE, STRING_EMPTY } from '../shared/constants/strinf.constants';
import { ResultText, SW_DICE_COLORS, SwDices, SwDiceSide } from './sw.models';
import { NUMBERS } from '../shared/constants/number.constants';
import { getAuthor } from '../shared/utils/message.utils';

export const getDicesObject = (): SwDices => {
  const dices = require('./dices.json');
  return dices;
};

export const getResultexts = (): ResultText => {
  const resultTexts = require('./result-texts.json');
  return resultTexts;
};

const dices = getDicesObject();
const resultTexts = getResultexts();

export const handleSWRolls = (msg: Message, client: Client) => {
  const unindexedText = msg.content.slice(SW_INDEX.length);
  const rolls = unindexedText.split(SPACE_AND_PLUS_REGEX);
  const cleanRolls = rolls.filter((roll) => roll !== STRING_EMPTY && roll !== SPACE && roll !== PLUS_SYMBOL);

  if (cleanRolls.every(isValidSWRoll)) {
    const results: SwDiceSide[] = []
    cleanRolls.forEach((roll) => {
      const color = getDiceColor(roll);
      if (!color) { return; }
      const number = getRollNumber(roll);
      const dice = getDice(color);
      for (let i = 0; i < number; i++) {
        const rollResult = dice[Math.floor(Math.random() * dice.length)];
        results.push(rollResult);
      }   
    });

    const symbols = results.map((result) => result.symbol).join(STRING_EMPTY);
    let success = 0;
    let advantage = 0;
    let critical = 0;
    let forcePoints = 0;

    results.forEach(result => {
      success += result.success;
      advantage += result.advantage;
      critical += result.critical;
      forcePoints += result.forcePoints;
    });
    let text = [];
    if (success !== 0) text.push(getResultText(success, 'success'));
    if (advantage !== 0) text.push(getResultText(advantage, 'advantage'));
    if (critical !== 0) text.push(getResultText(critical, 'critical'));
    if (forcePoints !== 0) text.push(getResultText(forcePoints, 'forcePoints'));

    if (text.length === 0) return  post('No se han producido resultados', msg, client);
  
    post(`${getAuthor(msg)} tira: ${symbols}\n ${text.join(', ')}`, msg, client);



  } else { 
    post(SW_HELP_TEXT, msg, client);
  }
};

export const isValidSWRoll = (text: string): boolean => {
  const startsWithAPositiveNumber = BEGINING_SW_NUMBER_REGEX.test(text);
  const restOfTheText = text.slice(BEGINING_SW_NUMBER_REGEX.exec(text)?.[NUMBERS.N_0].length);
  const hasAColor = !!getDiceColor(restOfTheText);
  return startsWithAPositiveNumber && hasAColor;
};

export const getDiceColor = (text: string): SW_DICE_COLORS | undefined => {
  let colorToReturn: SW_DICE_COLORS | undefined = undefined;
  Object.values(SW_DICE_COLORS).forEach((color) => {
    if (text.includes(color)) { colorToReturn = color; }
  });
  return colorToReturn;
};

export const getRollNumber = (text: string): number => {
  return Number(BEGINING_SW_NUMBER_REGEX.exec(text)?.[NUMBERS.N_0]);
};

export const getDice = (text: SW_DICE_COLORS): SwDiceSide[] => {
  const diceMapper = {
    [SW_DICE_COLORS.GREEN]: dices.green,
    [SW_DICE_COLORS.PURPLE]: dices.purple,
    [SW_DICE_COLORS.YELLOW]: dices.yellow,
    [SW_DICE_COLORS.RED]: dices.red,
    [SW_DICE_COLORS.BLUE]: dices.blue,
    [SW_DICE_COLORS.WHITE]: dices.white,
    [SW_DICE_COLORS.BLACK]: dices.black,
  };
  return diceMapper[text];
};

export const getResultText = (
  number: number,
  type: 'success' | 'advantage' | 'critical' | 'forcePoints'
) => {
  // If result is positive
  try {
    if (number >= 0) {
      // If result is 1, use singular
      if (number === 1) return `${number} ${resultTexts[type].possitive[0]}`;
      return `${number} ${resultTexts[type].possitive[1]}`;
    } else {
      if (number === -1) return `${Math.abs(number)} ${resultTexts[type].neggative[0]}`;
      return `${Math.abs(number)} ${resultTexts[type].neggative[1]}`;
    }
  }
  catch(e: any) {
    console.error(`Unspected error ${e}`);
  }
  
};
