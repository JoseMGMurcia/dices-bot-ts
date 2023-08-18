import { FUMBLE_TEXT_ES } from '../constants/message.constant';
import { NUMBERS } from '../constants/number.constants';
import { rollRegex } from '../constants/regex.constants';

export const cutDicesRolls = (text: string) => {
  text = text.replace('-', '+-');
  const rolls = text.split('+');
    rolls.forEach((roll, index) => {
    rolls[index] = roll.trim();
  });
    return rolls;
}
  
export const isRollMsg = (text: string): boolean => rollRegex.test(text);

export const isFumbleMsg = (text: string): boolean => text.toLowerCase().startsWith(FUMBLE_TEXT_ES);

export const deleteMessagesFromSamePerson = (messages: string[]): string[] => {
  const messagesToReturn: string[] = [];
  //invert order
  const reversed = messages.reverse();
  reversed.forEach((message) => {
    const author = message.split(' ')[NUMBERS.N_0];
    if (!messagesToReturn.some((msg) => msg.startsWith(author))) {
      messagesToReturn.push(message);
    }
  });
  return messagesToReturn.reverse();
};