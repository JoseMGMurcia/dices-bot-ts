import { rollRegex } from "../constants/regex.constants";

export const cutDicesRolls = (text: string) => {
  text = text.replace("-", "+-");
  const rolls = text.split("+");
    rolls.forEach((roll, index) => {
    rolls[index] = roll.trim();
  });
    return rolls;
}
  
export const replaceAuthorName = (text: string) => {
  text = text.replace("Gwerfaur", "Pepe");
  text = text.replace("Sithcario", "Ferrán");
  return text;
}

export const isRollMsg = (text: string): boolean => rollRegex.test(text);