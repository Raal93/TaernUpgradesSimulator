import React, { Component } from "react";
import ShowUpgradeSummary from "./ShowUpgradeSummary.js";

class multipleSimulationsLoop extends Component {
  state = {
    upgradeSimulationsAmount: 1000,
    allSimulationsData: [],

    isSummaryShown: false,
  };

  componentWillReceiveProps(props) {
    this.setState({
      isSummaryShown: props.isSummaryShown,
    });
  }

  getRandomPercent() {
    let rand;
    do {
      rand = Math.round(Math.random() * 10000) / 100;
    } while (rand === 0);
    // avoiding 0.00 as a result

    // if (rand > 99.99 || rand < 0.01) {
    //   console.log(rand);
    // }

    return rand;
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  calcUpgradeChance = (i) => {
    const { upgradeAdditionals } = this.props;
    let upgradeChance = 0;

    switch (i) {
      case 0:
        upgradeChance = upgradeAdditionals[i][0] ? 97 : 95;
        break;
      case 1:
        upgradeChance = upgradeAdditionals[i][0] ? 95 : 85;
        break;
      case 2:
        upgradeChance = upgradeAdditionals[i][0] ? 85 : 75;
        break;
      case 3:
        upgradeChance = upgradeAdditionals[i][0] ? 75 : 65;
        break;
      case 4:
        upgradeChance = upgradeAdditionals[i][0] ? 60 : 50;
        break;
      case 5:
        upgradeChance = upgradeAdditionals[i][0] ? 50 : 40;
        break;
      case 6:
        upgradeChance = upgradeAdditionals[i][0] ? 40 : 30;
        break;
      case 7:
        upgradeChance = upgradeAdditionals[i][0] ? 30 : 20;
        break;
      default:
        upgradeChance = upgradeAdditionals[i][0] ? 20 : 10;
        break;
    }
    return upgradeChance;
  };

  isUpgradeGoalAcheved = (upgradeLevel, upgradeGoal) => {
    return upgradeLevel >= upgradeGoal;
  };

  singleSimulationProccess = () => {
    let upgradeLevel = 0;
    let upgradeProccessData = [];

    const { upgradeAdditionals } = this.props;
    const { durability } = this.props;
    const { calcUpgradeChance, isUpgradeGoalAcheved } = this;

    do {
      const { upgradeGoal } = this.props;

      const ifEssence = upgradeAdditionals[upgradeLevel][0];
      const ifReol = upgradeAdditionals[upgradeLevel][1];
      const ifDvigg = upgradeAdditionals[upgradeLevel][2];
      const durabilityInProccess = ifReol
        ? parseInt(durability) + 20
        : parseInt(durability);
      const upgradeChance = calcUpgradeChance(upgradeLevel);
      const megaUpgradeChance = ifDvigg ? 4 : 2;
      const upgradeCondition = 100 - upgradeChance;
      const megaUpgradeCondition = 100 - megaUpgradeChance;
      const withstandCondition = 100 - durabilityInProccess;

      const drawIfUpgradeSucceed = this.getRandomPercent();

      let singleSpinData = [
        ifEssence, // czy eska [0]
        ifReol, // czy reol [1]
        ifDvigg, // czy dvigg [2]
        upgradeChance, // szansa na ulepszenie [3]
        megaUpgradeChance, // szansa na MEGA [4]
        durabilityInProccess, // wytrzymalosc efektywna [5]
        drawIfUpgradeSucceed, // wylosowana wartosc [6]
        upgradeLevel, // ulepszenie przed spinem [7]
      ];

      if (drawIfUpgradeSucceed < upgradeCondition) {
        // ulepszenie nieudane
        let drawIfUpgradesResets = this.getRandomPercent();

        if (drawIfUpgradesResets < withstandCondition) {
          // wyzerowane
          upgradeLevel = 0;

          singleSpinData.push(
            false, // info czy udane [8]
            false, // info czy sprzet wyrtrzymal [9] // info czy udane MEGA [9]
            drawIfUpgradesResets, // wylosowana wartosc czy srzet wytrzyma [10]
            upgradeLevel, // ulepszenie po spinie [11]
            isUpgradeGoalAcheved(upgradeLevel, upgradeGoal) // czy osiągnięty cel ulepszania [12]
          );
        } else {
          // sprzęt wytrzymał
          singleSpinData.push(
            false, // info czy udane [8]
            true, // info czy sprzet wyrtrzymal [9] // info czy udane MEGA [9]
            drawIfUpgradesResets, // wylosowana wartosc czy srzet wytrzyma [10]
            upgradeLevel, // ulepszenie po spinie [11]
            isUpgradeGoalAcheved(upgradeLevel, upgradeGoal) // czy osiągnięty cel ulepszania [12]
          );
        }
      } else if (drawIfUpgradeSucceed < megaUpgradeCondition) {
        // udane zwykłe ulepszenie
        upgradeLevel++;
        singleSpinData.push(
          true, // info czy udane [8]
          false, // info czy sprzet wyrtrzymal [9] // info czy udane MEGA [9]
          -1, // wylosowana wartosc czy srzet wytrzyma [10]
          upgradeLevel, // ulepszenie po spinie [11]
          isUpgradeGoalAcheved(upgradeLevel, upgradeGoal) // czy osiągnięty cel ulepszania [12]
        );
      } else if (drawIfUpgradeSucceed >= megaUpgradeCondition) {
        // udane mega ulepszenie
        upgradeLevel++;
        upgradeLevel++;
        singleSpinData.push(
          true, // info czy udane [8]
          true, // info czy sprzet wyrtrzymal [9] // info czy udane MEGA [9]
          -1, // wylosowana wartosc czy srzet wytrzyma [10]
          upgradeLevel, // ulepszenie po spinie [11]
          isUpgradeGoalAcheved(upgradeLevel, upgradeGoal) // czy osiągnięty cel ulepszania [12]
        );
      }

      upgradeProccessData.push(singleSpinData);
    } while (upgradeLevel < this.props.upgradeGoal);
    return upgradeProccessData;
  };

  multipleSimulationsLoop = (e) => {
    e.preventDefault();

    const upgradeSimulationsTarget = e.target[0].value;
    const { singleSimulationProccess } = this;
    let allSimulationsData = [];

    for (let i = 0; i < upgradeSimulationsTarget; i++) {
      allSimulationsData.push(singleSimulationProccess());
    }

    this.setState({
      allSimulationsData,
      isSummaryShown: true,
    });
  };

  render() {
    const { multipleSimulationsLoop, handleChange } = this;
    const {
      upgradeSimulationsAmount,
      isSummaryShown,
      allSimulationsData,
    } = this.state;

    return (
      <>
        <div className="multipleSimulationsLoopContainer">
          <SimulationForm
            handleChange={handleChange}
            upgradeSimulationsAmount={upgradeSimulationsAmount}
            multipleSimulationsLoop={multipleSimulationsLoop}
          />
        </div>
        <div className="showUpgradeSummaryContainer">
          <ShowUpgradeSummary
            allSimulationsData={allSimulationsData}
            isSummaryShown={isSummaryShown}
            isTranscriptionShown={false}
            {...this.props}
          />
        </div>
      </>
    );
  }
}
class SimulationForm extends Component {
  render() {
    const {
      handleChange,
      upgradeSimulationsAmount,
      multipleSimulationsLoop,
    } = this.props;

    return (
      <form onSubmit={(e) => multipleSimulationsLoop(e)}>
        <label>
          <span className="newLine">
            Wybierz ile symulacji ulepszania chcesz przeprowadzić (1 symulacja
            to pełny proces ulepszania od +0 do wybranego celu ulepszenia)
          </span>
          <select
            onChange={handleChange}
            name="upgradeSimulationsAmount"
            value={upgradeSimulationsAmount}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="100">100</option>
            <option value="1000">1000</option>
            <option value="10000">10 000</option>
            {/* <option value="100000">100 000 (uwaga)</option> */}
            {/* <option value="1000000">1 000 000 (uwaga!!!)</option> */}
          </select>
        </label>
        <div>
          <button className="doSimulationBtn">Przeprowadź symulacje</button>
        </div>
      </form>
    );
  }
}

export default multipleSimulationsLoop;
