import React, { Component } from "react";
import UpgradeOption from "./UpgradeOption.js";
import SimulateUpgrade from "./SimulateUpgrade.js";

class UpgradeSettings extends Component {
  state = {
    upgradeGoal: 11,
    statesArray: [
      [false, false, false],
      [true, false, false],
      [true, false, false],
      [true, false, false],
      [true, false, false],
      [true, true, true],
      [true, true, true],
      [true, true, true],
      [true, true, true],
      [true, true, true],
      [true, true, true],
    ],
  };

  handleUpgradeGoalChange = (e) => {
    let statesArray = [];
    for (let i = 0; i < e.target.value; i++) {
      statesArray.push([
        i > 0 ? true : false,
        i > 4 ? true : false,
        i > 4 ? true : false,
      ]);
    }

    this.setState({
      statesArray,
      [e.target.name]: e.target.value,
    });
  };

  handleOptionStatesChange = (upgradeStep, itemType) => {
    let statesArray = this.state.statesArray;

    statesArray = statesArray.map((upgradeOption, index) => {
      if (index === upgradeStep) {
        upgradeOption[itemType] = !upgradeOption[itemType];
        return upgradeOption;
      } else {
        return upgradeOption;
      }
    });

    this.setState({
      statesArray,
    });
  };

  showUpgradeSettings = () => {
    const { statesArray } = this.state;
    const { handleOptionStatesChange } = this;

    let options = [];
    for (let i = 0; i < this.state.upgradeGoal; i++) {
      options.push(
        <UpgradeOption
          upgradeStep={i}
          key={i}
          isEssenceAdded={statesArray[i][0]}
          isReolAdded={statesArray[i][1]}
          isDviggAdded={statesArray[i][2]}
          handleOptionStatesChange={handleOptionStatesChange}
        />
      );
    }
    return options;
  };

  render() {
    const { showUpgradeSettings, handleUpgradeGoalChange } = this;
    const { upgradeGoal, statesArray } = this.state;

    return (
      <>
        <div className="upgradesSettings">
          <h5>Cel ulepszania:</h5>
          <input
            type="number"
            name="upgradeGoal"
            value={upgradeGoal}
            onChange={handleUpgradeGoalChange}
            min="1"
            max="20"
          />
          <h3>Opcje ulepszania:</h3>
          {showUpgradeSettings()}
        </div>

        <SimulateUpgrade upgradeGoal={upgradeGoal} statesArray={statesArray} />
      </>
    );
  }
}

export default UpgradeSettings;
