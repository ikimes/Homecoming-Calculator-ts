import Power
 from "../constants/power";
export const getCritStrikesPPM = (chainPowers: any, row: any) => {
  let critStrikesIndex;

  for(var i = 0; i < row; i++) {
    if(chainPowers[i].isCritStrikes) {
      critStrikesIndex = i;
    }
  }

  if(critStrikesIndex === undefined) {
    return 0;
  }
  
  const recharge = chainPowers[critStrikesIndex].rechargeTime;
  const rechargeEnhancement = chainPowers[critStrikesIndex].rechargeEnhancement;
  const castTime = chainPowers[critStrikesIndex].castTime;

  if(!chainPowers[critStrikesIndex].isAoE) {
    return Math.min(0.90, ((recharge / (1 + rechargeEnhancement) + castTime) * 4 / 60))
  } else {
    const arc = chainPowers[critStrikesIndex].arc;
    const radius = chainPowers[critStrikesIndex].radius;
    return Math.min(0.90, (chainPowers[critStrikesIndex].targetsHit * ((recharge / (1 + rechargeEnhancement) + castTime) * 4 / (60 * (1 + (radius * (((11 * arc) + 540) / 40000)))))))
  }
}

export const isInCritStrikesWindow = (chainPowers: Power[], row: any) => {
  let critStrikesIndexes = [];
  for(var i = 0; i < chainPowers.length; i++) {
    if(chainPowers[i].isCritStrikes) {
      critStrikesIndexes.push(i);
    }
  }
  
  let critStrikesWindow;
  let totalCastTimeAfterCritStrikes = 0;

  for(var i = 0; i <= critStrikesIndexes.length - 1; i++) {
    totalCastTimeAfterCritStrikes = 0;
    critStrikesWindow = (3.25 - (chainPowers[critStrikesIndexes[i]].castTimeBeforeEffect) + 0.5);

    for(var j = 0; j <= chainPowers.length - 1; j++) {
      if(j < critStrikesIndexes[i]) {
        continue;
      }

      if(critStrikesIndexes[i] !== undefined && critStrikesWindow > 0) {
        if(!chainPowers[j].isCritStrikes) {
          if(totalCastTimeAfterCritStrikes <= critStrikesWindow) {
            if(j === row) {
              return true;
            }
          }

          totalCastTimeAfterCritStrikes += chainPowers[j].castTime;
        }
      }
    }
  }

  return false;
}