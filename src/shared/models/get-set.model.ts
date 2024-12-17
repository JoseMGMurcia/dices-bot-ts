
export interface result {
  rolled: number;
  target: number;
}

export enum SuccesLevel {
  CRITICAL = 'CRITICAL',
  FAILURE = 'FAILURE',
  FUMBLE = 'FUMBLE',
  SPECIAL = 'SPECIAL',
  SUCCESS = 'SUCCESS'
}

export type SuccesLevelType = SuccesLevel.CRITICAL | SuccesLevel.FAILURE | SuccesLevel.FUMBLE | SuccesLevel.SPECIAL | SuccesLevel.SUCCESS;


export const successLiterals = {
  CRITICAL: 'Éxito crítico',
  FAILURE: 'Fallo',
  FUMBLE: 'Pifia',
  SPECIAL: 'Éxito especial',
  SUCCESS: 'Éxito'
}