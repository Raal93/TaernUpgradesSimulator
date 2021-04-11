import React, { Component } from "react";

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
                  // czy reol [1]
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

export default ShowUpgradeSummary;
