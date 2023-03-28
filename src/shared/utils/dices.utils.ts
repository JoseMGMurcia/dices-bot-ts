import { DICE_SEPARATOR } from "../constants/message.constant";
import { NUMBERS } from "../constants/number.constants";
import { cutDicesRolls } from "./message.utils";

export const getTotal = (rolls: string[]): number => {
    let total = NUMBERS.N_0;
    rolls.forEach(roll => {
        const upRoll = roll.toUpperCase();
        if(upRoll.indexOf(DICE_SEPARATOR) === - NUMBERS.N_1) {
            // Not a dice
            total += Number(roll);
        } else {
            // Is a dice
            const dice = upRoll.split(DICE_SEPARATOR);
            
            let diceNumber = dice[NUMBERS.N_0].length === NUMBERS.N_0 ? NUMBERS.N_1 : Number(dice[NUMBERS.N_0]);
            const diceType = Number(dice[NUMBERS.N_1]);
            const negative = diceNumber < NUMBERS.N_0 ? true: false;
            diceNumber = negative ? diceNumber * - NUMBERS.N_1 : diceNumber;
            for (let i = NUMBERS.N_0; i < diceNumber; i++) {
                if (negative) {
                    total -= Math.floor(Math.random() * diceType) + NUMBERS.N_1;
                }
                else {
                    total += Math.floor(Math.random() * diceType) + NUMBERS.N_1;
                }
            }
        }
    });
    return total;
};

export const manageRolls = (rollsText: string): number => {
    const rolls = cutDicesRolls(rollsText);
    return getTotal(rolls);
};




