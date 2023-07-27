export default interface Power {
  name: string;
  full_name?: string; // this shouldn't be here
  display_name?: string; // this shouldn't be here
  isAoE: boolean;
  custom_fx: string; // ???
  arc: number;
  radius: number;
  displayName: string;
  category: string; // this should be enum'd
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
  maxTargetsHit: number;
  numberOfTeammates: number;
  assassinsFocusStacks: number;
}