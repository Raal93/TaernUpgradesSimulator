import "./App.css";
import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import ShowItems from "./ShowItems.js";
import SetUpgradeParameters from "./SetUpgradeParameters.js";
import { itemListByRank } from "./Data.js";
import SimulateUpgrade from "./SimulateUpgrade.js";

class App extends Component {
  state = {
    rank: 12,

    essenceRate: 25000,
    platinumRate: 16000,
    flaskRate: 70000,
    reolRate: 500000,
    dviggRate: 250000,
    inhibCost: -1,
    spinCost: -1,
    durability: 45,

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

  componentDidMount() {
    this.setInhibCost(this.state.rank);
    this.setSpinCost(this.state.rank);
  }

  setInhibCost = (rank) => {
    const { itemList } = itemListByRank;

    itemList.map((property) => {
      if (property[0] === parseInt(rank)) {
        this.setState({ inhibCost: property[2].inhibCost });
      }
      return null;
    });
  };

  setSpinCost = (rank) => {
    const { itemList } = itemListByRank;

    itemList.map((property) => {
      if (property[0] === parseInt(rank)) {
        this.setState({ spinCost: property[2].upgradeCost });
      }
      return null;
    });
  };

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSelectChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });

    this.setInhibCost(e.target.value);
    this.setSpinCost(e.target.value);
  };

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

  render() {
    const {
      rank,
      essenceRate,
      platinumRate,
      flaskRate,
      reolRate,
      dviggRate,
      inhibCost,
      spinCost,
      durability,
      upgradeAdditionals,
      upgradeGoal,
    } = this.state;
    const {
      handleSelectChange,
      handleInputChange,
      handleUpgradeGoalChange,
      handleOptionStatesChange,
    } = this;

    return (
      <div className="appContainer">
        <label className="rankSelectLabel">
          <span className="newLine">
            Wybierz rangę itemu, którego ulepszanie chcesz zasymulować:
          </span>
          <select
            className="rankSelect"
            onChange={handleSelectChange}
            value={rank}
            name="rank"
          >
            <option value="3">III</option>
            <option value="4">IV</option>
            <option value="5">V</option>
            <option value="6">VI</option>
            <option value="7">VII</option>
            <option value="8">VIII</option>
            <option value="9">IX</option>
            <option value="10">X</option>
            <option value="11">XI</option>
            <option value="12">XII</option>
          </select>
        </label>
        <ShowItems rank={rank} />
        <SetUpgradeParameters
          rank={rank}
          essenceRate={essenceRate}
          platinumRate={platinumRate}
          flaskRate={flaskRate}
          reolRate={reolRate}
          dviggRate={dviggRate}
          durability={durability}
          inhibCost={inhibCost}
          spinCost={spinCost}
          handleInputChange={handleInputChange}
          handleUpgradeGoalChange={handleUpgradeGoalChange}
          handleOptionStatesChange={handleOptionStatesChange}
          upgradeGoal={upgradeGoal}
          upgradeAdditionals={upgradeAdditionals}
        />
        <SimulateUpgrade
          upgradeGoal={upgradeGoal}
          upgradeAdditionals={upgradeAdditionals}
          essenceRate={essenceRate}
          platinumRate={platinumRate}
          flaskRate={flaskRate}
          reolRate={reolRate}
          dviggRate={dviggRate}
          durability={durability}
          inhibCost={inhibCost}
          spinCost={spinCost}
        />
      </div>
    );
  }
}

export default App;
