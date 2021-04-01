import React, { Component } from "react";

class SimulateUpgrade extends Component {
  state = {
    upgradeChances: [],
    durability: 45, // tmp
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

  generateUpgradeChancesArr = () => {
    const { upgradeAdditionals } = this.props;
    const { durability } = this.state;

    let upgradeChances = upgradeAdditionals.map((additionals, index) => {
      switch (index) {
        case 0:
          return [
            additionals[0] ? 97 : 95,
            additionals[1] ? durability + 20 : durability,
            additionals[2] ? 4 : 2,
          ];
        case 1:
          return [
            additionals[0] ? 95 : 85,
            additionals[1] ? durability + 20 : durability,
            additionals[2] ? 4 : 2,
          ];
        case 2:
          return [
            additionals[0] ? 85 : 75,
            additionals[1] ? durability + 20 : durability,
            additionals[2] ? 4 : 2,
          ];
        case 3:
          return [
            additionals[0] ? 75 : 65,
            additionals[1] ? durability + 20 : durability,
            additionals[2] ? 4 : 2,
          ];
        case 4:
          return [
            additionals[0] ? 60 : 50,
            additionals[1] ? durability + 20 : durability,
            additionals[2] ? 4 : 2,
          ];
        case 5:
          return [
            additionals[0] ? 50 : 40,
            additionals[1] ? durability + 20 : durability,
            additionals[2] ? 4 : 2,
          ];
        case 6:
          return [
            additionals[0] ? 40 : 30,
            additionals[1] ? durability + 20 : durability,
            additionals[2] ? 4 : 2,
          ];
        case 7:
          return [
            additionals[0] ? 30 : 20,
            additionals[1] ? durability + 20 : durability,
            additionals[2] ? 4 : 2,
          ];
        default:
          return [
            additionals[0] ? 20 : 10,
            additionals[1] ? durability + 20 : durability,
            additionals[2] ? 4 : 2,
          ];
      }
    });

    this.setState({
      upgradeChances,
    });

    return this.doSimulaton(upgradeChances);
  };

  simulateUpgrade = () => {
    const { generateUpgradeChancesArr } = this;
    let spinsCounter = 0;

    let i = 0;
    do {
      spinsCounter += generateUpgradeChancesArr();
      i++;
    } while (i < 1000);

    console.log(
      "Ulepszenie zabrało średnio " +
        Math.round(spinsCounter / 1000) +
        " zakręceń."
    );
  };

  doSimulaton = (upgradeChances) => {
    let i = 0;
    let counter = 0;

    const { upgradeAdditionals } = this.props;
    const { durability } = this.state;

    do {
      let finalDurability = upgradeAdditionals[i][1]
        ? durability + 20
        : durability;
      let megaChance = upgradeAdditionals[i][2] ? 4 : 2;

      let upgradeCondition = 100 - upgradeChances[i][0];
      let megaUpgradeCondition = 100 - (upgradeAdditionals[i][2] ? 4 : 2);
      let withstandCondition =
        100 - (upgradeAdditionals[i][1] ? durability + 20 : durability);
      let drawIfUpgradeSucceed = this.getRandomPercent();
      counter++;

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
    return counter;
  };

  render() {
    const { simulateUpgrade } = this;

    return (
      <div className="simulateUpgrade">
        <button onClick={simulateUpgrade}>Symuluj ulepszanie</button>
      </div>
    );
  }
}

export default SimulateUpgrade;
