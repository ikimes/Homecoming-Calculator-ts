export default interface Power {
  name: string;
  icon: string;
  full_name?: string; // this shouldn't be here
  display_name?: string; // this shouldn't be here
  isAoE: boolean;
  custom_fx: any; // ???
  arc: number;
  radius: number;
  displayName: string;
  category: PowersetDataKeys; // this should be enum'd
  damageEnhancement: number;
  rechargeEnhancement: number;
  standardProcs: number;
  purpleProcs: number;
  damage: number;
  castTime: number;
  castTimeBeforeEffect: number;
  enduranceCost: number;
  rechargeTime: number;
  powerIsRecharged: boolean;
  displayScrapperCriticalDamage: boolean;
  displayScrappersStrikeATO: boolean;
  displayStealthCrit: boolean;
  isCritStrikes: boolean;
  powerIsInCritStrikesWindow: boolean;
  comboLevel: number;
  targetsHit: number;
  maxTargetsHit: string;
  numberOfTeammates: number;
  assassinsFocusStacks: number;

  // is this the json written keys?
  activation_time?: string;
  endurance_cost?: string;
  max_targets_hit?: string;
  recharge_time?: string;
  fx?: any;
}

export type PowersetDataKeys = 'primary' | 'secondary' | 'epic';

// TODO
/*
  Need to split a meaningful difference between chainPowers (powers from json) and type definition here???? There are some added properties such as powerIsInCritStrikesWindow
*/