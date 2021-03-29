import React, { Component } from "react";
import { itemListByRank } from "./Data.js";

class ShowItems extends Component {
  showItems = () => {
    const { itemList } = itemListByRank;
    const { rank } = this.props;

    return itemList.map((itemList) => {
      if (itemList[0] === parseInt(rank)) {
        return itemList[1].map((items, index) => {
          return (
            <div className="items__item" key={index}>
              <img src={items.itemIcon} alt={items.itemName} />
            </div>
          );
        });
      } else {
        return null;
      }
    });
  };

  // showUpgradeCosts = () => {
  //   return <></>;
  // };

  render() {
    // const { rank } = this.props;
    // const { itemList } = itemListByRank;
    const { showItems } = this;

    return <div className="items">{showItems()}</div>;
  }
}

export default ShowItems;
