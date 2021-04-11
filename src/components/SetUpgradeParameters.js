import React, { Component } from "react";
import { itemListByRank } from "./Data.js";
import SetUpgradeAdditionals from "./SetUpgradeAdditionals.js";
import ShowItems from "./ShowItems.js";

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
      handleChange,
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
                  onChange={handleChange}
                  step="500"
                />
              </li>
              <li>
                Koszt esencji:{" "}
                <input
                  type="number"
                  name="essenceRate"
                  value={essenceRate}
                  onChange={handleChange}
                  step="500"
                />
              </li>
              <li>
                Koszt flaszy ulepszeń:{" "}
                <input
                  type="number"
                  name="flaskRate"
                  value={flaskRate}
                  onChange={handleChange}
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
                  onChange={handleChange}
                  step="50000"
                />
              </li>
              <li>
                Koszt dvigga:{" "}
                <input
                  type="number"
                  name="dviggRate"
                  value={dviggRate}
                  onChange={handleChange}
                  step="50000"
                />
              </li>
              <li>
                Wytrzymałość:{" "}
                <input
                  type="number"
                  name="durability"
                  value={durability}
                  onChange={handleChange}
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
      handleUpgradeOptionChange,
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
          handleUpgradeOptionChange={handleUpgradeOptionChange}
        />
      );
    }
    return <div className="upgradeOptionsContainer">{options}</div>;
  };

  render() {
    const { showUpgradeCosts } = this;
    const { showUpgradeSettings } = this;
    const {
      upgradeGoal,
      handleUpgradeGoalChange,
      handleItemRankChange,
      rank,
    } = this.props;

    return (
      <>
        <label className="rankSelectLabel">
          <span className="newLine">
            Wybierz rangę itemu, którego ulepszanie chcesz zasymulować:
          </span>
          <select
            className="rankSelect"
            onChange={handleItemRankChange}
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
