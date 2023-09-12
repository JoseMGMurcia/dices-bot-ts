export interface SetResponse {
  message: string;
  success: boolean;
  attacRoll?: AttackRoll;
}

export interface AttackRoll {
  owner: string;
  attack: number;
  damage: string;
  specialDamage?: string;
  damageModifier?: string;
};

export interface RolledAttack {
  owner: string;
  target: number;
  rolled: number;
  damage: string;
  location: string;
};

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