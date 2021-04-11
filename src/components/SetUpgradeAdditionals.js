import React, { Component } from "react";

class SetUpgradeAdditionals extends Component {
  state = {};

  render() {
    const { upgradeStep, handleUpgradeOptionChange } = this.props;
    const { isEssenceAdded, isReolAdded, isDviggAdded } = this.props;

    return (
      <div className="upgradeOption">
        Ulepszanie na: <strong>+{upgradeStep + 1}</strong>:{" "}
        <span className="upgradeOption__small">
          (przedmiot aktualnie ulepszony na +{upgradeStep})
        </span>
        <ul>
          <li>
            czy esencja{" "}
            <input
              type="checkbox"
              onChange={() => handleUpgradeOptionChange(upgradeStep, 0)}
              checked={isEssenceAdded}
              name="isEssenceAdded"
            />
          </li>
          <li>
            czy reol{" "}
            <input
              type="checkbox"
              onChange={() => handleUpgradeOptionChange(upgradeStep, 1)}
              checked={isReolAdded}
              name="isReolAdded"
            />
          </li>
          <li>
            czy dvigg{" "}
            <input
              type="checkbox"
              onChange={() => handleUpgradeOptionChange(upgradeStep, 2)}
              checked={isDviggAdded}
              name="isDviggAdded"
            />
          </li>
        </ul>
      </div>
    );
  }
}

export default SetUpgradeAdditionals;
