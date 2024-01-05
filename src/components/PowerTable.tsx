import { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { PowerRow } from './PowerRow';
import { isInCritStrikesWindow } from '../utility/critStrikes';
import Power from '../constants/power';
import { PowersetDataKeys } from '../constants/power';

export interface PowerTableProps {
  archetype: string | undefined;
  chainPowers: Power[];
  setChainPowers: (chainPowers: Power[]) => void;
  powersetData: {
    [key in PowersetDataKeys]: Power[]
  };
} // There seems to be a composed Power object and then a raw Power object. Maybe have a chainPower type and then a rawPower type.

export const PowerTable = (props: PowerTableProps) => {
  const [numberOfPowers, setNumberOfPowers] = useState<number>(0);

  useEffect(() => {
    setNumberOfPowers(props.chainPowers.length)
  }, [props.chainPowers])

  const handleAddPrimaryPowerClick = () => {
    let currentChainPowers = [...props.chainPowers];

    let castTimeBeforeEffect = 0;
    if(props.powersetData.primary[0].custom_fx.length === 0) {
      castTimeBeforeEffect = props.powersetData.primary[0].fx.frames_before_hit / 30;
    } else {
      castTimeBeforeEffect = props.powersetData.primary[0].custom_fx[0].fx.frames_before_hit / 30;
    }
    
    const newChainPower: Power = {
      name: props.powersetData.primary[0].name,
      icon: props.powersetData.primary[0].icon,
      displayName: props.powersetData.primary[0].display_name ?? '',
      category: "primary",
      damageEnhancement: 0,
      rechargeEnhancement: 0,
      standardProcs: 0,
      purpleProcs: 0,
      damage: 0,
      castTime: Number(props.powersetData.primary[0].activation_time),
      castTimeBeforeEffect: castTimeBeforeEffect,
      enduranceCost: Number(props.powersetData.primary[0].endurance_cost),
      rechargeTime: Number(props.powersetData.primary[0].recharge_time),
      powerIsRecharged: false,
      displayScrapperCriticalDamage: true,
      displayScrappersStrikeATO: false,
      displayStealthCrit: false,
      isCritStrikes: false,
      powerIsInCritStrikesWindow: isInCritStrikesWindow(currentChainPowers, currentChainPowers.length - 1),
      comboLevel: 0,
      targetsHit: 1,
      maxTargetsHit: props.powersetData.primary[0].max_targets_hit ?? '',
      numberOfTeammates: 0,
      assassinsFocusStacks: 0,
      isAoE: props.powersetData.primary[0].isAoE, 
      custom_fx: props.powersetData.primary[0].custom_fx, 
      arc: props.powersetData.primary[0].arc, 
      radius: props.powersetData.primary[0].radius
    }

    props.setChainPowers([...currentChainPowers, newChainPower]);
    setNumberOfPowers(numberOfPowers + 1);
  }

  const handleAddSecondaryPowerClick = () => {
    let currentChainPowers = [...props.chainPowers];

    let castTimeBeforeEffect = 0;
    if(props.powersetData.secondary[0].custom_fx.length === 0) {
      castTimeBeforeEffect = props.powersetData.secondary[0].fx.frames_before_hit / 30;
    } else {
      castTimeBeforeEffect = props.powersetData.secondary[0].custom_fx[0].fx.frames_before_hit / 30;
    }

    const newChainPower: Power = {
      name: props.powersetData.secondary[0].name,
      icon: props.powersetData.secondary[0].icon,
      displayName: props.powersetData.secondary[0].display_name ?? '',
      category: "secondary",
      damageEnhancement: 0,
      rechargeEnhancement: 0,
      standardProcs: 0,
      purpleProcs: 0,
      damage: 0,
      castTime: Number(props.powersetData.secondary[0].activation_time),
      castTimeBeforeEffect: castTimeBeforeEffect,
      enduranceCost: Number(props.powersetData.secondary[0].endurance_cost),
      rechargeTime: Number(props.powersetData.secondary[0].recharge_time),
      powerIsRecharged: false,
      displayScrapperCriticalDamage: true,
      displayScrappersStrikeATO: true,
      displayStealthCrit: false,
      isCritStrikes: false,
      powerIsInCritStrikesWindow: isInCritStrikesWindow(currentChainPowers, currentChainPowers.length - 1),
      comboLevel: 0,
      targetsHit: 1,
      maxTargetsHit: props.powersetData.secondary[0].max_targets_hit ?? '',
      numberOfTeammates: 0,
      assassinsFocusStacks: 0,
      isAoE: props.powersetData.secondary[0].isAoE, 
      custom_fx: props.powersetData.secondary[0].custom_fx, 
      arc: props.powersetData.secondary[0].arc, 
      radius: props.powersetData.secondary[0].radius
    }

    props.setChainPowers([...currentChainPowers, newChainPower]);
    setNumberOfPowers(numberOfPowers + 1);
  }

  const handleAddCritStrikesPowerClick = () => {
    let currentChainPowers = [...props.chainPowers];

    let castTimeBeforeEffect = 0;
    if(props.powersetData.primary[0].custom_fx.length === 0) {
      castTimeBeforeEffect = props.powersetData.primary[0].fx.frames_before_hit / 30;
    } else {
      castTimeBeforeEffect = props.powersetData.primary[0].custom_fx[0].fx.frames_before_hit / 30;
    }

    const newChainPower: Power = {
      name: props.powersetData.primary[0].name,
      icon: props.powersetData.primary[0].icon,
      displayName: props.powersetData.primary[0].display_name ?? '',
      category: "primary",
      damageEnhancement: 0,
      rechargeEnhancement: 0,
      standardProcs: 0,
      purpleProcs: 0,
      damage: 0,
      castTime: Number(props.powersetData.primary[0].activation_time),
      castTimeBeforeEffect: castTimeBeforeEffect,
      enduranceCost: Number(props.powersetData.primary[0].endurance_cost),
      rechargeTime: Number(props.powersetData.primary[0].recharge_time),
      powerIsRecharged: false,
      isCritStrikes: true,
      displayScrapperCriticalDamage: true,
      displayScrappersStrikeATO: false,
      comboLevel: 0,
      targetsHit: 1,
      maxTargetsHit: props.powersetData.primary[0].max_targets_hit ?? '',
      numberOfTeammates: 0,
      assassinsFocusStacks: 0,
      isAoE: props.powersetData.primary[0].isAoE, 
      custom_fx: props.powersetData.primary[0].custom_fx, 
      arc: props.powersetData.primary[0].arc, 
      radius: props.powersetData.primary[0].radius,
      displayStealthCrit: props.powersetData.primary[0].displayStealthCrit,
      powerIsInCritStrikesWindow: props.powersetData.primary[0].powerIsInCritStrikesWindow
    }

    currentChainPowers[props.chainPowers.length] = newChainPower;
    props.setChainPowers([...currentChainPowers]);
    setNumberOfPowers(numberOfPowers + 1);
  }

  const handleAddEpicPowerClick = () => {
    let currentChainPowers = [...props.chainPowers];

    let castTimeBeforeEffect = 0;
    if(props.powersetData.epic[0].custom_fx.length === 0) {
      castTimeBeforeEffect = props.powersetData.epic[0].fx.frames_before_hit / 30;
    } else {
      castTimeBeforeEffect = props.powersetData.epic[0].custom_fx[0].fx.frames_before_hit / 30;
    }

    const newChainPower: Power = {
      name: props.powersetData.epic[0].name,
      icon: props.powersetData.epic[0].icon,
      displayName: props.powersetData.epic[0].display_name ?? '',
      category: "epic" as PowersetDataKeys,
      damageEnhancement: 0,
      rechargeEnhancement: 0,
      standardProcs: 0,
      purpleProcs: 0,
      damage: 0,
      castTime: Number(props.powersetData.epic[0].activation_time),
      castTimeBeforeEffect: castTimeBeforeEffect,
      enduranceCost: Number(props.powersetData.epic[0].endurance_cost),
      rechargeTime: Number(props.powersetData.epic[0].recharge_time),
      powerIsRecharged: false,
      isCritStrikes: false,
      displayScrapperCriticalDamage: true,
      displayScrappersStrikeATO: false,
      comboLevel: 0,
      targetsHit: 1,
      maxTargetsHit: props.powersetData.epic[0].max_targets_hit ?? '',
      numberOfTeammates: 0,
      assassinsFocusStacks: 0,
      isAoE: props.powersetData.epic[0].isAoE, 
      custom_fx: props.powersetData.epic[0].custom_fx, 
      arc: props.powersetData.epic[0].arc, 
      radius: props.powersetData.epic[0].radius,
      displayStealthCrit: props.powersetData.epic[0].displayStealthCrit,
      powerIsInCritStrikesWindow: props.powersetData.epic[0].powerIsInCritStrikesWindow
    }

    currentChainPowers[props.chainPowers.length] = newChainPower;
    props.setChainPowers([...currentChainPowers]);
    setNumberOfPowers(numberOfPowers + 1);
  }

  return (
    <Container className="mt-3 list-group" style={{paddingRight: "0"}}>
      {
        props.chainPowers.length > 0 ? (
          props.chainPowers.map((power: Power, i: number) => {
            return (
              <PowerRow
                key={i}
                row={i}
                category={power.category}
                archetype={props.archetype ?? ''}
                power={power}
                powersetData={props.powersetData}
                chainPowers={props.chainPowers}
                setChainPowers={props.setChainPowers}
                isCritStrikes={power.isCritStrikes}
              />
            )
          })
        ) : (
          <Row><span>No Powers</span></Row>
        )
      }
      <div>
        { props.archetype && (
            <Button
              onClick={handleAddPrimaryPowerClick}
              className="my-3"
              style={{"marginRight": "5px"}}
              variant="dark"
              disabled={numberOfPowers === 10}
            >
              Add Primary Power
            </Button>
          )
        }
        { props.archetype && (
            <Button
              onClick={handleAddSecondaryPowerClick}
              className="my-3"
              style={{"marginRight": "5px"}}
              variant="dark"
              disabled={numberOfPowers === 10}
            >
              Add Secondary Power
            </Button>
          )
        }
        { props.archetype && (
            <Button
              onClick={handleAddEpicPowerClick}
              className="my-3"
              style={{"marginRight": "5px"}}
              variant="dark"
              disabled={numberOfPowers === 10}
            >
              Add Epic Power
            </Button>
          )
        }
        {
          props.archetype === "Scrapper" && (
            <Button
              onClick={handleAddCritStrikesPowerClick}
              className="my-3"
              style={{"marginRight": "5px"}}
              variant="danger"
              disabled={numberOfPowers === 10}
            >
                Add Critical Strikes Power
            </Button>
          )
        }
      </div>
      {
        numberOfPowers >= 10 && (
          <div>
            <span style={{color: "red"}}>You may only add up to 10 powers.</span>
          </div>
        )
      }
    </Container>
  )
}