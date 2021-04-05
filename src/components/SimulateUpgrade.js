import React, { Component } from "react";
import ShowUpgradeTranscription from "./ShowUpgradeTranscription.js";
import ShowUpgradeSummary from "./ShowUpgradeSummary.js";

class multipleSimulationsLoop extends Component {
  state = {
    upgradeSimulationsAmount: 10000,
    upgradingProccessTranscription: [],

    isSummaryShown: false,
  };

  getRandomPercent() {
    let rand;
    do {
      rand = Math.round(Math.random() * 10000) / 100;
    } while (rand === 0);
    // avoiding 0.00 as a result

    // if (rand > 99.99 || rand < 0.01) {
    //   console.log(rand);
    // }

    return rand;
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  calcUpgradeChance = (i) => {
    const { upgradeAdditionals } = this.props;
    let upgradeChance = 0;

    switch (i) {
      case 0:
        upgradeChance = upgradeAdditionals[0] ? 97 : 95;
        break;
      case 1:
        upgradeChance = upgradeAdditionals[0] ? 95 : 85;
        break;
      case 2:
        upgradeChance = upgradeAdditionals[0] ? 85 : 75;
        break;
      case 3:
        upgradeChance = upgradeAdditionals[0] ? 75 : 65;
        break;
      case 4:
        upgradeChance = upgradeAdditionals[0] ? 60 : 50;
        break;
      case 5:
        upgradeChance = upgradeAdditionals[0] ? 50 : 40;
        break;
      case 6:
        upgradeChance = upgradeAdditionals[0] ? 40 : 30;
        break;
      case 7:
        upgradeChance = upgradeAdditionals[0] ? 30 : 20;
        break;
      default:
        upgradeChance = upgradeAdditionals[0] ? 20 : 10;
        break;
    }
    return upgradeChance;
  };

  singleSimulationProccess = () => {
    let i = 0;
    let spinCounter = 0;
    let essenceCounter = 0;
    let reolCounter = 0;
    let dviggCounter = 0;
    let upgradingProccessTranscription = [];

    const { upgradeAdditionals } = this.props;
    const { durability } = this.props;
    const { calcUpgradeChance } = this;

    do {
      const { upgradeGoal } = this.props;

      let upgradeCondition = 100 - calcUpgradeChance(i);
      let megaUpgradeCondition = 100 - (upgradeAdditionals[i][2] ? 4 : 2);
      let withstandCondition =
        100 -
        (upgradeAdditionals[i][1]
          ? parseInt(durability) + 20
          : parseInt(durability));
      let drawIfUpgradeSucceed = this.getRandomPercent();
      spinCounter++;
      essenceCounter += upgradeAdditionals[i][0] ? 1 : 0;
      reolCounter += upgradeAdditionals[i][1] ? 1 : 0;
      dviggCounter += upgradeAdditionals[i][2] ? 1 : 0;

      let transcriptionArr = [
        upgradeAdditionals[i][0], // czy eska [0]
        upgradeAdditionals[i][1], // czy reaol [1]
        upgradeAdditionals[i][2], // czy dvigg [2]
        calcUpgradeChance(i), // szansa na ulepszenie [3]
        upgradeAdditionals[i][2] ? 4 : 2, // szansa na MEGA [4]
        upgradeAdditionals[i][1]
          ? parseInt(durability) + 20
          : parseInt(durability), // wytrzymalosc efektywna [5]
        drawIfUpgradeSucceed, // wylosowana wartosc [6]
        i, // ulepszenie przed spinem [7]
      ];

      if (drawIfUpgradeSucceed < upgradeCondition) {
        // ulepszenie nieudane
        let drawIfUpgradesResets = this.getRandomPercent();

        if (drawIfUpgradesResets < withstandCondition) {
          // wyzerowane
          i = 0;
          transcriptionArr.push(
            false, // info czy udane [8]
            false, // info czy sprzet wyrtrzymal [9] // info czy udane MEGA [9]
            drawIfUpgradesResets, // wylosowana wartosc czy srzet wytrzyma [10]
            i, // ulepszenie po spinie [11]
            i >= upgradeGoal // czy osiągnięty cel ulepszania [12]
          );
        } else {
          // sprzęt wytrzymał
          transcriptionArr.push(
            false, // info czy udane [8]
            true, // info czy sprzet wyrtrzymal [9] // info czy udane MEGA [9]
            drawIfUpgradesResets, // wylosowana wartosc czy srzet wytrzyma [10]
            i, // ulepszenie po spinie [11]
            i >= upgradeGoal // czy osiągnięty cel ulepszania [12]
          );
        }
      } else if (drawIfUpgradeSucceed < megaUpgradeCondition) {
        // udane zwykłe ulepszenie
        i++;
        transcriptionArr.push(
          true, // info czy udane [8]
          false, // info czy sprzet wyrtrzymal [9] // info czy udane MEGA [9]
          -1, // wylosowana wartosc czy srzet wytrzyma [10]
          i, // ulepszenie po spinie [11]
          i >= upgradeGoal // czy osiągnięty cel ulepszania [12]
        );
      } else if (drawIfUpgradeSucceed >= megaUpgradeCondition) {
        // udane mega ulepszenie
        i++;
        i++;
        transcriptionArr.push(
          true, // info czy udane [8]
          true, // info czy sprzet wyrtrzymal [9] // info czy udane MEGA [9]
          -1, // wylosowana wartosc czy srzet wytrzyma [10]
          i, // ulepszenie po spinie [11]
          i >= upgradeGoal // czy osiągnięty cel ulepszania [12]
        );
      }

      upgradingProccessTranscription.push(transcriptionArr);
    } while (i < this.props.upgradeGoal);
    return [
      spinCounter,
      essenceCounter,
      reolCounter,
      dviggCounter,
      upgradingProccessTranscription,
    ];
  };

  multipleSimulationsLoop = (event) => {
    const upgradeSimulationsTarget = event.target[0].value;
    event.preventDefault();
    const { singleSimulationProccess } = this;
    let upgradingProccessTranscription = [];

    let i = 0;
    do {
      const simulationResult = singleSimulationProccess();

      upgradingProccessTranscription.push(simulationResult[4]);
      i++;
    } while (i < upgradeSimulationsTarget);

    this.setState({
      upgradingProccessTranscription,
      isSummaryShown: true,
    });
  };
  render() {
    const { multipleSimulationsLoop, handleChange } = this;
    const { upgradeSimulationsAmount, isSummaryShown } = this.state;

    return (
      <>
        <div className="multipleSimulationsLoopContainer">
          <form onSubmit={(e) => multipleSimulationsLoop(e)}>
            <label>
              <span className="newLine">
                Wybierz ile symulacji ulepszania chcesz przeprowadzić (1
                symulacja to pełny proces ulepszania od +0 do wybranego celu
                ulepszenia)
              </span>
              <select
                onChange={handleChange}
                name="upgradeSimulationsAmount"
                value={upgradeSimulationsAmount}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="10">10</option>
                <option value="100">100</option>
                <option value="1000">1000</option>
                <option value="10000">10 000</option>
                <option value="100000">100 000 (uwaga)</option>
                {/* <option value="1000000">1 000 000 (uwaga!!!)</option> */}
              </select>
            </label>
            <div>
              <button className="doSimulationBtn">Przeprowadź symulacje</button>
            </div>
          </form>
        </div>
        <ShowUpgradeTranscription
          upgradingProccessTranscription={
            this.state.upgradingProccessTranscription
          }
        />
        <ShowUpgradeSummary
          upgradingProccessTranscription={
            this.state.upgradingProccessTranscription
          }
          isSummaryShown={isSummaryShown}
          {...this.props}
        />
      </>
    );
  }
}
// </div>

export default multipleSimulationsLoop;
