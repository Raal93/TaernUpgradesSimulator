import React, { Component } from "react";
import { itemListByRank } from "./Data.js";

class UpgradeCosts extends Component {
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
            <ul>
              <li>Koszt zakręcenia: {itemList[2].upgradeCost}</li>
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
                <span> (wymagana {itemList[2].flask} flaszka)</span>
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

  render() {
    const { showUpgradeCosts } = this;

    return <div className="upgradesCosts">{showUpgradeCosts()}</div>;
  }
}

export default UpgradeCosts;
