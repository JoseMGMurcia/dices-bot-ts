import { DICE_SEPARATOR } from '../constants/message.constant';
import { NUMBERS } from '../constants/number.constants';
import { SuccesLevel, SuccesLevelType } from '../models/get-set.model';
import { cutDicesRolls } from './message.utils';

export const getSuccessLevel = (target: number, result: number): SuccesLevelType => {
  if( (result <= Math.ceil(target / NUMBERS.N_20)) || result === NUMBERS.N_1) {
    return SuccesLevel.CRITICAL;
  } else if ( result <= Math.ceil(target / NUMBERS.N_5)) {
    return SuccesLevel.SPECIAL;
  } else if ( (result <= target && result <= NUMBERS.N_95) || (result < NUMBERS.N_6)) {
    return SuccesLevel.SUCCESS;
  } else if ( result > target && result < getFumbleTarget(target)) {
    return SuccesLevel.FAILURE;
  } else {
    return SuccesLevel.FUMBLE;
  }
}

export const getFumbleTarget = (target: number): number => {
  let fumbleTarget = NUMBERS.N_100;
  fumbleTarget = target < NUMBERS.N_71 ? NUMBERS.N_99 : fumbleTarget;
  fumbleTarget = target < NUMBERS.N_51 ? NUMBERS.N_98 : fumbleTarget;
  fumbleTarget = target < NUMBERS.N_31 ? NUMBERS.N_97 : fumbleTarget;
  fumbleTarget = target < NUMBERS.N_11 ? NUMBERS.N_96 : fumbleTarget;
  return fumbleTarget;
};

export const getMaximunDamage = (damage: string): string => {
  const rolls = cutDicesRolls(damage);
  let total = NUMBERS.N_0;
  rolls.forEach(roll => {
    const upRoll = roll.toUpperCase();
    if(upRoll.indexOf(DICE_SEPARATOR) === -NUMBERS.N_1) {
      // Not a dice
      total += Number(roll);
    }else {
      // Is a dice
      const dice = upRoll.split(DICE_SEPARATOR);
      
      let diceNumber = dice[NUMBERS.N_0].length === NUMBERS.N_0 ? NUMBERS.N_1 : Number(dice[NUMBERS.N_0]);
      const diceType = Number(dice[NUMBERS.N_1]);
      const negative = diceNumber < NUMBERS.N_0 ? true: false;
      diceNumber = negative ? diceNumber * - NUMBERS.N_1 : diceNumber;
      if (negative) {
        total -= diceType * diceNumber;
      }
      else {
        total += diceType * diceNumber;
      }
    }
    
  });
  return total.toString();
};


// set at 70 1d8 2d8+3