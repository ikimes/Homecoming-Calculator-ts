import { ArchetypeModifiers } from "../constants/modifiers";

const SCRAPPERS_STRIKE_CRIT_BONUS = 0.06;
const CRIT_STRIKES_BONUS = 0.50;

function getModifiedMeleeDamage({
  powerEffects,
  powerTemplates,
  archetype,
  ScrappersStrikeCritBonus,
  critDamage,
  powerIsInCritStrikesWindow,
  critStrikesChance,
  stealthCritDamage,
  numberOfTeammates,
  isAoE
}: any) {
  let powerDamage = 0;
  let modifiedDamage = 0;
  let duration = Number(powerTemplates.duration.split(' ')[0]) ?? 0;
  let application_period = powerTemplates.application_period;
  let CRIT_STRIKES_WINDOW_BONUS = CRIT_STRIKES_BONUS * critStrikesChance;

  if(powerEffects.requires_expression === "Source.Mode?(kDD_BonusAoEMode_2)") {
    return 0;
  }
  if(powerEffects.requires_expression === "Source.Mode?(kDD_BonusDoTMode_2)") {
    return 0;
  }

  if(archetype === "Blaster") {
    modifiedDamage += powerTemplates.scale * ArchetypeModifiers.Melee_Damage_Blaster;

    if(duration > 0) {
      let tickDamage = powerTemplates.tick_chance * powerTemplates.scale * ArchetypeModifiers.Melee_Damage_Blaster
      let ticks = Math.ceil(duration / application_period) * powerTemplates.tick_chance
      powerDamage += powerEffects.chance * (ticks * tickDamage);
    } else {
      powerDamage += powerEffects.chance * modifiedDamage;
    }
  }
  if(archetype === "Brute") {
    modifiedDamage += powerTemplates.scale * ArchetypeModifiers.Melee_Damage_Brute;

    if(duration > 0) {
      let tickDamage = powerTemplates.tick_chance * powerTemplates.scale * ArchetypeModifiers.Melee_Damage_Brute
      let ticks = Math.ceil(duration / application_period) * powerTemplates.tick_chance
      powerDamage += powerEffects.chance * (ticks * tickDamage);
    } else {
      powerDamage += powerEffects.chance * modifiedDamage;
    }
  }
  if(archetype === "Sentinel") {
    modifiedDamage += powerTemplates.scale * ArchetypeModifiers.Melee_Damage_Sentinel;

    if(duration > 0) {
      let tickDamage = powerTemplates.tick_chance * powerTemplates.scale * ArchetypeModifiers.Melee_Damage_Sentinel
      let ticks = Math.ceil(duration / application_period) * powerTemplates.tick_chance
      powerDamage += powerEffects.chance * (ticks * tickDamage);
    } else {
      powerDamage += powerEffects.chance * modifiedDamage;
    }
  }
  if(archetype === "Scrapper") {
    if (
      critDamage &&
      !ScrappersStrikeCritBonus &&
      powerEffects.tags.includes('CritLarge')
    ) {
      if(powerIsInCritStrikesWindow) {
        modifiedDamage += (powerEffects.chance + CRIT_STRIKES_WINDOW_BONUS)  * powerEffects.templates[0].scale * ArchetypeModifiers.Melee_Damage_Scrapper
      } else {
        modifiedDamage += powerEffects.chance * powerEffects.templates[0].scale * ArchetypeModifiers.Melee_Damage_Scrapper
      }
    } else if (
      critDamage &&
      ScrappersStrikeCritBonus &&
      powerEffects.tags.includes('CritLarge')
    ) {
      if(powerIsInCritStrikesWindow) {
        modifiedDamage += (powerEffects.chance + SCRAPPERS_STRIKE_CRIT_BONUS + CRIT_STRIKES_WINDOW_BONUS)  * powerEffects.templates[0].scale * ArchetypeModifiers.Melee_Damage_Scrapper
      } else {
        modifiedDamage += (powerEffects.chance + SCRAPPERS_STRIKE_CRIT_BONUS) * powerEffects.templates[0].scale * ArchetypeModifiers.Melee_Damage_Scrapper
      }
    } else if (
      critDamage &&
      !ScrappersStrikeCritBonus &&
      powerEffects.tags.includes('CritLarge')
    ) {
      if(powerIsInCritStrikesWindow) {
        modifiedDamage += (powerEffects.chance + CRIT_STRIKES_WINDOW_BONUS)  * powerEffects.templates[0].scale * ArchetypeModifiers.Melee_Damage_Scrapper
      } else {
        modifiedDamage += powerEffects.chance * powerEffects.templates[0].scale * ArchetypeModifiers.Melee_Damage_Scrapper
      }
    } else if (
      critDamage &&
      ScrappersStrikeCritBonus &&
      powerEffects.tags.includes('CritLarge')
    ) {
      if(powerIsInCritStrikesWindow) {
        modifiedDamage += (powerEffects.chance + SCRAPPERS_STRIKE_CRIT_BONUS + CRIT_STRIKES_WINDOW_BONUS)  * powerEffects.templates[0].scale * ArchetypeModifiers.Melee_Damage_Scrapper
      } else {
        modifiedDamage += (powerEffects.chance + SCRAPPERS_STRIKE_CRIT_BONUS) * powerEffects.templates[0].scale * ArchetypeModifiers.Melee_Damage_Scrapper
      }
    } else if(!powerEffects.tags.includes('CritLarge') && !powerEffects.tags.includes('CritSmall')) {
      modifiedDamage += powerEffects.chance * powerTemplates.scale * ArchetypeModifiers.Melee_Damage_Scrapper
    }

    if(duration > 0) {
      let tickDamage = powerTemplates.tick_chance * powerTemplates.scale * ArchetypeModifiers.Melee_Damage_Scrapper
      let ticks = Math.ceil(duration / application_period) * powerTemplates.tick_chance
      powerDamage += powerEffects.chance * (ticks * tickDamage);
    } else {
      powerDamage += modifiedDamage;
    }
  }
  if(archetype === "Stalker") {
    let critChance = 0;
    if(powerEffects.child_effects.length !== 0) {
      critChance = powerEffects.child_effects[1].chance;
    } else {
      critChance = 0;
    }

    modifiedDamage += (powerTemplates.scale * ArchetypeModifiers.Melee_Damage_Stalker) * (1 + critChance + (0.03 * (numberOfTeammates) + 0.03));

    if(duration > 0) {
      let tickDamage = powerTemplates.tick_chance * powerTemplates.scale * ArchetypeModifiers.Melee_Damage_Stalker
      let ticks = Math.ceil(duration / application_period) * powerTemplates.tick_chance
      powerDamage += powerEffects.chance * (ticks * tickDamage);
    } else {
      powerDamage += powerEffects.chance * modifiedDamage;
    }

    if(stealthCritDamage) {
      if(isAoE) {
        powerDamage += powerDamage * 0.5;
      } else {
        powerDamage += powerDamage;
      }
    }
  }
  if(archetype === "Tanker") {
    modifiedDamage += powerTemplates.scale * ArchetypeModifiers.Melee_Damage_Tanker;

    if(duration > 0) {
      let tickDamage = powerTemplates.tick_chance * powerTemplates.scale * ArchetypeModifiers.Melee_Damage_Tanker
      let ticks = Math.ceil(duration / application_period) * powerTemplates.tick_chance
      powerDamage += powerEffects.chance * (ticks * tickDamage);
    } else {
      powerDamage += powerEffects.chance * modifiedDamage;
    }
  }

  return powerDamage;
}

function getModifiedRangedDamage({
  powerEffects,
  powerTemplates,
  archetype,
  ScrappersStrikeCritBonus,
  critDamage,
  powerIsInCritStrikesWindow,
  critStrikesChance,
  stealthCritDamage,
  isAoE,
  numberOfTeammates
}: any) {
  let powerDamage = 0;
  let modifiedDamage = 0;
  let duration = Number(powerTemplates.duration.split(' ')[0]);
  let application_period = powerTemplates.application_period;
  let CRIT_STRIKES_WINDOW_BONUS = CRIT_STRIKES_BONUS * critStrikesChance;

  if(powerEffects.requires_expression === "Source.Mode?(kDD_BonusAoEMode_2)") {
    return 0;
  }
  if(powerEffects.requires_expression === "Source.Mode?(kDD_BonusDoTMode_2)") {
    return 0;
  }

  if(archetype === "Blaster") {
    modifiedDamage += powerTemplates.scale * ArchetypeModifiers.Ranged_Damage_Blaster;

    if(duration > 0) {
      let tickDamage = powerTemplates.tick_chance * powerTemplates.scale * ArchetypeModifiers.Ranged_Damage_Blaster
      let ticks = Math.ceil(duration / application_period) * powerTemplates.tick_chance
      powerDamage += powerEffects.chance * (ticks * tickDamage);
    } else {
      powerDamage += powerEffects.chance * modifiedDamage;
    }
  }
  if(archetype === "Brute") {
    modifiedDamage += powerTemplates.scale * ArchetypeModifiers.Ranged_Damage_Brute;

    if(duration > 0) {
      let tickDamage = powerTemplates.tick_chance * powerTemplates.scale * ArchetypeModifiers.Ranged_Damage_Brute
      let ticks = Math.ceil(duration / application_period) * powerTemplates.tick_chance
      powerDamage += powerEffects.chance * (ticks * tickDamage);
    } else {
      powerDamage += powerEffects.chance * modifiedDamage;
    }
  }
  if(archetype === "Sentinel") {
    modifiedDamage += powerTemplates.scale * ArchetypeModifiers.Ranged_Damage_Sentinel;

    if(duration > 0) {
      let tickDamage = powerTemplates.tick_chance * powerTemplates.scale * ArchetypeModifiers.Ranged_Damage_Sentinel
      let ticks = Math.ceil(duration / application_period) * powerTemplates.tick_chance
      powerDamage += powerEffects.chance * (ticks * tickDamage);
    } else {
      powerDamage += powerEffects.chance * modifiedDamage;
    }
  }
  if(archetype === "Scrapper") {
    if (
      critDamage &&
      !ScrappersStrikeCritBonus &&
      powerEffects.tags.includes('CritSmall')
    ) {
      if(powerIsInCritStrikesWindow) {
        modifiedDamage += (powerEffects.chance + CRIT_STRIKES_WINDOW_BONUS)  * powerEffects.templates[0].scale * ArchetypeModifiers.Ranged_Damage_Scrapper
      } else {
        modifiedDamage += powerEffects.chance * powerEffects.templates[0].scale * ArchetypeModifiers.Ranged_Damage_Scrapper
      }
    } else if (
      critDamage &&
      ScrappersStrikeCritBonus &&
      powerEffects.tags.includes('CritSmall')
    ) {
      if(powerIsInCritStrikesWindow) {
        modifiedDamage += (powerEffects.chance + SCRAPPERS_STRIKE_CRIT_BONUS + CRIT_STRIKES_WINDOW_BONUS)  * powerEffects.templates[0].scale * ArchetypeModifiers.Ranged_Damage_Scrapper
      } else {
        modifiedDamage += (powerEffects.chance + SCRAPPERS_STRIKE_CRIT_BONUS) * powerEffects.templates[0].scale * ArchetypeModifiers.Ranged_Damage_Scrapper
      }
    } else if (
      critDamage &&
      !ScrappersStrikeCritBonus &&
      powerEffects.tags.includes('CritLarge') &&
      powerEffects.chance !== 0.1
    ) {
      if(powerIsInCritStrikesWindow) {
        modifiedDamage += (powerEffects.chance + CRIT_STRIKES_WINDOW_BONUS)  * powerEffects.templates[0].scale * ArchetypeModifiers.Ranged_Damage_Scrapper
      } else {
        modifiedDamage += powerEffects.chance * powerEffects.templates[0].scale * ArchetypeModifiers.Ranged_Damage_Scrapper
      }
    } else if (
      critDamage &&
      ScrappersStrikeCritBonus &&
      powerEffects.tags.includes('CritLarge') &&
      powerEffects.chance !== 0.1
    ) {
      if(powerIsInCritStrikesWindow) {
        modifiedDamage += (powerEffects.chance + SCRAPPERS_STRIKE_CRIT_BONUS + CRIT_STRIKES_WINDOW_BONUS)  * powerEffects.templates[0].scale * ArchetypeModifiers.Ranged_Damage_Scrapper
      } else {
        modifiedDamage += (powerEffects.chance + SCRAPPERS_STRIKE_CRIT_BONUS) * powerEffects.templates[0].scale * ArchetypeModifiers.Ranged_Damage_Scrapper
      }
    } else if(!powerEffects.tags.includes('CritLarge') && !powerEffects.tags.includes('CritSmall')) {
      modifiedDamage += powerEffects.chance * powerTemplates.scale * ArchetypeModifiers.Ranged_Damage_Scrapper
    }

    if(duration > 0) {
      let tickDamage = powerTemplates.tick_chance * powerTemplates.scale * ArchetypeModifiers.Ranged_Damage_Scrapper
      let ticks = Math.ceil(duration / application_period) * powerTemplates.tick_chance
      powerDamage += powerEffects.chance * (ticks * tickDamage);
    } else {
      powerDamage += modifiedDamage;
    }
  }
  if(archetype === "Stalker") {
    let critChance = 0;
    if(powerEffects.child_effects.length !== 0) {
      critChance = powerEffects.child_effects[1].chance;
    } else {
      critChance = 0.03;
    }

    modifiedDamage += (powerTemplates.scale * ArchetypeModifiers.Ranged_Damage_Stalker) * (1 + critChance + (0.03 * (numberOfTeammates) + 0.03));

    if(duration > 0) {
      let tickDamage = powerTemplates.tick_chance * powerTemplates.scale * ArchetypeModifiers.Ranged_Damage_Stalker
      let ticks = Math.ceil(duration / application_period) * powerTemplates.tick_chance
      powerDamage += powerEffects.chance * (ticks * tickDamage);
    } else {
      powerDamage += powerEffects.chance * modifiedDamage;
    }

    if(stealthCritDamage) {
      if(isAoE) {
        powerDamage += powerDamage * 0.5;
      } else {
        powerDamage += powerDamage;
      }
    }
  }
  if(archetype === "Tanker") {
    modifiedDamage += powerTemplates.scale * ArchetypeModifiers.Ranged_Damage_Tanker;

    if(duration > 0) {
      let tickDamage = powerTemplates.tick_chance * powerTemplates.scale * ArchetypeModifiers.Ranged_Damage_Tanker
      let ticks = Math.ceil(duration / application_period) * powerTemplates.tick_chance
      powerDamage += powerEffects.chance * (ticks * tickDamage);
    } else {
      powerDamage += powerEffects.chance * modifiedDamage;
    }
  }

  return powerDamage;
}

export default function getTotalPowerDamage({
  power, 
  archetype, 
  comboLevel, 
  displayScrappersStrikeATO, 
  displayScrapperCriticalDamage,
  powerIsInCritStrikesWindow,
  critStrikesChance,
  targetsHit,
  displayStealthCrit,
  numberOfTeammates,
  assassinsFocusStacks,
  isAoE
}: any) {
  let powerDamage = 0;
  let CRIT_STRIKES_WINDOW_BONUS = CRIT_STRIKES_BONUS * critStrikesChance;

  for(var i = 0; i < power.effects.length; i++) {
    if(power.effects[i].is_pvp !== "PVP_ONLY") {
      /* Standard power shapes */
      for(var j = 0; j < power.effects[i].templates.length; j++) {
        if (
          power.effects[i].templates[j].table === "Ranged_Damage"
        ) {
          /* Implement Beam Rifle Disintegration */
          if(power.effects[i].requires_expression.includes('Beam_Rifle_Debuff')) {
            continue;
          }
          /* Implement Dual Pistols Swap Ammo */
          if(power.effects[i].chance === 0) {
            continue;
          }
          /* Implement ??? */
          if(power.effects[i].tags.includes('FireDamageDoT')) {
            continue;
          }

          powerDamage += getModifiedRangedDamage({
            powerEffects: power.effects[i],
            powerTemplates: power.effects[i].templates[j],
            archetype: archetype,
            ScrappersStrikeCritBonus: displayScrappersStrikeATO,
            critDamage: displayScrapperCriticalDamage,
            powerIsInCritStrikesWindow: powerIsInCritStrikesWindow,
            critStrikesChance: critStrikesChance,
            stealthCritDamage: displayStealthCrit,
            numberOfTeammates: numberOfTeammates,
            isAoE: isAoE
          });
        } else if (power.effects[i].templates[j].table === "Melee_Damage") {
          /* Handle weird object shapes later */
          if (
            power.effects[i].requires_expression.includes('Psionic_Melee_Insight') ||
            power.effects[i].requires_expression.includes('Perfection') ||
            (archetype === "Scrapper" && power.full_name.split('.')[1] === "Battle_Axe") ||
            (archetype === "Scrapper" && power.full_name.split('.')[1] === "Energy_Melee") ||
            (archetype === "Scrapper" && power.full_name.split('.')[1] === "Fiery_Melee") ||
            (archetype === "Stalker" && power.full_name.split('.')[1] === "Fiery_Melee") ||
            (archetype === "Scrapper" && power.full_name.split('.')[1] === "Stone_Melee") ||
            power.name === "Whirling_Axe" ||
            power.name === "Thunder_Strike" ||
            power.full_name.split('.')[1] === "Brawling" ||
            power.full_name.split('.')[2].includes("Assassins")
          ) {
            continue;
          }

          powerDamage += getModifiedMeleeDamage({
            powerEffects: power.effects[i],
            powerTemplates: power.effects[i].templates[j],
            archetype: archetype,
            ScrappersStrikeCritBonus: displayScrappersStrikeATO,
            critDamage: displayScrapperCriticalDamage,
            stealthCritDamage: displayStealthCrit,
            powerIsInCritStrikesWindow: powerIsInCritStrikesWindow,
            critStrikesChance: critStrikesChance,
            numberOfTeammates: numberOfTeammates,
            isAoE: isAoE
          });
        } else {
          continue;
        }
      }
      /* weird object shapes */
      if(power.name === "Whirling_Axe") {
        if(archetype === "Brute") {
          if(power.effects[i].child_effects[0].templates[0].table === "Melee_Damage") {
            powerDamage += power.effects[i].child_effects[0].templates[0].scale * ArchetypeModifiers.Melee_Damage_Brute;
          }
        } else if (archetype === "Scrapper") {
          for(var k = 0; k < power.effects[i].child_effects[0].child_effects.length; k++) {
            if (
              !powerIsInCritStrikesWindow &&
              displayScrapperCriticalDamage &&
              !displayScrappersStrikeATO &&
              power.effects[i].child_effects[0].child_effects[k].tags.includes('CritSmall')
            ) {
              powerDamage += power.effects[i].child_effects[0].child_effects[k].chance * power.effects[i].child_effects[0].child_effects[k].templates[0].scale * ArchetypeModifiers.Melee_Damage_Scrapper
            } else if (
              !powerIsInCritStrikesWindow &&
              displayScrapperCriticalDamage &&
              displayScrappersStrikeATO &&
              power.effects[i].child_effects[0].child_effects[k].tags.includes('CritSmall')
            ) {
              powerDamage += (power.effects[i].child_effects[0].child_effects[k].chance + SCRAPPERS_STRIKE_CRIT_BONUS) * power.effects[i].child_effects[0].child_effects[k].templates[0].scale * ArchetypeModifiers.Melee_Damage_Scrapper
            } else if (
              powerIsInCritStrikesWindow &&
              displayScrapperCriticalDamage &&
              !displayScrappersStrikeATO &&
              power.effects[i].child_effects[0].child_effects[k].tags.includes('CritSmall')
            ) {
              powerDamage += (power.effects[i].child_effects[0].child_effects[k].chance + CRIT_STRIKES_WINDOW_BONUS) * power.effects[i].child_effects[0].child_effects[k].templates[0].scale * ArchetypeModifiers.Melee_Damage_Scrapper
            } else if (
              powerIsInCritStrikesWindow &&
              displayScrapperCriticalDamage &&
              displayScrappersStrikeATO &&
              power.effects[i].child_effects[0].child_effects[k].tags.includes('CritSmall')
            ) {
              powerDamage += (power.effects[i].child_effects[0].child_effects[k].chance + CRIT_STRIKES_WINDOW_BONUS + SCRAPPERS_STRIKE_CRIT_BONUS) * power.effects[i].child_effects[0].child_effects[k].templates[0].scale * ArchetypeModifiers.Melee_Damage_Scrapper
            }
          }
          powerDamage += power.effects[i].chance * power.effects[i].templates[1].scale * ArchetypeModifiers.Melee_Damage_Scrapper
        }
      }
      if(power.name === "Thunder_Strike" && archetype === "Brute") {
        if(power.effects[i].child_effects[0].templates[0].table === "Melee_Damage") {
          powerDamage += power.effects[i].child_effects[0].templates[0].scale * ArchetypeModifiers.Melee_Damage_Brute
        }
      }
      if(power.name === "Thunder_Strike" && archetype === "Scrapper") {
        if(power.effects[i].child_effects[0].templates[0].table === "Melee_Damage") {
          for(let k = 0; k < power.effects[0].child_effects[0].child_effects.length; k++) {
            if (
              !powerIsInCritStrikesWindow &&
              displayScrapperCriticalDamage &&
              !displayScrappersStrikeATO &&
              power.effects[0].child_effects[0].child_effects[k].tags.includes('CritSmall')
            ) {
              powerDamage += power.effects[0].child_effects[0].child_effects[k].chance * power.effects[0].child_effects[0].child_effects[k].templates[0].scale * ArchetypeModifiers.Melee_Damage_Scrapper
            } else if (
              !powerIsInCritStrikesWindow &&
              displayScrapperCriticalDamage &&
              displayScrappersStrikeATO &&
              power.effects[0].child_effects[0].child_effects[k].tags.includes('CritSmall')
            ) {
              powerDamage += (power.effects[0].child_effects[0].child_effects[k].chance + SCRAPPERS_STRIKE_CRIT_BONUS) * power.effects[0].child_effects[0].child_effects[k].templates[0].scale * ArchetypeModifiers.Melee_Damage_Scrapper
            } else if (
              powerIsInCritStrikesWindow &&
              displayScrapperCriticalDamage &&
              displayScrappersStrikeATO &&
              power.effects[0].child_effects[0].child_effects[k].tags.includes('CritSmall')
            ) {
              powerDamage += (power.effects[0].child_effects[0].child_effects[k].chance + CRIT_STRIKES_WINDOW_BONUS + SCRAPPERS_STRIKE_CRIT_BONUS) * power.effects[0].child_effects[0].child_effects[k].templates[0].scale * ArchetypeModifiers.Melee_Damage_Scrapper
            } else if (
              powerIsInCritStrikesWindow &&
              displayScrapperCriticalDamage &&
              displayScrappersStrikeATO &&
              power.effects[0].child_effects[0].child_effects[k].tags.includes('CritSmall')
            ) {
              powerDamage += (power.effects[0].child_effects[0].child_effects[k].chance + CRIT_STRIKES_WINDOW_BONUS) * power.effects[0].child_effects[0].child_effects[k].templates[0].scale * ArchetypeModifiers.Melee_Damage_Scrapper
            }
          }

          powerDamage += power.effects[0].child_effects[0].chance * power.effects[0].child_effects[0].templates[0].scale * ArchetypeModifiers.Melee_Damage_Scrapper
        }
      }
      if(archetype === "Scrapper" && power.full_name.split('.')[1] === "Battle_Axe" && power.name !== "Whirling_Axe") {
        for(let k = 0; k < power.effects[i].child_effects.length; k++) {
          if (
            !powerIsInCritStrikesWindow &&
            displayScrapperCriticalDamage &&
            !displayScrappersStrikeATO &&
            power.effects[i].child_effects[k].tags.includes('CritLarge')
          ) {
            powerDamage += power.effects[i].child_effects[k].chance * power.effects[i].child_effects[k].templates[0].scale * ArchetypeModifiers.Melee_Damage_Scrapper
          } else if (
            !powerIsInCritStrikesWindow &&
            displayScrapperCriticalDamage &&
            displayScrappersStrikeATO &&
            power.effects[i].child_effects[k].tags.includes('CritLarge')
          ) {
            powerDamage += (power.effects[i].child_effects[k].chance + SCRAPPERS_STRIKE_CRIT_BONUS) * power.effects[i].child_effects[k].templates[0].scale * ArchetypeModifiers.Melee_Damage_Scrapper
          } else if (
            powerIsInCritStrikesWindow &&
            displayScrapperCriticalDamage &&
            !displayScrappersStrikeATO &&
            power.effects[i].child_effects[k].tags.includes('CritLarge')
          ) {
            powerDamage += (power.effects[i].child_effects[k].chance + CRIT_STRIKES_WINDOW_BONUS) * power.effects[i].child_effects[k].templates[0].scale * ArchetypeModifiers.Melee_Damage_Scrapper
          } else if (
            powerIsInCritStrikesWindow &&
            displayScrapperCriticalDamage &&
            displayScrappersStrikeATO &&
            power.effects[i].child_effects[k].tags.includes('CritLarge')
          ) {
            powerDamage += (power.effects[i].child_effects[k].chance + CRIT_STRIKES_WINDOW_BONUS + SCRAPPERS_STRIKE_CRIT_BONUS) * power.effects[i].child_effects[k].templates[0].scale * ArchetypeModifiers.Melee_Damage_Scrapper
          }
        }
        powerDamage += power.effects[i].chance * power.effects[i].templates[0].scale * ArchetypeModifiers.Melee_Damage_Scrapper
      }
      if(power.full_name.split('.')[1] === "Brawling") {
        if(power.name === 'Combat_Readiness' || i !== 0) {
          powerDamage += 0;
          continue;
        }
        if (power.name === "Crushing_Uppercut" || power.name === "Spinning_Strike") {
          let duration;
          let application_period;

          if(archetype === "Brute") {
            duration = Number(power.effects[0].child_effects[0].templates[0].duration.split(' ')[0]);
            application_period = power.effects[i].child_effects[0].templates[0].application_period;

            if(duration > 0) {
              powerDamage += power.effects[0].child_effects[comboLevel].templates[0].scale * ArchetypeModifiers.Melee_Damage_Brute * Math.ceil(duration / application_period);
            } else {
              powerDamage += power.effects[0].child_effects[comboLevel].templates[0].scale * ArchetypeModifiers.Melee_Damage_Brute
            }
          }
          if(archetype === "Scrapper") {
            if(power.name === "Crushing_Uppercut") {
              duration = Number(power.effects[0].child_effects[0].templates[0].duration.split(' ')[0]);
              application_period = power.effects[0].child_effects[0].templates[0].application_period;

              for(let k = 0; k < power.effects[0].child_effects.length; k++) {
                if (
                  displayScrapperCriticalDamage &&
                  !displayScrappersStrikeATO &&
                  power.effects[0].child_effects[k].tags.includes('CritLarge')
                ) {
                  powerDamage += power.effects[0].child_effects[k].chance * power.effects[0].child_effects[k].templates[0].scale * ArchetypeModifiers.Melee_Damage_Scrapper
                } else if (
                  displayScrapperCriticalDamage &&
                  displayScrappersStrikeATO &&
                  power.effects[0].child_effects[k].tags.includes('CritLarge')
                ) {
                  powerDamage += (power.effects[0].child_effects[k].chance + SCRAPPERS_STRIKE_CRIT_BONUS) * power.effects[0].child_effects[k].templates[0].scale * ArchetypeModifiers.Melee_Damage_Scrapper
                }
              }

              powerDamage += power.effects[0].child_effects[comboLevel].chance * power.effects[0].child_effects[comboLevel].templates[0].scale * ArchetypeModifiers.Melee_Damage_Scrapper;

              if(duration > 0) {
                powerDamage *= Math.ceil(duration / application_period);
              }
            } else {
              duration = Number(power.effects[0].child_effects[0].child_effects[0].templates[0].duration.split(' ')[0]);
              application_period = power.effects[0].child_effects[0].child_effects[0].templates[0].application_period;

              for(let k = 0; k < power.effects[0].child_effects.length; k++) {
                if (
                  displayScrapperCriticalDamage &&
                  !displayScrappersStrikeATO &&
                  power.effects[0].child_effects[k].tags.includes('CritSmall')
                ) {
                  powerDamage += power.effects[0].child_effects[k].chance * power.effects[0].child_effects[k].templates[0].scale * ArchetypeModifiers.Melee_Damage_Scrapper
                } else if (
                  displayScrapperCriticalDamage &&
                  displayScrappersStrikeATO &&
                  power.effects[0].child_effects[k].tags.includes('CritSmall')
                ) {
                  powerDamage += (power.effects[0].child_effects[k].chance + SCRAPPERS_STRIKE_CRIT_BONUS) * power.effects[0].child_effects[k].templates[0].scale * ArchetypeModifiers.Melee_Damage_Scrapper
                }
              }

              powerDamage += power.effects[0].child_effects[comboLevel].chance * power.effects[0].child_effects[comboLevel].child_effects[0].templates[0].scale * ArchetypeModifiers.Melee_Damage_Scrapper;

              if(duration > 0) {
                powerDamage *= Math.ceil(duration / application_period);
              }
            }
          }
          if(archetype === "Stalker") {
            if(power.name === "Crushing_Uppercut") {
              powerDamage += power.effects[1].child_effects[comboLevel].templates[0].scale * ArchetypeModifiers.Melee_Damage_Stalker;
              powerDamage *= (1 + power.effects[1].child_effects[5].chance + (0.03 * (numberOfTeammates) + 0.03))
              if(displayStealthCrit) {
                powerDamage *= 2;
              }
            } else {
              if(comboLevel == 3) {
                duration = Number(power.effects[1].child_effects[comboLevel].child_effects[2].templates[0].duration.split(' ')[0]);
                application_period = power.effects[1].child_effects[comboLevel].child_effects[2].templates[0].application_period;
                powerDamage += power.effects[1].child_effects[comboLevel].child_effects[2].templates[0].scale * ArchetypeModifiers.Melee_Damage_Stalker
              } else {
                duration = Number(power.effects[1].child_effects[comboLevel].child_effects[1].templates[0].duration.split(' ')[0]);
                application_period = power.effects[1].child_effects[comboLevel].child_effects[1].templates[0].application_period;
                powerDamage += power.effects[1].child_effects[comboLevel].child_effects[1].templates[0].scale * ArchetypeModifiers.Melee_Damage_Stalker
              }

              if(duration > 0) {
                powerDamage *= Math.ceil(duration / application_period);
              }
              if(displayStealthCrit) {
                powerDamage *= 1.5;
              }
              powerDamage *= (1 + power.effects[1].child_effects[5].chance + (0.03 * (numberOfTeammates) + 0.03))
            }
          }
          if(archetype === "Tanker") {
            powerDamage += power.effects[0].child_effects[comboLevel].templates[0].scale * ArchetypeModifiers.Melee_Damage_Tanker
          }
        } else if (power.name === "Sweeping_Cross") {
          if(archetype === "Brute") {
            powerDamage += power.effects[0].child_effects[comboLevel].child_effects[0].templates[0].scale * ArchetypeModifiers.Melee_Damage_Brute
          }
          if(archetype === "Scrapper") {
            for(let k = 0; k < power.effects[0].child_effects.length; k++) {
              if (
                displayScrapperCriticalDamage &&
                !displayScrappersStrikeATO &&
                power.effects[0].child_effects[k].tags.includes('CritLarge')
              ) {
                powerDamage += power.effects[0].child_effects[k].chance * power.effects[0].child_effects[k].templates[0].scale * ArchetypeModifiers.Melee_Damage_Scrapper
              } else if (
                displayScrapperCriticalDamage &&
                displayScrappersStrikeATO &&
                power.effects[0].child_effects[k].tags.includes('CritLarge')
              ) {
                powerDamage += (power.effects[0].child_effects[k].chance + SCRAPPERS_STRIKE_CRIT_BONUS) * power.effects[0].child_effects[k].templates[0].scale * ArchetypeModifiers.Melee_Damage_Scrapper
              }
              else if (
                displayScrapperCriticalDamage &&
                !displayScrappersStrikeATO &&
                power.effects[0].child_effects[k].tags.includes('CritLarge') &&
                powerIsInCritStrikesWindow
              ) {
                powerDamage += (power.effects[0].child_effects[k].chance + CRIT_STRIKES_BONUS) * power.effects[0].child_effects[k].templates[0].scale * ArchetypeModifiers.Melee_Damage_Scrapper
              }
              else if (
                displayScrapperCriticalDamage &&
                displayScrappersStrikeATO &&
                power.effects[0].child_effects[k].tags.includes('CritLarge') &&
                powerIsInCritStrikesWindow
              ) {
                powerDamage += (power.effects[0].child_effects[k].chance + SCRAPPERS_STRIKE_CRIT_BONUS + CRIT_STRIKES_BONUS) * power.effects[0].child_effects[k].templates[0].scale * ArchetypeModifiers.Melee_Damage_Scrapper
              }
            }

            powerDamage +=  power.effects[0].child_effects[comboLevel].child_effects[0].templates[0].scale * ArchetypeModifiers.Melee_Damage_Scrapper;
          }
          if(archetype === "Stalker") {
            if(comboLevel == 3) {
              powerDamage += power.effects[1].child_effects[comboLevel].child_effects[2].templates[0].scale * ArchetypeModifiers.Melee_Damage_Stalker;
              powerDamage *= (1 + power.effects[1].child_effects[5].chance + (0.03 * (numberOfTeammates) + 0.03))
            } else {
              powerDamage += power.effects[1].child_effects[comboLevel].child_effects[1].templates[0].scale * ArchetypeModifiers.Melee_Damage_Stalker;
              powerDamage *= (1 + power.effects[1].child_effects[5].chance + (0.03 * (numberOfTeammates) + 0.03))
            }
            if(displayStealthCrit) {
              powerDamage *= 2;
            }
          }
          if(archetype === "Tanker") {
            powerDamage += power.effects[0].child_effects[comboLevel].child_effects[0].templates[0].scale * ArchetypeModifiers.Melee_Damage_Tanker
          }
        } else {
          let duration;
          let application_period;
          if(archetype === "Brute") {
            duration = Number(power.effects[0].child_effects[0].templates[0].duration.split(' ')[0]);
            application_period = power.effects[0].child_effects[0].templates[0].application_period;
            if(duration > 0) {
              powerDamage += power.effects[0].child_effects[0].templates[0].scale * ArchetypeModifiers.Melee_Damage_Brute * Math.ceil(duration / application_period)
            } else {
              powerDamage += power.effects[0].child_effects[0].templates[0].scale * ArchetypeModifiers.Melee_Damage_Brute
            }
          } else if(archetype === "Scrapper") {
        
            for(let k = 0; k < power.effects[0].child_effects.length; k++) {
              if (
                displayScrapperCriticalDamage &&
                !displayScrappersStrikeATO &&
                power.effects[0].child_effects[k].tags.includes('CritLarge')
              ) {
                powerDamage += power.effects[0].child_effects[k].chance * power.effects[0].child_effects[k].templates[0].scale * ArchetypeModifiers.Melee_Damage_Scrapper
              } else if (
                displayScrapperCriticalDamage &&
                displayScrappersStrikeATO &&
                power.effects[0].child_effects[k].tags.includes('CritLarge')
              ) {
                powerDamage += (power.effects[0].child_effects[k].chance + SCRAPPERS_STRIKE_CRIT_BONUS) * power.effects[0].child_effects[k].templates[0].scale * ArchetypeModifiers.Melee_Damage_Scrapper
              }
            }
            
            if(duration && duration > 0) {
              powerDamage += power.effects[0].child_effects[0].templates[0].scale * ArchetypeModifiers.Melee_Damage_Scrapper * Math.ceil(duration / application_period)
            } else {
              powerDamage += power.effects[0].child_effects[0].templates[0].scale * ArchetypeModifiers.Melee_Damage_Scrapper
            }
          } else if(archetype === "Stalker") {
            powerDamage += power.effects[0].child_effects[0].templates[0].scale * ArchetypeModifiers.Melee_Damage_Stalker;
            powerDamage *= (1 + power.effects[0].child_effects[1].chance + (0.03 * (numberOfTeammates) + 0.03))
            
            if(displayStealthCrit) {
              powerDamage *= 2;
            }
          }
        }
      }
      if((power.full_name.split('.')[1] === "Energy_Melee" || power.full_name.split('.')[1] === "Stone_Melee") && archetype === "Scrapper") {
        // Base Damage
        for (let k = 0; k < power.effects[i].templates.length; k++) {
          let duration = Number(power.effects[i].templates[k].duration.split(' ')[0]);
          let application_period = power.effects[i].templates[k].application_period;

          if (power.effects[i].templates[k].table === "Melee_Damage") {
            if(duration > 0) {
              powerDamage += power.effects[i].chance * power.effects[i].templates[k].scale * ArchetypeModifiers.Melee_Damage_Scrapper * Math.ceil(duration / application_period)
            } else {
              powerDamage += power.effects[i].chance * power.effects[i].templates[k].scale * ArchetypeModifiers.Melee_Damage_Scrapper
            }
          }
        }
        // Crit Damage
        for(let k = 0; k < power.effects[i].child_effects.length; k++) {
          if (power.effects[i].child_effects[k].is_pvp !== "PVP_ONLY") {
            if (
              power.effects[i].child_effects[k].tags.includes('CritLarge') &&
              displayScrapperCriticalDamage &&
              !displayScrappersStrikeATO
            ) {
              powerDamage += power.effects[i].child_effects[k].chance * power.effects[i].child_effects[k].templates[0].scale * ArchetypeModifiers.Melee_Damage_Scrapper
            } if (
              power.effects[i].child_effects[k].tags.includes('CritLarge') &&
              displayScrapperCriticalDamage &&
              displayScrappersStrikeATO
            ) {
              powerDamage += (power.effects[i].child_effects[k].chance + SCRAPPERS_STRIKE_CRIT_BONUS) * power.effects[i].child_effects[k].templates[0].scale * ArchetypeModifiers.Melee_Damage_Scrapper
            }
          }
          // Energy Transfer Crit
          if (
            power.effects[i].child_effects[k].child_effects.length > 1 &&
            displayScrapperCriticalDamage &&
            !displayScrappersStrikeATO
          ) {
            powerDamage += power.effects[0].child_effects[1].child_effects[0].chance * power.effects[0].child_effects[1].child_effects[0].templates[1].scale * ArchetypeModifiers.Melee_Damage_Scrapper
          } else if (
            power.effects[i].child_effects[k].child_effects.length > 1 &&
            displayScrapperCriticalDamage &&
            displayScrappersStrikeATO
          ) {
            powerDamage += (power.effects[0].child_effects[1].child_effects[0].chance + SCRAPPERS_STRIKE_CRIT_BONUS) * power.effects[0].child_effects[1].child_effects[0].templates[1].scale * ArchetypeModifiers.Melee_Damage_Scrapper
          }
        }
      }
      if(power.full_name.split('.')[1] === "Fiery_Melee") {
        if(archetype === "Scrapper") {
          for (let k = 0; k < power.effects[i].templates.length; k++) {
            let duration = Number(power.effects[i].templates[k].duration.split(' ')[0]);
            let application_period = power.effects[i].templates[k].application_period;

            if (power.effects[i].templates[k].table === "Melee_Damage") {
              if(duration > 0 && (power.effects[i].templates[k].flags.includes('CancelOnMiss (2)') || power.name === "Incinerate")) {
                let tickDamage = power.effects[i].templates[k].tick_chance * (power.effects[i].templates[k].scale * ArchetypeModifiers.Melee_Damage_Scrapper);
                let ticks = Math.ceil(duration / application_period) * power.effects[i].templates[k].tick_chance;
                powerDamage += ticks * tickDamage;
              } else {
                powerDamage += power.effects[i].chance * power.effects[i].templates[k].scale * ArchetypeModifiers.Melee_Damage_Scrapper;
              }

              if(power.effects[i].tags.includes("CritLarge")) {
                if (
                  !powerIsInCritStrikesWindow &&
                  displayScrapperCriticalDamage &&
                  !displayScrappersStrikeATO
                ) {
                  powerDamage += power.effects[i].chance * power.effects[i].templates[0].scale * ArchetypeModifiers.Melee_Damage_Scrapper
                } else if (
                  !powerIsInCritStrikesWindow &&
                  displayScrapperCriticalDamage &&
                  displayScrappersStrikeATO
                ) {
                  powerDamage += (power.effects[i].chance + SCRAPPERS_STRIKE_CRIT_BONUS) * power.effects[i].templates[0].scale * ArchetypeModifiers.Melee_Damage_Scrapper
                } else if (
                  powerIsInCritStrikesWindow &&
                  displayScrapperCriticalDamage &&
                  !displayScrappersStrikeATO
                ) {
                  powerDamage += (power.effects[i].chance + CRIT_STRIKES_WINDOW_BONUS) * power.effects[i].templates[0].scale * ArchetypeModifiers.Melee_Damage_Scrapper
                } else if (
                  powerIsInCritStrikesWindow &&
                  displayScrapperCriticalDamage &&
                  displayScrappersStrikeATO
                ) {
                  powerDamage += (power.effects[i].chance + CRIT_STRIKES_WINDOW_BONUS + SCRAPPERS_STRIKE_CRIT_BONUS) * power.effects[i].templates[0].scale * ArchetypeModifiers.Melee_Damage_Scrapper
                }
              }
            }
          }
        } else if(archetype === "Stalker") {
          for (let k = 0; k < power.effects[i].templates.length; k++) {
            let duration = Number(power.effects[i].templates[k].duration.split(' ')[0]);
            let application_period = power.effects[i].templates[k].application_period;

            if (power.effects[i].templates[k].table === "Melee_Damage") {
              if(duration > 0 && (power.effects[i].templates[k].flags.includes('CancelOnMiss (2)') || power.name === "Incinerate")) {
                let tickDamage = power.effects[i].templates[k].tick_chance * (power.effects[i].templates[k].scale * ArchetypeModifiers.Melee_Damage_Stalker);
                let ticks = Math.ceil(duration / application_period) * power.effects[i].templates[k].tick_chance;
                powerDamage += ticks * tickDamage;
              } else {
                powerDamage += power.effects[i].chance * power.effects[i].templates[k].scale * ArchetypeModifiers.Melee_Damage_Stalker
                powerDamage *= (1 + power.effects[0].child_effects[1].chance + (0.03 * (numberOfTeammates) + 0.03))
                if(displayStealthCrit) {
                  powerDamage *= 2;
                }
              }
            }
          }
        }
      }
    }
  }

  /* Epic power crit damage */
  if(power.full_name.split('.')[0].includes("Epic")) {
    for(let i = 0; i < power.effects.length; i++) {
      if(power.effects[i].is_pvp !== "PVP_ONLY") {
        if(power.effects[i].tags.includes("ScrapperOnly") && archetype === "Scrapper") {
          if(power.effects[i].child_effects[1].templates[0].table.includes("Melee_Damage")) {
            if (
              displayScrapperCriticalDamage &&
              !displayScrappersStrikeATO
            ) {
              if(powerIsInCritStrikesWindow) {
                powerDamage += (power.effects[i].child_effects[1].chance + CRIT_STRIKES_WINDOW_BONUS) * power.effects[i].child_effects[1].templates[0].scale * ArchetypeModifiers.Melee_Damage_Scrapper;
              } else {
                powerDamage += power.effects[i].child_effects[1].chance * power.effects[i].child_effects[1].templates[0].scale * ArchetypeModifiers.Melee_Damage_Scrapper;
              }
            } else if (
              displayScrapperCriticalDamage &&
              displayScrappersStrikeATO
            ) {
              if(powerIsInCritStrikesWindow) {
                powerDamage += (power.effects[i].child_effects[1].chance + SCRAPPERS_STRIKE_CRIT_BONUS + CRIT_STRIKES_WINDOW_BONUS) * power.effects[i].child_effects[1].templates[0].scale * ArchetypeModifiers.Melee_Damage_Scrapper;
              } else {
                powerDamage += (power.effects[i].child_effects[1].chance + SCRAPPERS_STRIKE_CRIT_BONUS) * power.effects[i].child_effects[1].templates[0].scale * ArchetypeModifiers.Melee_Damage_Scrapper;
              }
            }
          } else if (power.effects[i].child_effects[1].templates[0].table.includes("Ranged_Damage")) {
            if (
              displayScrapperCriticalDamage &&
              !displayScrappersStrikeATO
            ) {
              if(powerIsInCritStrikesWindow) {
                powerDamage += (power.effects[i].child_effects[1].chance + CRIT_STRIKES_WINDOW_BONUS) * power.effects[i].child_effects[1].templates[0].scale * ArchetypeModifiers.Ranged_Damage_Scrapper;
              } else {
                powerDamage += power.effects[i].child_effects[1].chance * power.effects[i].child_effects[1].templates[0].scale * ArchetypeModifiers.Ranged_Damage_Scrapper;
              }
            } else if (
              displayScrapperCriticalDamage &&
              displayScrappersStrikeATO
            ) {
              if(powerIsInCritStrikesWindow) {
                powerDamage += (power.effects[i].child_effects[1].chance + SCRAPPERS_STRIKE_CRIT_BONUS + CRIT_STRIKES_WINDOW_BONUS) * power.effects[i].child_effects[1].templates[0].scale * ArchetypeModifiers.Ranged_Damage_Scrapper;
              } else {
                powerDamage += power.effects[i].child_effects[1].chance * power.effects[i].child_effects[1].templates[0].scale * ArchetypeModifiers.Ranged_Damage_Scrapper;
              }
            }
          }
        } else if (power.effects[i].tags.includes("StalkerOnly") && archetype === "Stalker") {

        }
      }
    }
  }
  /* Assassin's Strike */
  if(power.full_name.split('.')[2].includes("Assassins")) {
    for(let i = 0; i < power.effects.length; i++) {
      if(power.effects[i].is_pvp !== "PVP_ONLY") {
        for(let j = 0; j < power.effects[i].templates.length; j++) {
          if(power.effects[i].templates[j].table.includes("Melee_Damage")) {
            powerDamage += power.effects[i].templates[j].scale * ArchetypeModifiers.Melee_Damage_Stalker;
          }
        }
      }
    }

    if(power.full_name.split('.')[2].includes("Quick")) {
      let teammateCritBonus = (power.effects[0].child_effects[0].chance + (0.03 * (numberOfTeammates) + 0.03));
      let focusCritBonus = assassinsFocusStacks * 0.3;
      let totalCritChance = Math.min(1, (teammateCritBonus + focusCritBonus));
      powerDamage *= 1 + totalCritChance;
    }
  }
  /* Martial Arts Crits */
  if(power.full_name.split('.')[1] === "Martial_Arts" && archetype === "Scrapper") {
    let critDamage = 0;
    if (
      displayScrapperCriticalDamage &&
      !displayScrappersStrikeATO &&
      power.effects[0].child_effects[0].tags.includes('CritLarge')
    ) {
      critDamage += power.effects[0].child_effects[0].chance * power.effects[0].child_effects[0].templates[0].scale * ArchetypeModifiers.Melee_Damage_Scrapper;
    } else if (
      displayScrapperCriticalDamage &&
      displayScrappersStrikeATO &&
      power.effects[0].child_effects[0].tags.includes('CritLarge')
    ) {
      critDamage += (power.effects[0].child_effects[0].chance + SCRAPPERS_STRIKE_CRIT_BONUS) * power.effects[0].child_effects[0].templates[0].scale * ArchetypeModifiers.Melee_Damage_Scrapper
    }
    else if (
      displayScrapperCriticalDamage &&
      !displayScrappersStrikeATO &&
      power.effects[0].child_effects[0].tags.includes('CritLarge') &&
      powerIsInCritStrikesWindow
    ) {
      critDamage += (power.effects[0].child_effects[0].chance + CRIT_STRIKES_BONUS) * power.effects[0].child_effects[0].templates[0].scale * ArchetypeModifiers.Melee_Damage_Scrapper
    }
    else if (
      displayScrapperCriticalDamage &&
      displayScrappersStrikeATO &&
      power.effects[0].child_effects[0].tags.includes('CritLarge') &&
      powerIsInCritStrikesWindow
    ) {
      critDamage += (power.effects[0].child_effects[0].chance + SCRAPPERS_STRIKE_CRIT_BONUS + CRIT_STRIKES_BONUS) * power.effects[0].child_effects[0].templates[0].scale * ArchetypeModifiers.Melee_Damage_Scrapper
    }
    powerDamage += critDamage;
  }

  return powerDamage * targetsHit;
}