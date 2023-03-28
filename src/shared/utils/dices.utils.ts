import { DICE_SEPARATOR } from "../constants/message.constant";
import { NUMBERS } from "../constants/number.constants";

export const getTotal = (rolls: string[]): number => {
let total = NUMBERS.N_0;
rolls.forEach(roll => {
    const upRoll = roll.toUpperCase();
    if(upRoll.indexOf(DICE_SEPARATOR) === - NUMBERS.N_1) {
      total += Number(roll);
    } else {
      const dice = upRoll.split(DICE_SEPARATOR);
      let negative = false;
      let diceNumber = dice[NUMBERS.N_0].length === NUMBERS.N_0 ? NUMBERS.N_1 : Number(dice[NUMBERS.N_0]);
      const diceType = Number(dice[NUMBERS.N_1]);
      if(diceNumber < NUMBERS.N_0 ){
        negative = true;
        diceNumber = diceNumber * - NUMBERS.N_1;
      }
      for (let i = NUMBERS.N_0; i < diceNumber; i++) {
        if (negative) total -= Math.floor(Math.random() * diceType) + NUMBERS.N_1;
        else total += Math.floor(Math.random() * diceType) + NUMBERS.N_1;
      }
  }
});

return total;

}
