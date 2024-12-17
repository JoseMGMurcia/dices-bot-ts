export interface SwDiceSide {
  symbol: string;
  success: number;
  advantage: number;
  critical: number;
  forcePoints: number;
}

export enum SW_DICE_COLORS {
  GREEN = 've',
  PURPLE = 'pu',
  YELLOW = 'am',
  RED = 'ro',
  BLUE = 'az',
  WHITE = 'bl',
  BLACK = 'ne',
}

export interface ResultType {
  possitive: string[];
  neggative: string[];
}

export interface ResultText {
  success: ResultType;
  advantage: ResultType;
  critical: ResultType;
  forcePoints: ResultType;
}

export interface SwDices {
  green: SwDiceSide[];
  purple: SwDiceSide[];
  yellow: SwDiceSide[];
  red: SwDiceSide[];
  blue: SwDiceSide[];
  white: SwDiceSide[];
  black: SwDiceSide[];
}

