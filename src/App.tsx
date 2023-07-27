// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css';
import { useState } from 'react'
import { PrimaryData, SecondaryData, EpicData } from './constants/archetypeData';
import { PowerForm } from './components/PowerForm';
import { PowerTable } from './components/PowerTable';
import Button from 'react-bootstrap/Button';
import RechargeDurations from './constants/rechargeDurations';
import Power from './constants/power';

function App() {
  const [archetype, setArchetype] = useState<keyof typeof PrimaryData>();
  const [primaryPowerData, setPrimaryPowerData] = useState<Array<unknown>>([]);
  const [secondaryPowerData, setSecondaryPowerData] = useState<Array<unknown>>([]);
  const [epicPowerData, setEpicPowerData] = useState<Array<unknown>>([]);
  const [primaryList, setPrimaryList] = useState<Array<string>>([]);
  const [secondaryList, setSecondaryList] = useState<Array<unknown>>([]);
  const [epicList, setEpicList] = useState<Array<unknown>>([]);
  const [chainPowers, setChainPowers] = useState<Array<Power>>([]);
  const [totalDamage, setTotalDamage] = useState<number>(0);
  const [totalCastTime, setTotalCastTime] = useState<number>(0);
  const [rechargeValidation, setRechargeValidation] = useState<string>();

  const handleArchetypeChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    setChainPowers([]);
    setPrimaryList([]);
    setSecondaryList([]);
    setEpicList([]);
    let selectedArchetype: keyof typeof PrimaryData = e.target.value as keyof typeof PrimaryData;
    setArchetype(selectedArchetype);
    let powerNames: Array<string>;
    let powersetDisplayNames: Array<string>;
    fetch(`power_data/${PrimaryData[selectedArchetype]}/index.json`)
      .then((response) => response.json())
      .then((data) => {
        powersetDisplayNames = data.powerset_display_names;
        setPrimaryList([...powersetDisplayNames])
        if(powersetDisplayNames[0] === 'Street Justice') {
          powersetDisplayNames[0] = 'Brawling'
        }
        return fetch(`power_data/${PrimaryData[selectedArchetype]}/${powersetDisplayNames[0].toLowerCase().replace(/ +/g, '_')}/index.json`)
      })
      .then((response) => response.json())
      .then((data) => {
          powerNames = data.power_names.map((name: string) => name.split('.')[2])
          let newPowerData: Array<unknown> = [];
          for(var i = 0; i < powerNames.length; i++) {
            fetch(`power_data/${PrimaryData[selectedArchetype]}/${powersetDisplayNames[0].toLowerCase().replace(/ +/g, '_')}/${powerNames[i].toLowerCase().replace(/ +/g, '_')}.json`)
              .then((response) => response.json())
              .then((data) => {
                newPowerData.push(data);
              });
          }
          setPrimaryPowerData(newPowerData);
          return fetch(`power_data/${SecondaryData[selectedArchetype]}/index.json`)
        })      
        .then((response) => response.json())
        .then((data) => {
          powersetDisplayNames = data.powerset_display_names;
          setSecondaryList([...powersetDisplayNames])
          if(powersetDisplayNames[0] === 'Bio Armor') {
            powersetDisplayNames[0] = "Bio Organic Armor";
          }
          return fetch(`power_data/${SecondaryData[selectedArchetype]}/${powersetDisplayNames[0].toLowerCase().replace(/ +/g, '_')}/index.json`)
        })
        .then((response) => response.json())
        .then((data) => {
            powerNames = data.power_names.map((name: string) => name.split('.')[2]);
            let newPowerData: Array<unknown> = [];
            for(var i = 0; i < powerNames.length; i++) {
              if(powerNames[i] === "Touch of the Beyond") {
                fetch(`power_data/${SecondaryData[selectedArchetype]}/${powersetDisplayNames[0].toLowerCase().replace(/ +/g, '_')}/touch_of_fear.json`)
                  .then((response) => response.json())
                  .then((data) => {
                    newPowerData.push(data);
                  });
              } else {
                fetch(`power_data/${SecondaryData[selectedArchetype]}/${powersetDisplayNames[0].toLowerCase().replace(/ +/g, '_')}/${powerNames[i].toLowerCase().replace(/ +/g, '_')}.json`)
                  .then((response) => response.json())
                  .then((data) => {
                    newPowerData.push(data);
                  });
              }
            }
            setSecondaryPowerData(newPowerData);
            return fetch(`power_data/${EpicData[selectedArchetype]}/index.json`)
          })
          .then((response) => response.json())
          .then((data) => {
            powersetDisplayNames = data.powerset_display_names;
            setEpicList([...powersetDisplayNames])
            return fetch(`power_data/${EpicData[selectedArchetype]}/${powersetDisplayNames[0].toLowerCase().replace(/ +/g, '_')}/index.json`)
          })
          .then((response) => response.json())
          .then((data) => {
            powerNames = data.power_names.map((name: string) => name.split('.')[2]);
            let newPowerData: Array<unknown> = [];
            for(var i = 0; i < powerNames.length; i++) {
              fetch(`power_data/${EpicData[selectedArchetype]}/${powersetDisplayNames[0].toLowerCase().replace(/ +/g, '_')}/${powerNames[i].toLowerCase().replace(/ +/g, '_')}.json`)
                .then((response) => response.json())
                .then((data) => {
                  newPowerData.push(data);
                });
            }
            setEpicPowerData(newPowerData);
            return fetch(`power_data/${EpicData[selectedArchetype]}/index.json`)
          })
  }

  const handlePrimaryChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    setChainPowers([]);
    let powerNames;
    let powerSetName = e.target.value;
    if (archetype === undefined) return;
    if(powerSetName === 'Street Justice') {
      powerSetName = "Brawling";
    }
    if(powerSetName === 'Kinetic Melee') {
      powerSetName = 'Kinetic Attack';
    }
    if(powerSetName === 'Spines' && PrimaryData[archetype] === PrimaryData.Scrapper) {
      powerSetName = 'Quills';
    }
    if(powerSetName === 'Ninja Blade') {
      powerSetName = 'Ninja Sword';
    }
    fetch(`power_data/${PrimaryData[archetype]}/${powerSetName.toLowerCase().replace(/ +/g, '_')}/index.json`)
      .then((response) => response.json())
      .then((data) => {
        powerNames = data.power_names.map((name: string) => name.split('.')[2])
        let newPowerData: Array<unknown> = [];
        for(var i = 0; i < powerNames.length; i++) {
          fetch(`power_data/${PrimaryData[archetype]}/${powerSetName.toLowerCase().replace(/ +/g, '_')}/${powerNames[i].toLowerCase().replace(/ +/g, '_')}.json`)
            .then((response) => response.json())
            .then((data) => {
              newPowerData.push(data);
            });
        }
        setPrimaryPowerData(newPowerData);
      })     
  }

  const handleSecondaryChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    setChainPowers([]);
    let powerNames;
    let powerSetName = e.target.value;
    if (archetype === undefined) return;
    if(powerSetName === 'Atomic Manipulation') {
      powerSetName = "Radiation Manipulation";
    }
    if(powerSetName === 'Devices') {
      powerSetName = "Gadgets";
    }
    if(powerSetName === 'Martial Combat') {
      powerSetName = "Martial Manipulation";
    }
    if(powerSetName === 'Temporal Manipulation') {
      powerSetName = "Time Manipulation";
    }
    if(powerSetName === 'Bio Armor') {
      powerSetName = "Bio Organic Armor";
    }
    fetch(`power_data/${SecondaryData[archetype]}/${powerSetName.toLowerCase().replace(/ +/g, '_')}/index.json`)
      .then((response) => response.json())
      .then((data) => {
        powerNames = data.power_names.map((name: string) => name.split('.')[2])
        let newPowerData: Array<unknown> = [];
        for(var i = 0; i < powerNames.length; i++) {
          fetch(`power_data/${SecondaryData[archetype]}/${powerSetName.toLowerCase().replace(/ +/g, '_')}/${powerNames[i].toLowerCase().replace(/ +/g, '_')}.json`)
            .then((response) => response.json())
            .then((data) => {
              newPowerData.push(data);
            });
        }
        setSecondaryPowerData(newPowerData);
      })  
  }

  const handleEpicChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    setChainPowers([]);
    let powerNames;
    let powerSetName = e.target.value;
    if (archetype === undefined) return;
    fetch(`power_data/${EpicData[archetype]}/${powerSetName.toLowerCase().replace(/ +/g, '_')}/index.json`)
    .then((response) => response.json())
    .then((data) => {
      powerNames = data.power_names.map((name: string) => name.split('.')[2])
      let newPowerData: Array<unknown> = [];
      for(var i = 0; i < powerNames.length; i++) {
        fetch(`power_data/${EpicData[archetype]}/${powerSetName.toLowerCase().replace(/ +/g, '_')}/${powerNames[i].toLowerCase().replace(/ +/g, '_')}.json`)
          .then((response) => response.json())
          .then((data) => {
            newPowerData.push(data);
          });
      }
      setEpicPowerData(newPowerData);
    })  
  }
  

  const handleCalculateTotalDamage = () => {
    let totalDamage = 0
    let totalCastTime = 0;
    for(var i = 0; i < chainPowers.length; i++) {
      totalDamage += chainPowers[i].damage;
      totalCastTime += chainPowers[i].castTime;
    }
    setTotalDamage(totalDamage);
    setTotalCastTime(totalCastTime);
  }

  const handleValidateChain = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    
    let rechargeDurations: Array<RechargeDurations> = [];
    chainPowers.forEach(power => {
      rechargeDurations.push({
        name: power.displayName,
        rechargeTimeRemaining: power.rechargeTime / (1 + power.rechargeEnhancement),
      })
    })

    for(var i = 0; i < chainPowers.length; i++) {
      /* update chain power recharge times */
      for(var k = 0; k < chainPowers.length; k++) {
        if(k <= i) {
          rechargeDurations[k].rechargeTimeRemaining -= chainPowers[i].castTimeBeforeEffect;
        }
      }
    }

    let resultString = '';
    for(var i = 0; i < rechargeDurations.length; i++) {
      if(rechargeDurations[i].rechargeTimeRemaining >= 0) {
        resultString += `Power ${i+1}: ${rechargeDurations[i].name} still has ${rechargeDurations[i].rechargeTimeRemaining.toFixed(1)} seconds of recharge remaining.`
        resultString += "\n";
      } else {
        resultString += `Power ${i+1}: ${rechargeDurations[i].name} is recharged!`
        resultString += "\n";
      }
    }
    setRechargeValidation(resultString);
  }

  return (
    <div className="App">
      <div className="container">
        <PowerForm 
          archetype={archetype}
          primaryList={primaryList}
          secondaryList={secondaryList}
          epicList={epicList}
          handleArchetypeChange={handleArchetypeChange}
          handlePrimaryChange={handlePrimaryChange}
          handleSecondaryChange={handleSecondaryChange}
          handleEpicChange={handleEpicChange}
        />
        <PowerTable
          archetype={archetype}
          chainPowers={chainPowers}
          setChainPowers={setChainPowers}
          primaryPowersetData={primaryPowerData}
          secondaryPowersetData={secondaryPowerData}
          epicPowersetData={epicPowerData}
        />
        <div className="container p-0">
          <Button
            onClick={handleValidateChain}
            className="my-3"
            style={{"marginRight": "5px"}}
            variant="primary"
          >
            Validate Chain Recharge
          </Button>
          <br></br>
          <span style={{whiteSpace: "pre"}}>
            {rechargeValidation}
          </span>
          <Button
            onClick={handleCalculateTotalDamage}
            className="my-3"
            style={{"marginRight": "5px"}}
            variant="danger"
          >
            Calculate Total Damage
          </Button>
          { totalDamage > 0 && (
              <div>
                <span>Total Damage: {totalDamage.toFixed(2)}</span><br></br>
                <span>Total Cast Time: {totalCastTime.toFixed(2)}s</span><br></br>
                <span>DPS: {(totalDamage / totalCastTime).toFixed(2)}</span>
              </div>
            )
          }
        </div>
      </div>
    </div>
  );

  // return (
  //   <>
  //     <div>
  //       <a href="https://vitejs.dev" target="_blank">
  //         <img src={viteLogo} className="logo" alt="Vite logo" />
  //       </a>
  //       <a href="https://react.dev" target="_blank">
  //         <img src={reactLogo} className="logo react" alt="React logo" />
  //       </a>
  //     </div>
  //     <h1>Vite + React</h1>
  //     <div className="card">
  //       <button onClick={() => setCount((count) => count + 1)}>
  //         count is {count}
  //       </button>
  //       <p>
  //         Edit <code>src/App.tsx</code> and save to test HMR
  //       </p>
  //     </div>
  //     <p className="read-the-docs">
  //       Click on the Vite and React logos to learn more
  //     </p>
  //   </>
  // )
}

export default App
