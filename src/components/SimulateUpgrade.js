import React, { Component } from "react";

class SimulateUpgrade extends Component {
  state = {
    upgradeChances: [],
    durability: 45, // tmp
  };

  getRandomPercent() {
    return Math.floor(Math.random() * Math.floor(100) + 1);
  }

  generateUpgradeChancesArr = () => {
    const { statesArray } = this.props;
    const { durability } = this.state;

    let upgradeChances = statesArray.map((additionals, index) => {
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

    this.doSimulaton(upgradeChances);
  };

  simulateUpgrade = () => {
    this.generateUpgradeChancesArr();
  };

  doSimulaton = (upgradeChances) => {
    let i = 0;
    let counter = 0;
    do {
      let rand = this.getRandomPercent();
      counter++;
      if (rand > 100 - upgradeChances[i][0]) {
        if (rand > 100 - upgradeChances[i][2]) {
          i++;
          console.log("udane mega");
        }
        i++;
        console.log("ulepszenie udane");
      } else {
        let rand = this.getRandomPercent();
        if (rand > upgradeChances[i][1]) {
          console.log("ulepszenie nieudane ale wytrzymał");
        } else {
          i = 0;
          console.log("ulepszenia zostały wyzerowane");
        }
      }
    } while (i < this.props.upgradeGoal);
    console.log("wymagało " + counter + " zakręceń.");
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
