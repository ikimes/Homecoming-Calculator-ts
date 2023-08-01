import { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { PowerRow } from './PowerRow';
import { isInCritStrikesWindow } from '../utility/critStrikes';
import Power from '../constants/power';

export interface PowerTableProps {
  archetype: string | undefined;
  chainPowers: Power[];
  setChainPowers: (chainPowers: Power[]) => void;
  primaryPowersetData: Power[];
  secondaryPowersetData: Power[];
  epicPowersetData: Power[];
} // There seems to be a composed Power object and then a raw Power object. Maybe have a chainPower type and then a rawPower type.

export const PowerTable = (props: PowerTableProps) => {
  const [numberOfPowers, setNumberOfPowers] = useState<number>(0);

  useEffect(() => {
    setNumberOfPowers(props.chainPowers.length)
  }, [props.chainPowers])

  const handleAddPrimaryPowerClick = () => {
    let currentChainPowers = [...props.chainPowers];

    let castTimeBeforeEffect = 0;
    if(props.primaryPowersetData[0].custom_fx.length === 0) {
      castTimeBeforeEffect = props.primaryPowersetData[0].fx.frames_before_hit / 30;
    } else {
      castTimeBeforeEffect = props.primaryPowersetData[0].custom_fx[0].fx.frames_before_hit / 30;
    }
    
    const newChainPower: Power = {
      name: props.primaryPowersetData[0].name,
      icon: props.primaryPowersetData[0].icon,
      displayName: props.primaryPowersetData[0].display_name,
      category: "primary",
      damageEnhancement: 0,
      rechargeEnhancement: 0,
      standardProcs: 0,
      purpleProcs: 0,
      damage: 0,
      castTime: props.primaryPowersetData[0].activation_time,
      castTimeBeforeEffect: castTimeBeforeEffect,
      enduranceCost: props.primaryPowersetData[0].endurance_cost,
      rechargeTime: props.primaryPowersetData[0].recharge_time,
      powerIsRecharged: false,
      displayScrapperCriticalDamage: true,
      displayScrappersStrikeATO: false,
      displayStealthCrit: false,
      isCritStrikes: false,
      powerIsInCritStrikesWindow: isInCritStrikesWindow(currentChainPowers, currentChainPowers.length - 1),
      comboLevel: 0,
      targetsHit: 1,
      maxTargetsHit: props.primaryPowersetData[0].max_targets_hit,
      numberOfTeammates: 0,
      assassinsFocusStacks: 0,
    }

    props.setChainPowers([...currentChainPowers, newChainPower]);
    setNumberOfPowers(numberOfPowers + 1);
  }

  const handleAddSecondaryPowerClick = () => {
    let currentChainPowers = [...props.chainPowers];

    let castTimeBeforeEffect = 0;
    if(props.secondaryPowersetData[0].custom_fx.length === 0) {
      castTimeBeforeEffect = props.secondaryPowersetData[0].fx.frames_before_hit / 30;
    } else {
      castTimeBeforeEffect = props.secondaryPowersetData[0].custom_fx[0].fx.frames_before_hit / 30;
    }

    const newChainPower = {
      name: props.secondaryPowersetData[0].name,
      icon: props.secondaryPowersetData[0].icon,
      displayName: props.secondaryPowersetData[0].display_name,
      category: "secondary",
      damageEnhancement: 0,
      rechargeEnhancement: 0,
      standardProcs: 0,
      purpleProcs: 0,
      damage: 0,
      castTime: props.secondaryPowersetData[0].activation_time,
      castTimeBeforeEffect: castTimeBeforeEffect,
      enduranceCost: props.secondaryPowersetData[0].endurance_cost,
      rechargeTime: props.secondaryPowersetData[0].recharge_time,
      powerIsRecharged: false,
      displayScrapperCriticalDamage: true,
      displayScrappersStrikeATO: true,
      isCritStrikes: false,
      powerIsInCritStrikesWindow: isInCritStrikesWindow(currentChainPowers, currentChainPowers.length - 1),
      comboLevel: 0,
      targetsHit: 1,
      maxTargetsHit: props.secondaryPowersetData[0].max_targets_hit,
      numberOfTeammates: 0,
      assassinsFocusStacks: 0,
    }

    props.setChainPowers([...currentChainPowers, newChainPower]);
    setNumberOfPowers(numberOfPowers + 1);
  }

  const handleAddCritStrikesPowerClick = () => {
    let currentChainPowers = [...props.chainPowers];

    let castTimeBeforeEffect = 0;
    if(props.primaryPowersetData[0].custom_fx.length === 0) {
      castTimeBeforeEffect = props.primaryPowersetData[0].fx.frames_before_hit / 30;
    } else {
      castTimeBeforeEffect = props.primaryPowersetData[0].custom_fx[0].fx.frames_before_hit / 30;
    }

    const newChainPower = {
      name: props.primaryPowersetData[0].name,
      icon: props.primaryPowersetData[0].icon,
      displayName: props.primaryPowersetData[0].display_name,
      category: "primary",
      damageEnhancement: 0,
      rechargeEnhancement: 0,
      standardProcs: 0,
      purpleProcs: 0,
      damage: 0,
      castTime: props.primaryPowersetData[0].activation_time,
      castTimeBeforeEffect: castTimeBeforeEffect,
      enduranceCost: props.primaryPowersetData[0].endurance_cost,
      rechargeTime: props.primaryPowersetData[0].recharge_time,
      powerIsRecharged: false,
      isCritStrikes: true,
      displayScrapperCriticalDamage: true,
      displayScrappersStrikeATO: false,
      comboLevel: 0,
      targetsHit: 1,
      maxTargetsHit: props.primaryPowersetData[0].max_targets_hit,
      numberOfTeammates: 0,
      assassinsFocusStacks: 0,
    }

    currentChainPowers[props.chainPowers.length] = newChainPower;
    props.setChainPowers([...currentChainPowers]);
    setNumberOfPowers(numberOfPowers + 1);
  }

  const handleAddEpicPowerClick = () => {
    let currentChainPowers = [...props.chainPowers];

    let castTimeBeforeEffect = 0;
    if(props.epicPowersetData[0].custom_fx.length === 0) {
      castTimeBeforeEffect = props.epicPowersetData[0].fx.frames_before_hit / 30;
    } else {
      castTimeBeforeEffect = props.epicPowersetData[0].custom_fx[0].fx.frames_before_hit / 30;
    }

    const newChainPower = {
      name: props.epicPowersetData[0].name,
      icon: props.epicPowersetData[0].icon,
      displayName: props.epicPowersetData[0].display_name,
      category: "epic",
      damageEnhancement: 0,
      rechargeEnhancement: 0,
      standardProcs: 0,
      purpleProcs: 0,
      damage: 0,
      castTime: props.epicPowersetData[0].activation_time,
      castTimeBeforeEffect: castTimeBeforeEffect,
      enduranceCost: props.epicPowersetData[0].endurance_cost,
      rechargeTime: props.epicPowersetData[0].recharge_time,
      powerIsRecharged: false,
      isCritStrikes: false,
      displayScrapperCriticalDamage: true,
      displayScrappersStrikeATO: false,
      comboLevel: 0,
      targetsHit: 1,
      maxTargetsHit: props.epicPowersetData[0].max_targets_hit,
      numberOfTeammates: 0,
      assassinsFocusStacks: 0,
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
                archetype={props.archetype}
                power={power}
                primaryPowersetData={props.primaryPowersetData}
                secondaryPowersetData={props.secondaryPowersetData}
                epicPowersetData={props.epicPowersetData}
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