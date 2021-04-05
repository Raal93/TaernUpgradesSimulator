import "./App.css";
import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import ShowItems from "./ShowItems.js";
import UpgradeCosts from "./UpgradeCosts.js";
import UpgradeSettings from "./UpgradeSettings.js";
import { itemListByRank } from "./Data.js";

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
  };

  componentDidMount() {
    this.setInhibCost(this.state.rank);
    this.setSpinCost(this.state.rank);
  }

  setInhibCost = (rank) => {
    // const { rank } = this.state;
    const { itemList } = itemListByRank;

    itemList.map((property) => {
      if (property[0] === parseInt(rank)) {
        this.setState({ inhibCost: property[2].inhibCost });
      }
      return null;
    });
  };

  setSpinCost = (rank) => {
    // const { rank } = this.state;
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
    } = this.state;
    const { handleSelectChange, handleInputChange } = this;

    return (
      <div>
        <label>
          Wybierz rangę itemu
          <select onChange={handleSelectChange} value={rank} name="rank">
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
        <UpgradeCosts
          rank={rank}
          essenceRate={essenceRate}
          platinumRate={platinumRate}
          flaskRate={flaskRate}
          reolRate={reolRate}
          dviggRate={dviggRate}
          durability={durability}
          handleInputChange={handleInputChange}
        />
        <UpgradeSettings
          rank={rank}
          essenceRate={essenceRate}
          platinumRate={platinumRate}
          flaskRate={flaskRate}
          reolRate={reolRate}
          dviggRate={dviggRate}
          inhibCost={inhibCost}
          spinCost={spinCost}
          durability={durability}
        />
      </div>
    );
  }
}

export default App;
