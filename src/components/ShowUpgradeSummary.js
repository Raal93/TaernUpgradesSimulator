import React, { Component } from "react";

class ShowUpgradeSummary extends Component {
  state = {
    indexOfMaxSpinsProccess: 0,
    indexOfMinSpinsProccess: 0,
  };
  calcAverageAmount = (x) => {
    const upgradeSimulationsAmount = this.props.allSimulationsData.length;

    return Math.round((x / upgradeSimulationsAmount) * 100) / 100;
  };

  calcAverageCost = (x, z) => {
    const upgradeSimulationsAmount = this.props.allSimulationsData.length;

    return Math.round(((x / upgradeSimulationsAmount) * z) / 10000) / 100;
  };

  calcAverageUpgradeCost = (averages) => {
    const {
      essenceRate,
      platinumRate,
      flaskRate,
      reolRate,
      dviggRate,
      inhibCost,
      spinCost,
    } = this.props;

    const {
      averageSpinAmount,
      averageInhibAmount,
      averageFlaskAmount,
      averageEssenceAmount,
      averageReolAmount,
      averageDviggAmount,
    } = averages;

    return (
      Math.round(
        (averageSpinAmount * spinCost +
          averageInhibAmount * inhibCost * platinumRate +
          averageFlaskAmount * flaskRate +
          averageEssenceAmount * essenceRate +
          averageReolAmount * reolRate +
          averageDviggAmount * dviggRate) /
          10000
      ) / 100
    );
  };

  calcTotals = () => {
    const { allSimulationsData } = this.props;

    let spinsAmountTotal = 0;
    let essencesAmountTotal = 0;
    let reolAmountTotal = 0;
    let dviggAmountTotal = 0;

    let essencesAmountPerSingleProccess = 0;
    let reolAmountPerSingleProccess = 0;
    let dviggAmountPerSingleProccess = 0;

    let maxSpinsPerSingleProccess = 0;
    let indexOfMaxSpinsProccess;

    let minSpinsPerSingleProccess = 999999;
    let indexOfMinSpinsProccess;

    allSimulationsData.map((singleSimulationProccess, index) => {
      singleSimulationProccess.map((singleSpin) => {
        essencesAmountPerSingleProccess += singleSpin[0] ? 1 : 0;
        reolAmountPerSingleProccess += singleSpin[1] ? 1 : 0;
        dviggAmountPerSingleProccess += singleSpin[2] ? 1 : 0;
        return null;
      });

      spinsAmountTotal += singleSimulationProccess.length;

      if (singleSimulationProccess.length > maxSpinsPerSingleProccess) {
        maxSpinsPerSingleProccess = singleSimulationProccess.length;
        indexOfMaxSpinsProccess = index;
        // console.log(maxSpinsPerSingleProccess);
        // console.log(indexOfMaxSpinsProccess);
      }

      if (singleSimulationProccess.length < minSpinsPerSingleProccess) {
        minSpinsPerSingleProccess = singleSimulationProccess.length;
        indexOfMinSpinsProccess = index;
        // console.log(minSpinsPerSingleProccess);
        // console.log(indexOfMinSpinsProccess);
      }

      essencesAmountTotal += essencesAmountPerSingleProccess;
      essencesAmountPerSingleProccess = 0;

      reolAmountTotal += reolAmountPerSingleProccess;
      reolAmountPerSingleProccess = 0;

      dviggAmountTotal += dviggAmountPerSingleProccess;
      dviggAmountPerSingleProccess = 0;

      return null;
    });

    return {
      spinsAmountTotal: spinsAmountTotal,
      essencesAmountTotal: essencesAmountTotal,
      reolAmountTotal: reolAmountTotal,
      dviggAmountTotal: dviggAmountTotal,
      indexOfMaxSpinsProccess: indexOfMaxSpinsProccess,
      indexOfMinSpinsProccess: indexOfMinSpinsProccess,
    };
  };

  calcAverages = () => {
    const { calcAverageAmount, calcAverageCost } = this;
    const {
      essenceRate,
      platinumRate,
      flaskRate,
      reolRate,
      dviggRate,
      inhibCost,
      spinCost,
    } = this.props;

    const totals = this.calcTotals();
    const {
      spinsAmountTotal,
      essencesAmountTotal,
      reolAmountTotal,
      dviggAmountTotal,
    } = totals;
    const inhibCostGold = inhibCost * platinumRate;

    return {
      averageSpinAmount: calcAverageAmount(spinsAmountTotal),
      averageInhibAmount: calcAverageAmount(spinsAmountTotal),
      averageFlaskAmount: calcAverageAmount(spinsAmountTotal),
      averageEssenceAmount: calcAverageAmount(essencesAmountTotal),
      averageReolAmount: calcAverageAmount(reolAmountTotal),
      averageDviggAmount: calcAverageAmount(dviggAmountTotal),

      averageSpinCost: calcAverageCost(spinsAmountTotal, spinCost),
      averageInhibCost: calcAverageCost(spinsAmountTotal, inhibCostGold),
      averageFlaskCost: calcAverageCost(spinsAmountTotal, flaskRate),
      averageEssenceCost: calcAverageCost(essencesAmountTotal, essenceRate),
      averageReolCost: calcAverageCost(reolAmountTotal, reolRate),
      averageDviggCost: calcAverageCost(dviggAmountTotal, dviggRate),
    };
  };

  showSummary = () => {
    const { calcAverageUpgradeCost } = this;
    const { allSimulationsData } = this.props;

    const upgradeSimulationsAmount = this.props.allSimulationsData.length;
    const averages = this.calcAverages();
    const {
      averageSpinAmount,
      averageInhibAmount,
      averageFlaskAmount,
      averageEssenceAmount,
      averageReolAmount,
      averageDviggAmount,
      averageSpinCost,
      averageInhibCost,
      averageFlaskCost,
      averageEssenceCost,
      averageReolCost,
      averageDviggCost,
    } = averages;

    const totals = this.calcTotals();
    const {
      spinsAmountTotal,
      essencesAmountTotal,
      reolAmountTotal,
      dviggAmountTotal,
      indexOfMaxSpinsProccess,
      indexOfMinSpinsProccess,
    } = totals;

    return (
      <>
        <h5>Podsumowanie</h5>
        <ul>
          <li>Wykonano {upgradeSimulationsAmount} procesów ulepszania.</li>
          <li>Zasymulowano {spinsAmountTotal} zakręceń zegara</li>
          <li>
            Użyto:
            <ul>
              <li>{spinsAmountTotal} inhibitorów,</li>
              <li>{spinsAmountTotal} flasz,</li>
              <li>{essencesAmountTotal} esencji,</li>
              <li>{reolAmountTotal} reoli,</li>
              <li>{dviggAmountTotal} dviggów.</li>
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
                {averageFlaskAmount} flasz ({averageFlaskCost}
                kk)
              </li>
              <li>
                {averageEssenceAmount} esencji ({averageEssenceCost}kk)
              </li>
              <li>
                {averageReolAmount} reoli ({averageReolCost}
                kk)
              </li>
              <li>
                {averageDviggAmount} dviggów ({averageDviggCost}kk)
              </li>
            </ul>
          </li>
          {/* <li>
            Średni koszt ulepszenia wyniósł: {calcAverageUpgradeCost(averages)}
            kk
          </li>
          <li>
            Najbardziej pechowe ulepszenie wyniosło:
            <SingleSimulationProccessData
              curentSimulationProccess={
                allSimulationsData[indexOfMaxSpinsProccess]
              }
            />
          </li>
          <li>
            Najszczęśliwsze ulepszenie wyniosło:
            <SingleSimulationProccessData
              curentSimulationProccess={
                allSimulationsData[indexOfMinSpinsProccess]
              }
            />
          </li> */}
        </ul>
      </>
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

export default ShowUpgradeSummary;

class SingleSimulationProccessData extends Component {
  calcSum = (curentSimulationProccess, item) => {
    let itemCounter = 0;

    curentSimulationProccess.map((singleSpin) => {
      itemCounter += singleSpin[item] ? 1 : 0;
      return null;
    });

    return itemCounter;
  };

  render() {
    const { curentSimulationProccess } = this.props;
    const { calcSum } = this;

    return (
      <ul>
        <li>{curentSimulationProccess.length} zakręceń</li>
        <li>{curentSimulationProccess.length} inhibitorów</li>
        <li>{curentSimulationProccess.length} flasz</li>
        <li>{calcSum(curentSimulationProccess, 0)} esencji</li>
        <li>{calcSum(curentSimulationProccess, 1)} reoli</li>
        <li>{calcSum(curentSimulationProccess, 2)} dviggów</li>
      </ul>
    );
  }
}
