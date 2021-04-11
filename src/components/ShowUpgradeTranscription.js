import React, { Component } from "react";

// Component is not in use currently

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
    // const { showTranscription } = this;

    return (
      <div className="simulateTranscripton">
        {/* <h5>Zapis ulepszania:</h5> */}
        {/* {showTranscription()} */}
      </div>
    );
  }
}

export default ShowUpgradeTranscription;
