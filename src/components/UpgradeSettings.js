import React, { Component } from "react";
import UpgradeOption from "./UpgradeOption.js";
import SimulateUpgrade from "./SimulateUpgrade.js";

class UpgradeSettings extends Component {
  state = {
    upgradeGoal: 8,
    upgradeAdditionals: [
      [false, false, false],
      [true, false, false],
      [true, false, false],
      [true, false, false],
      [true, false, false],
      [true, true, true],
      [true, true, true],
      [true, true, true],
    ],
  };

  // [true, true, true],
  // [true, true, true],
  // [true, true, true],

  handleUpgradeGoalChange = (e) => {
    let upgradeAdditionals = [];
    for (let i = 0; i < e.target.value; i++) {
      upgradeAdditionals.push([
        i > 0 ? true : false,
        i > 4 ? true : false,
        i > 4 ? true : false,
      ]);
    }

    this.setState({
      upgradeAdditionals,
      [e.target.name]: e.target.value,
    });
  };

  handleOptionStatesChange = (upgradeStep, itemType) => {
    let upgradeAdditionals = this.state.upgradeAdditionals;

    upgradeAdditionals = upgradeAdditionals.map((upgradeOption, index) => {
      if (index === upgradeStep) {
        upgradeOption[itemType] = !upgradeOption[itemType];
        return upgradeOption;
      } else {
        return upgradeOption;
      }
    });

    this.setState({
      upgradeAdditionals,
    });
  };

  showUpgradeSettings = () => {
    const { upgradeAdditionals } = this.state;
    const { handleOptionStatesChange } = this;

    let options = [];
    for (let i = 0; i < this.state.upgradeGoal; i++) {
      options.push(
        <UpgradeOption
          upgradeStep={i}
          key={i}
          isEssenceAdded={upgradeAdditionals[i][0]}
          isReolAdded={upgradeAdditionals[i][1]}
          isDviggAdded={upgradeAdditionals[i][2]}
          handleOptionStatesChange={handleOptionStatesChange}
        />
      );
    }
    return <div className="upgradeOptionsContainer">{options}</div>;
  };

  render() {
    const { showUpgradeSettings, handleUpgradeGoalChange } = this;
    const { upgradeGoal, upgradeAdditionals } = this.state;

    return (
      <>
        <div className="upgradeSettings">
          <div className="upgradeGoal">
            <span>Cel ulepszania:</span>
            <input
              type="number"
              name="upgradeGoal"
              value={upgradeGoal}
              onChange={handleUpgradeGoalChange}
              min="1"
              max="20"
            />
          </div>
          <h4>Opcje ulepszania:</h4>
          {showUpgradeSettings()}
        </div>

        <SimulateUpgrade
          upgradeGoal={upgradeGoal}
          upgradeAdditionals={upgradeAdditionals}
          {...this.props}
        />
      </>
    );
  }
}

export default UpgradeSettings;
