export const rollRegex = /^([dD]|[0-9]|[+]|[-]|[ ])+$/;  //Text only contains [D, +, - , numbers, spaces]

export const percentRollRegex = /^[tT][0-9+*-\s]*$/;  //Text starts with T or t and only contains numbers, spaces, *, - and +

export const SPACE_AND_PLUS_REGEX = /[\s+]/; //Regex to separate the rolls cutting by spaces and plus symbols.

export const BEGINING_SW_NUMBER_REGEX = /^\d+/; //Regex to get the number at the beginning of the roll.