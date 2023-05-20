import { rollRegex } from '../constants/regex.constants';

export const cutDicesRolls = (text: string) => {
  text = text.replace('-', '+-');
  const rolls = text.split('+');
    rolls.forEach((roll, index) => {
    rolls[index] = roll.trim();
  });
    return rolls;
}
  
export const getReplacedAuthorName = (text: string) => {
  text = text.replace('Gwerfaur', 'Pepe');
  text = text.replace('Sithcario', 'Ferrán (Sargon)');
  text = text.replace('Kreypher', 'Gaspar (Danisha)');
  text = text.replace('Monodosis', 'Gines (ShiYan Ming)');
  text = text.replace('Yoi-Lolo', 'Manolo (Fenual)');
  text = text.replace('JimmyOwl', 'Carlos (Crotos)');
  text = text.replace('Cuco', 'Cuco (Oso Gris)');
  text = text.replace('Marcelino', 'Marcelino (Dalas)');
  text = text.replace('José Rafael Abellán', 'JR Abellán (Valantain)');
  return text;
}

export const isRollMsg = (text: string): boolean => rollRegex.test(text);