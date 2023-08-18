import { NUMBERS } from '../constants/number.constants';

export const getFumbleText = (fumbleTarget: number, fumbles: {  minRange: number, maxRange: number, text: string }[]): string => {
  let text = fumbles[NUMBERS.N_0].text;
  fumbles.forEach(fumble => {
    if (fumble.minRange <= fumbleTarget && fumbleTarget <= fumble.maxRange) {
      text = fumble.text;
    }
  });
  return text;
};