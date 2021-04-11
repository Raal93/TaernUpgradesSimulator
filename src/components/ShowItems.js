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
              {/* <img src={items.itemIcon} alt={items.itemName} /> */}
            </div>
          );
        });
      } else {
        return null;
      }
    });
  };

  render() {
    const { rank } = this.props;
    const { showItems } = this;

    return (
      <div className="items">
        <h4 className="title">Itemy rangi {rank}:</h4>
        {showItems()}
      </div>
    );
  }
}

export default ShowItems;
