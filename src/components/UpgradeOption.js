import React, { Component } from "react";

class UpgradeOption extends Component {
  state = {};

  render() {
    const { upgradeStep, handleOptionStatesChange } = this.props;
    const { isEssenceAdded, isReolAdded, isDviggAdded } = this.props;
    // const { handleChange } = this;

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
              onChange={() => handleOptionStatesChange(upgradeStep, 0)}
              checked={isEssenceAdded}
              name="isEssenceAdded"
            />
          </li>
          <li>
            czy reol{" "}
            <input
              type="checkbox"
              onChange={() => handleOptionStatesChange(upgradeStep, 1)}
              checked={isReolAdded}
              name="isReolAdded"
            />
          </li>
          <li>
            czy dvigg{" "}
            <input
              type="checkbox"
              onChange={() => handleOptionStatesChange(upgradeStep, 2)}
              checked={isDviggAdded}
              name="isDviggAdded"
            />
          </li>
        </ul>
      </div>
    );
  }
}

export default UpgradeOption;
