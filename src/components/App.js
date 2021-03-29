import "./App.css";
import React, { Component } from "react";
// import { bossData } from "./Data.js";
import "bootstrap/dist/css/bootstrap.css";
import ShowItems from "./ShowItems.js";
import UpgradeCosts from "./UpgradeCosts.js";
import UpgradeSettings from "./UpgradeSettings.js";

class App extends Component {
  state = {
    rank: 12,

    essenceRate: 25000,
    platinumRate: 16000,
    flaskRate: 70000,
    reolRate: 600000,
    dviggRate: 300000,
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

  render() {
    const {
      rank,
      essenceRate,
      platinumRate,
      flaskRate,
      reolRate,
      dviggRate,
    } = this.state;
    const { handleChange, handleInputChange } = this;

    return (
      <div>
        <label>
          Wybierz rangę itemu
          <select onChange={handleChange} value={rank} name="rank">
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
          handleInputChange={handleInputChange}
        />
        <UpgradeSettings
          rank={rank}
          essenceRate={essenceRate}
          platinumRate={platinumRate}
          flaskRate={flaskRate}
          reolRate={reolRate}
          dviggRate={dviggRate}
        />
      </div>
    );
  }
}

export default App;
