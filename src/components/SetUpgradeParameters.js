import React, { Component } from "react";
import { itemListByRank } from "./Data.js";
import SetUpgradeAdditionals from "./SetUpgradeAdditionals.js";

class SetUpgradeParameters extends Component {
  state = {};

  showUpgradeCosts = () => {
    const { itemList } = itemListByRank;
    const { rank } = this.props;
    const {
      essenceRate,
      platinumRate,
      flaskRate,
      reolRate,
      dviggRate,
      handleInputChange,
      durability,
    } = this.props;

    return itemList.map((itemList, index) => {
      if (itemList[0] === parseInt(rank)) {
        return (
          <div className="upgradeCosts" key={index}>
            <h5>Parametry ulepszania</h5>
            <ul>
              <li>Koszt zakręcenia: {itemList[2].upgradeCost / 1000}k</li>
              <li>
                Koszt inhibitora:{" "}
                {(itemList[2].inhibCost * platinumRate) / 1000}k (
                {itemList[2].inhibCost} platyny)
              </li>
              <li>
                Wartość platyny:{" "}
                <input
                  type="number"
                  name="platinumRate"
                  value={platinumRate}
                  onChange={handleInputChange}
                  step="500"
                />
              </li>
              <li>
                Koszt esencji:{" "}
                <input
                  type="number"
                  name="essenceRate"
                  value={essenceRate}
                  onChange={handleInputChange}
                  step="500"
                />
              </li>
              <li>
                Koszt flaszy ulepszeń:{" "}
                <input
                  type="number"
                  name="flaskRate"
                  value={flaskRate}
                  onChange={handleInputChange}
                  step="5000"
                />
                <span className="newLine">
                  {" "}
                  (wymagana {itemList[2].flask} flaszka)
                </span>
              </li>
              <li>
                Koszt reola:{" "}
                <input
                  type="number"
                  name="reolRate"
                  value={reolRate}
                  onChange={handleInputChange}
                  step="50000"
                />
              </li>
              <li>
                Koszt dvigga:{" "}
                <input
                  type="number"
                  name="dviggRate"
                  value={dviggRate}
                  onChange={handleInputChange}
                  step="50000"
                />
              </li>
              <li>
                Wytrzymałość:{" "}
                <input
                  type="number"
                  name="durability"
                  value={durability}
                  onChange={handleInputChange}
                  step="1"
                  min="35"
                  max={parseInt(rank) === 10 ? "60" : "50"}
                />
              </li>
            </ul>
          </div>
        );
      } else {
        return null;
      }
    });
  };

  showUpgradeSettings = () => {
    const {
      upgradeAdditionals,
      handleOptionStatesChange,
      upgradeGoal,
    } = this.props;

    let options = [];
    for (let i = 0; i < upgradeGoal; i++) {
      options.push(
        <SetUpgradeAdditionals
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
    const { showUpgradeCosts } = this;
    const { showUpgradeSettings } = this;
    const { upgradeGoal, handleUpgradeGoalChange } = this.props;

    return (
      <>
        <div className="upgradesCosts">{showUpgradeCosts()}</div>
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
      </>
    );
  }
}

export default SetUpgradeParameters;
