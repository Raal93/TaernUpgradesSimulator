import React, { Component } from "react";
import UpgradeOption from "./UpgradeOption.js";

class UpgradeSettings extends Component {
  state = {
    upgradeGoal: 4,
    statesArray: [
      [true, true, true],
      [true, true, true],
      [true, true, true],
      [true, true, true],
    ],
  };

  componentDidMount() {
    // let statesArray = [
    //   [true, true, true],
    //   [true, true, true],
    //   [true, true, true],
    //   [true, true, true],
    // ];
    // this.setState({
    //   statesArray,
    // });
  }

  handleOptionStatesChange = (upgradeStep, itemType) => {
    let statesArray = this.state.statesArray;

    statesArray.map((upgradeOption, index) => {
      if (index === upgradeStep) {
        upgradeOption[itemType] = !upgradeOption[itemType];
      }
    });

    // console.log(statesArray);
    console.log(statesArray[1][0]);

    this.setState({
      statesArray,
    });
  };

  showUpgradeSettings = () => {
    const { statesArray } = this.state;

    let options = [];
    for (let i = 0; i < this.state.upgradeGoal; i++) {
      options.push(
        <UpgradeOption
          upgradeStep={i}
          key={i}
          isEssenceAdded={statesArray[i][0]}
          isReolAdded={statesArray[i][1]}
          isAdded={statesArray[i][2]}
          handleOptionStatesChange={this.handleOptionStatesChange}
        />
      );
    }
    return options;
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const { showUpgradeSettings, handleChange } = this;
    const { upgradeGoal } = this.state;

    return (
      <div className="upgradesSettings">
        <h5>Cel ulepszania:</h5>
        <input
          type="number"
          name="upgradeGoal"
          value={upgradeGoal}
          onChange={handleChange}
          min="1"
          max="20"
        />
        <h3>Opcje ulepszania:</h3>
        {showUpgradeSettings()}
      </div>
    );
  }
}

export default UpgradeSettings;
