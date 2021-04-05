import React, { Component } from "react";
// import { itemListByRank } from "./Data.js";

class multipleSimulationsLoop extends Component {
  state = {
    // durability: 45, // tmp
    upgradeSimulationsAmount: 10000,
    upgradingProccessTranscription: [],

    isSummaryShown: false,
  };

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
        upgradeChance = upgradeAdditionals[0] ? 97 : 95;
        break;
      case 1:
        upgradeChance = upgradeAdditionals[0] ? 95 : 85;
        break;
      case 2:
        upgradeChance = upgradeAdditionals[0] ? 85 : 75;
        break;
      case 3:
        upgradeChance = upgradeAdditionals[0] ? 75 : 65;
        break;
      case 4:
        upgradeChance = upgradeAdditionals[0] ? 60 : 50;
        break;
      case 5:
        upgradeChance = upgradeAdditionals[0] ? 50 : 40;
        break;
      case 6:
        upgradeChance = upgradeAdditionals[0] ? 40 : 30;
        break;
      case 7:
        upgradeChance = upgradeAdditionals[0] ? 30 : 20;
        break;
      default:
        upgradeChance = upgradeAdditionals[0] ? 20 : 10;
        break;
    }
    return upgradeChance;
  };

  singleSimulationProccess = () => {
    let i = 0;
    let spinCounter = 0;
    let essenceCounter = 0;
    let reolCounter = 0;
    let dviggCounter = 0;
    let upgradingProccessTranscription = [];

    const { upgradeAdditionals } = this.props;
    const { durability } = this.props;
    const { calcUpgradeChance } = this;

    do {
      const { upgradeGoal } = this.props;

      let upgradeCondition = 100 - calcUpgradeChance(i);
      let megaUpgradeCondition = 100 - (upgradeAdditionals[i][2] ? 4 : 2);
      let withstandCondition =
        100 -
        (upgradeAdditionals[i][1]
          ? parseInt(durability) + 20
          : parseInt(durability));
      let drawIfUpgradeSucceed = this.getRandomPercent();
      spinCounter++;
      essenceCounter += upgradeAdditionals[i][0] ? 1 : 0;
      reolCounter += upgradeAdditionals[i][1] ? 1 : 0;
      dviggCounter += upgradeAdditionals[i][2] ? 1 : 0;

      let transcriptionArr = [
        upgradeAdditionals[i][0], // czy eska [0]
        upgradeAdditionals[i][1], // czy reaol [1]
        upgradeAdditionals[i][2], // czy dvigg [2]
        calcUpgradeChance(i), // szansa na ulepszenie [3]
        upgradeAdditionals[i][2] ? 4 : 2, // szansa na MEGA [4]
        upgradeAdditionals[i][1]
          ? parseInt(durability) + 20
          : parseInt(durability), // wytrzymalosc efektywna [5]
        drawIfUpgradeSucceed, // wylosowana wartosc [6]
        i, // ulepszenie przed spinem [7]
      ];

      if (drawIfUpgradeSucceed < upgradeCondition) {
        // ulepszenie nieudane
        let drawIfUpgradesResets = this.getRandomPercent();

        if (drawIfUpgradesResets < withstandCondition) {
          // wyzerowane
          i = 0;
          transcriptionArr.push(
            false, // info czy udane [8]
            false, // info czy sprzet wyrtrzymal [9] // info czy udane MEGA [9]
            drawIfUpgradesResets, // wylosowana wartosc czy srzet wytrzyma [10]
            i, // ulepszenie po spinie [11]
            i >= upgradeGoal // czy osiągnięty cel ulepszania [12]
          );
        } else {
          // sprzęt wytrzymał
          transcriptionArr.push(
            false, // info czy udane [8]
            true, // info czy sprzet wyrtrzymal [9] // info czy udane MEGA [9]
            drawIfUpgradesResets, // wylosowana wartosc czy srzet wytrzyma [10]
            i, // ulepszenie po spinie [11]
            i >= upgradeGoal // czy osiągnięty cel ulepszania [12]
          );
        }
      } else if (drawIfUpgradeSucceed < megaUpgradeCondition) {
        // udane zwykłe ulepszenie
        i++;
        transcriptionArr.push(
          true, // info czy udane [8]
          false, // info czy sprzet wyrtrzymal [9] // info czy udane MEGA [9]
          -1, // wylosowana wartosc czy srzet wytrzyma [10]
          i, // ulepszenie po spinie [11]
          i >= upgradeGoal // czy osiągnięty cel ulepszania [12]
        );
      } else if (drawIfUpgradeSucceed >= megaUpgradeCondition) {
        // udane mega ulepszenie
        i++;
        i++;
        transcriptionArr.push(
          true, // info czy udane [8]
          true, // info czy sprzet wyrtrzymal [9] // info czy udane MEGA [9]
          -1, // wylosowana wartosc czy srzet wytrzyma [10]
          i, // ulepszenie po spinie [11]
          i >= upgradeGoal // czy osiągnięty cel ulepszania [12]
        );
      }

      upgradingProccessTranscription.push(transcriptionArr);
    } while (i < this.props.upgradeGoal);
    return [
      spinCounter,
      essenceCounter,
      reolCounter,
      dviggCounter,
      upgradingProccessTranscription,
    ];
  };

  multipleSimulationsLoop = (event) => {
    const upgradeSimulationsTarget = event.target[0].value;
    event.preventDefault();
    const { singleSimulationProccess } = this;
    let upgradingProccessTranscription = [];

    let i = 0;
    do {
      const simulationResult = singleSimulationProccess();

      upgradingProccessTranscription.push(simulationResult[4]);
      i++;
    } while (i < upgradeSimulationsTarget);

    this.setState({
      upgradingProccessTranscription,
      isSummaryShown: true,
    });
  };
  render() {
    const { multipleSimulationsLoop, handleChange } = this;
    const { upgradeSimulationsAmount, isSummaryShown } = this.state;

    return (
      <>
        <div className="multipleSimulationsLoopContainer">
          <form onSubmit={(e) => multipleSimulationsLoop(e)}>
            <label>
              <span className="newLine">
                Wybierz ile symulacji ulepszania chcesz przeprowadzić (1
                symulacja to pełny proces ulepszania od +0 do wybranego celu
                ulepszenia)
              </span>
              <select
                onChange={handleChange}
                name="upgradeSimulationsAmount"
                value={upgradeSimulationsAmount}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="10">10</option>
                <option value="100">100</option>
                <option value="1000">1000</option>
                <option value="10000">10 000</option>
                <option value="100000">100 000 (uwaga)</option>
                {/* <option value="1000000">1 000 000 (uwaga!!!)</option> */}
              </select>
            </label>
            <div>
              <button className="doSimulationBtn">Przeprowadź symulacje</button>
            </div>
          </form>
        </div>
        <ShowUpgradeTranscription
          upgradingProccessTranscription={
            this.state.upgradingProccessTranscription
          }
        />
        <ShowUpgradeSummary
          upgradingProccessTranscription={
            this.state.upgradingProccessTranscription
          }
          isSummaryShown={isSummaryShown}
          {...this.props}
        />
      </>
    );
  }
}
// </div>

export default multipleSimulationsLoop;

class ShowUpgradeTranscription extends Component {
  resultMsg = (ifUpgradeSucceed, ifWithstoodOrMega) => {
    if (ifUpgradeSucceed && ifWithstoodOrMega) {
      return "Udane MEGA ulepszenie!";
    } else if (ifUpgradeSucceed && !ifWithstoodOrMega) {
      return "Ulepszenie udane.";
    } else if (!ifUpgradeSucceed && ifWithstoodOrMega) {
      return "Ulepszenie nieudane. Sprzęt wytrzymał proces.";
    } else if (!ifUpgradeSucceed && !ifWithstoodOrMega) {
      return "Ulepszenie nieudane. Ulepszenia zostały wyzerowane.";
    }
  };

  ifwithstoodMsg = (randIfWithstand, durability) => {
    return (
      <li>
        Losowanie czy sprzęt wytrzyma: {randIfWithstand}% (próg wytrzymania:{" "}
        {100 - durability}%
        {randIfWithstand < 100 - durability
          ? ", zabrakło " +
            Math.round((100 - durability - randIfWithstand) * 100) / 100 +
            "%"
          : null}
        ).
      </li>
    );
  };

  showTranscription = () => {
    const { upgradingProccessTranscription } = this.props;
    const { resultMsg, ifwithstoodMsg } = this;

    return upgradingProccessTranscription.map((item, index) => {
      return (
        <div className="upgradeProccess" key={index}>
          {item.map((item, index) => {
            return (
              <div className="singleSpin">
                {/* // czy eska [0]
                  // czy reaol [1]
                  // czy dvigg [2]
                  // szansa na ulepszenie [3]
                  // szansa na MEGA [4]
                  // wytrzymalosc efektywna [5]
                  // wylosowana wartosc [6]
                  // ulepszenie przed spinem [7]
                  // info czy udane [8]
                  // info czy sprzet wyrtrzymal [9] // info czy udane MEGA [9]
                  // wylosowana wartosc czy srzet wytrzyma [10]
                  // ulepszenie po spinie [11]
                   */}
                <ul>
                  <li>
                    Spin nr <strong>{index + 1}:</strong>
                  </li>
                  <li>
                    Ulepszenie przed próbą ulepszenia{" "}
                    <strong>+{item[7]}</strong>
                  </li>
                  <li>
                    Użyto: inhib, flaszka, {item[0] ? "esencja, " : ""}
                    {item[1] ? "reol, " : ""}
                    {item[2] ? "dvigg, " : ""}
                  </li>
                  <li>
                    Szansa na kolejne ulepszenie {item[3]}% (mega {item[4]}%)
                  </li>
                  <li>Wytrzymałość efektywna: {item[5]}% </li>
                  <li>
                    Losowanie czy ulepszy: {item[6]}% (próg wejscia:{" "}
                    {100 - item[3]}%, mega: {100 - item[4]}%
                    {item[6] < 100 - item[3]
                      ? ", zabrakło " +
                        Math.round((100 - item[3] - item[6]) * 100) / 100 +
                        "%)."
                      : ")."}
                  </li>
                  {item[8] ? null : ifwithstoodMsg(item[10], item[5])}
                  <li>
                    <strong>{resultMsg(item[8], item[9])}</strong>
                  </li>
                  <li>
                    <strong>
                      Aktualne ulepszenie: +{item[11]}
                      {item[12] ? ". Cel ulepszania osiągnięty." : null}
                    </strong>
                  </li>
                </ul>
              </div>
            );
          })}
        </div>
      );
    });
  };

  render() {
    const { showTranscription } = this;

    return (
      <div className="simulateTranscripton">
        {/* <h5>Zapis ulepszania:</h5> */}
        {/* {showTranscription()} */}
      </div>
    );
  }
}

class ShowUpgradeSummary extends Component {
  resultMsg = (ifUpgradeSucceed, ifWithstoodOrMega) => {
    if (ifUpgradeSucceed && ifWithstoodOrMega) {
      return "Udane MEGA ulepszenie!";
    } else if (ifUpgradeSucceed && !ifWithstoodOrMega) {
      return "Ulepszenie udane.";
    } else if (!ifUpgradeSucceed && ifWithstoodOrMega) {
      return "Ulepszenie nieudane. Sprzęt wytrzymał proces.";
    } else if (!ifUpgradeSucceed && !ifWithstoodOrMega) {
      return "Ulepszenie nieudane. Ulepszenia zostały wyzerowane.";
    }
  };

  ifwithstoodMsg = (randIfWithstand, durability) => {
    return (
      <li>
        Losowanie czy sprzęt wytrzyma: {randIfWithstand}% (próg wytrzymania:{" "}
        {100 - durability}%
        {randIfWithstand < 100 - durability
          ? ", zabrakło " +
            Math.round((100 - durability - randIfWithstand) * 100) / 100 +
            "%"
          : null}
        ).
      </li>
    );
  };

  showSpinTranscription = (item, index) => {
    const { ifwithstoodMsg, resultMsg } = this;

    return (
      <div className="singleSpin">
        {/* // czy eska [0]
                  // czy reaol [1]
                  // czy dvigg [2]
                  // szansa na ulepszenie [3]
                  // szansa na MEGA [4]
                  // wytrzymalosc efektywna [5]
                  // wylosowana wartosc [6]
                  // ulepszenie przed spinem [7]
                  // info czy udane [8]
                  // info czy sprzet wyrtrzymal [9] // info czy udane MEGA [9]
                  // wylosowana wartosc czy srzet wytrzyma [10]
                  // ulepszenie po spinie [11]
                   */}
        <ul>
          <li>
            Spin nr <strong>{index + 1}:</strong>
          </li>
          <li>
            Ulepszenie przed próbą ulepszenia <strong>+{item[7]}</strong>
          </li>
          <li>
            Użyto: inhib, flaszka, {item[0] ? "esencja, " : ""}
            {item[1] ? "reol, " : ""}
            {item[2] ? "dvigg, " : ""}
          </li>
          <li>
            Szansa na kolejne ulepszenie {item[3]}% (mega {item[4]}%)
          </li>
          <li>Wytrzymałość efektywna: {item[5]}% </li>
          <li>
            Losowanie czy ulepszy: {item[6]}% (próg wejscia: {100 - item[3]}%,
            mega: {100 - item[4]}%
            {item[6] < 100 - item[3]
              ? ", zabrakło " +
                Math.round((100 - item[3] - item[6]) * 100) / 100 +
                "%)."
              : ")."}
          </li>
          {item[8] ? null : ifwithstoodMsg(item[10], item[5])}
          <li>
            <strong>{resultMsg(item[8], item[9])}</strong>
          </li>
          <li>
            <strong>
              Aktualne ulepszenie: +{item[11]}
              {item[12] ? ". Cel ulepszania osiągnięty." : null}
            </strong>
          </li>
        </ul>
      </div>
    );
  };

  showSummary = () => {
    const {
      essenceRate,
      platinumRate,
      flaskRate,
      reolRate,
      dviggRate,
      inhibCost,
      spinCost,
    } = this.props;
    const { upgradingProccessTranscription } = this.props;
    // const { showSpinTranscription } = this;

    // console.log(upgradingProccessTranscription);

    let spinsPerSingleProccess = 0;
    let spinsAmountGlobal = 0;
    let essencesAmountPerSingleProccess = 0;
    let essencesAmountGlobal = 0;
    let reolAmountPerSingleProccess = 0;
    let reolAmountGlobal = 0;
    let dviggAmountPerSingleProccess = 0;
    let dviggAmountGlobal = 0;

    upgradingProccessTranscription.map((singleSimulationProccess) => {
      singleSimulationProccess.map((singleSpin, index) => {
        essencesAmountPerSingleProccess += singleSpin[0] ? 1 : 0;
        reolAmountPerSingleProccess += singleSpin[1] ? 1 : 0;
        dviggAmountPerSingleProccess += singleSpin[2] ? 1 : 0;
        // showSpinTranscription(singleSpin, index);
        return null;
      });
      spinsPerSingleProccess = singleSimulationProccess.length;
      spinsAmountGlobal += spinsPerSingleProccess;

      essencesAmountGlobal += essencesAmountPerSingleProccess;
      essencesAmountPerSingleProccess = 0;

      reolAmountGlobal += reolAmountPerSingleProccess;
      reolAmountPerSingleProccess = 0;

      dviggAmountGlobal += dviggAmountPerSingleProccess;
      dviggAmountPerSingleProccess = 0;

      return null;
    });
    let averageSpinAmount =
      Math.round(
        (spinsAmountGlobal / upgradingProccessTranscription.length) * 100
      ) / 100;
    let averageInhibAmount =
      Math.round(
        (spinsAmountGlobal / upgradingProccessTranscription.length) * 100
      ) / 100;
    let averageFlaskAmount =
      Math.round(
        (spinsAmountGlobal / upgradingProccessTranscription.length) * 100
      ) / 100;
    let averageEssenceAmount =
      Math.round(
        (essencesAmountGlobal / upgradingProccessTranscription.length) * 100
      ) / 100;
    let averageReolAmount =
      Math.round(
        (reolAmountGlobal / upgradingProccessTranscription.length) * 100
      ) / 100;
    let averageDviggAmount =
      Math.round(
        (dviggAmountGlobal / upgradingProccessTranscription.length) * 100
      ) / 100;

    let averageSpinCost =
      Math.round(
        ((spinsAmountGlobal / upgradingProccessTranscription.length) *
          spinCost) /
          10000
      ) / 100;
    let averageInhibCost =
      Math.round(
        ((spinsAmountGlobal / upgradingProccessTranscription.length) *
          inhibCost *
          platinumRate) /
          10000
      ) / 100;
    let averageFlaskCost =
      Math.round(
        ((spinsAmountGlobal / upgradingProccessTranscription.length) *
          flaskRate) /
          10000
      ) / 100;
    let averageEssenceCost =
      Math.round(
        ((essencesAmountGlobal / upgradingProccessTranscription.length) *
          essenceRate) /
          10000
      ) / 100;
    let averageReolCost =
      Math.round(
        ((reolAmountGlobal / upgradingProccessTranscription.length) *
          reolRate) /
          10000
      ) / 100;
    let averageDviggCost =
      Math.round(
        ((dviggAmountGlobal / upgradingProccessTranscription.length) *
          dviggRate) /
          10000
      ) / 100;

    return (
      <div className="summary">
        <h5>Podsumowanie</h5>
        <ul>
          <li>
            Wykonano {upgradingProccessTranscription.length} procesów
            ulepszania.
          </li>
          <li>Zasymulowano {spinsAmountGlobal} zakręceń zegara</li>
          <li>
            Użyto:
            <ul>
              <li>{spinsAmountGlobal} inhibitorów,</li>
              <li>{spinsAmountGlobal} flasz,</li>
              <li>{essencesAmountGlobal} esencji,</li>
              <li>{reolAmountGlobal} reoli,</li>
              <li>{dviggAmountGlobal} dviggów.</li>
            </ul>
          </li>
          <li>
            Średnio na pełne ulepszenie:
            <ul>
              <li>
                {averageSpinAmount} zakręceń ({averageSpinCost}kk)
              </li>
              <li>
                {averageInhibAmount} inhibitorów ({averageInhibCost}kk)
              </li>
              <li>
                {averageFlaskAmount} flasz ({averageFlaskCost}kk)
              </li>
              <li>
                {averageEssenceAmount} esencji ({averageEssenceCost}kk)
              </li>
              <li>
                {averageReolAmount} reoli ({averageReolCost}kk)
              </li>
              <li>
                {averageDviggAmount} dviggów ({averageDviggCost}kk)
              </li>
            </ul>
          </li>
          <li>
            Średni koszt ulepszenia wyniósł:{" "}
            {Math.round(
              (averageSpinAmount * spinCost +
                averageInhibAmount * inhibCost * platinumRate +
                averageFlaskAmount * flaskRate +
                averageEssenceAmount * essenceRate +
                averageReolAmount * reolRate +
                averageDviggAmount * dviggRate) /
                10000
            ) / 100}
            kk
          </li>
        </ul>
      </div>
    );
  };

  render() {
    const { showSummary } = this;
    const { isSummaryShown } = this.props;
    return (
      <>
        {isSummaryShown ? (
          <div className="upgradeSummary">{showSummary()}</div>
        ) : null}
      </>
    );
  }
}
