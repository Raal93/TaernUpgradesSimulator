import "./App.css";
import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
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
      [true, false, false],
      [true, true, true],
      [true, true, true],
    ],
  };

  // [true, true, true],
  // [true, true, true],
  // [true, true, true],

  componentDidMount() {
    this.setInhibAndSpinCost(this.state.rank);
  }

  setInhibAndSpinCost = (rank) => {
    const { itemList } = itemListByRank;

    itemList.map((property) => {
      if (property[0] === parseInt(rank)) {
        this.setState({
          inhibCost: property[2].inhibCost,
          spinCost: property[2].upgradeCost,
        });
      }
      return null;
    });
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleItemRankChange = (e) => {
    const newRank = e.target.value;

    this.setState({
      [e.target.name]: newRank,
    });

    this.setInhibAndSpinCost(newRank);
  };

  handleUpgradeGoalChange = (e) => {
    const newUpgradeGoal = e.target.value;
    let upgradeAdditionals = [];

    for (let i = 0; i < newUpgradeGoal; i++) {
      upgradeAdditionals.push([
        i > 0 ? true : false,
        i > 5 ? true : false,
        i > 5 ? true : false,
      ]);
    }

    this.setState({
      upgradeAdditionals,
      [e.target.name]: newUpgradeGoal,
    });
  };

  handleUpgradeOptionChange = (upgradeStep, itemType) => {
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
      handleItemRankChange,
      handleChange,
      handleUpgradeGoalChange,
      handleUpgradeOptionChange,
    } = this;

    return (
      <div className="appContainer">
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
          handleChange={handleChange}
          handleUpgradeGoalChange={handleUpgradeGoalChange}
          handleUpgradeOptionChange={handleUpgradeOptionChange}
          handleItemRankChange={handleItemRankChange}
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
          isTranscriptionShown={false}
        />
      </div>
    );
  }
}

export default App;
