import React, { Component } from "react";

class UpgradeSettings extends Component {
  state = { upgradeGoal: 10 };

  showUpgradeSettings = () => {
    let options = [];
    for (let i = 0; i < this.state.upgradeGoal; i++) {
      options.push(<UpgradeOption upgradeStep={i} key={i} />);
    }
    return options;
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const { showUpgradeSettings, handleChange } = this;
    const { upgradeGoal } = this.state;

    return (
      <div className="upgradesSettings">
        <h5>Cel ulepszania:</h5>
        <input
          type="number"
          name="upgradeGoal"
          value={upgradeGoal}
          onChange={handleChange}
          min="1"
          max="20"
        />
        <h3>Opcje ulepszania:</h3>
        {showUpgradeSettings()}
      </div>
    );
  }
}

class UpgradeOption extends Component {
  state = {
    isEssenceAdded: true,
    isReolAdded: false,
    isDviggAdded: false,
  };

  componentDidMount() {
    this.setBasicOptions();
  }

  setBasicOptions = () => {
    const { upgradeStep } = this.props;

    let isEssenceAdded = upgradeStep > 0 ? true : false;
    let isReolAdded = upgradeStep > 5 ? true : false;
    let isDviggAdded = upgradeStep > 5 ? true : false;

    this.setState({
      isEssenceAdded,
      isReolAdded,
      isDviggAdded,
    });
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const { upgradeStep } = this.props;
    const { isEssenceAdded, isReolAdded, isDviggAdded } = this.state;
    const { handleChange } = this;

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
              onChange={handleChange}
              checked={isEssenceAdded}
              name="isEssenceAdded"
            />
          </li>
          <li>
            czy reol{" "}
            <input
              type="checkbox"
              onChange={handleChange}
              checked={isReolAdded}
              name="isReolAdded"
            />
          </li>
          <li>
            czy dvigg{" "}
            <input
              type="checkbox"
              onChange={handleChange}
              checked={isDviggAdded}
              name="isDviggAdded"
            />
          </li>
        </ul>
      </div>
    );
  }
}

export default UpgradeSettings;
