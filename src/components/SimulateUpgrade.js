import React, { Component } from "react";
// import { itemListByRank } from "./Data.js";

class SimulateUpgrade extends Component {
  state = {
    durability: 45, // tmp
    upgradeSimulationsAmount: 1000,
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

  doSimulaton = () => {
    let i = 0;
    let spinCounter = 0;
    let essenceCounter = 0;
    let reolCounter = 0;
    let dviggCounter = 0;

    const { upgradeAdditionals } = this.props;
    const { durability } = this.state;
    const { calcUpgradeChance } = this;

    do {
      let upgradeCondition = 100 - calcUpgradeChance(i);
      let megaUpgradeCondition = 100 - (upgradeAdditionals[i][2] ? 4 : 2);
      let withstandCondition =
        100 - (upgradeAdditionals[i][1] ? durability + 20 : durability);
      let drawIfUpgradeSucceed = this.getRandomPercent();
      spinCounter++;
      essenceCounter += upgradeAdditionals[i][0] ? 1 : 0;
      reolCounter += upgradeAdditionals[i][1] ? 1 : 0;
      dviggCounter += upgradeAdditionals[i][2] ? 1 : 0;

      if (drawIfUpgradeSucceed < upgradeCondition) {
        // ulepszenie nieudane
        let drawIfUpgradesResets = this.getRandomPercent();

        if (drawIfUpgradesResets < withstandCondition) {
          // wyzerowane
          i = 0;
        } else {
          // sprzęt wytrzymał
        }
      } else if (drawIfUpgradeSucceed < megaUpgradeCondition) {
        // udane zwykłe ulepszenie
        i++;
      } else if (drawIfUpgradeSucceed >= megaUpgradeCondition) {
        // udane mega ulepszenie
        i++;
        i++;
      }
    } while (i < this.props.upgradeGoal);
    //
    // console.log("wymagało " + counter + " zakręceń.");
    return [spinCounter, essenceCounter, reolCounter, dviggCounter];
  };

  simulateUpgrade = (event) => {
    const upgradeSimulationsTarget = event.target[0].value;
    event.preventDefault();
    const { doSimulaton } = this;
    let spinCounter = 0;
    let essenceCounter = 0;
    let reolCounter = 0;
    let dviggCounter = 0;

    let i = 0;
    do {
      const simulationResult = doSimulaton();
      spinCounter += simulationResult[0];
      essenceCounter += simulationResult[1];
      reolCounter += simulationResult[2];
      dviggCounter += simulationResult[3];

      i++;
    } while (i < upgradeSimulationsTarget);

    // console.log(
    //   "Ulepszenie zabrało średnio " +
    //     Math.round(spinCounter / upgradeSimulationsTarget) +
    //     " zakręceń."
    // );
    // console.log(
    //   "Użytych zostało średnio: " +
    //     Math.round(essenceCounter / upgradeSimulationsTarget) +
    //     " esencji, " +
    //     Math.round(reolCounter / upgradeSimulationsTarget) +
    //     " reoli, " +
    //     Math.round(dviggCounter / upgradeSimulationsTarget) +
    //     " dviggów, oraz po " +
    //     Math.round(spinCounter / upgradeSimulationsTarget) +
    //     " inhibitorów i flaszek."
    // );

    // średni koszt ulepszenia:

    const averageUpgradeCost =
      (spinCounter * (this.props.flaskRate + 192000 + 200000) +
        essenceCounter * this.props.essenceRate +
        reolCounter * this.props.reolRate +
        dviggCounter * this.props.dviggRate) /
      upgradeSimulationsTarget;

    console.log(
      "Średni koszt ulepszenia to " +
        Math.round(averageUpgradeCost / 1000000) +
        "kk"
    );
  };

  render() {
    const { simulateUpgrade, handleChange } = this;
    const { upgradeSimulationsAmount } = this.state;

    return (
      <div className="simulateUpgrade">
        <form onSubmit={(e) => simulateUpgrade(e)}>
          <label>
            Wybierz ile symulacji ulepszania chcesz przeprowadzić
            <select
              onChange={handleChange}
              name="upgradeSimulationsAmount"
              value={upgradeSimulationsAmount}
            >
              <option value="1">1</option>
              <option value="10">10</option>
              <option value="100">100</option>
              <option value="1000">1000</option>
              <option value="10000">10 000</option>
              <option value="100000">100 000 (uwaga)</option>
              <option value="1000000">1 000 000 (uwaga!!!)</option>
            </select>
          </label>
          <button>Przeprowadź symulacje</button>
        </form>
      </div>
    );
  }
}

export default SimulateUpgrade;
