import { SW_INDEX } from "../constants/message.constant";
import { cutDicesRolls, isRollMsg } from "./message.utils";

export const isSWRollMsg = (text: string) => text.toLowerCase().startsWith(SW_INDEX);

export const isNotARollString = (text: string): boolean => cutDicesRolls(text).some((roll) => !isRollMsg(roll))

export const formatToOneSpace = (text: string): string => text.replace(/\s+/g, ' ').toLocaleLowerCase();
