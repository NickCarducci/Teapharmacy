import React from "react";
import Data from "./Data";
import { UAParser } from "ua-parser-js";
import "./styles.css";

class App extends React.Component {
  state = {};
  componentWillUnmount() {
    clearTimeout(this.resizeTimer);
    window.removeEventListener("resize", this.refresh);
  }
  refresh = (first) => {
    clearTimeout(this.longerTimeout);
    this.longerTimeout = setTimeout(() => {
      var parser = new UAParser();
      const name = parser.getBrowser().name;
      console.log(name);
      const ios = () =>
        name.includes("Safari") || navigator.userAgent.includes("iOS");
      const width = ios() ? window.screen.availWidth : window.innerWidth;
      if (first)
        this.setState({
          lastWidth: width
        });
      this.setState({
        ios: ios(),
        width,
        availableHeight: ios()
          ? window.screen.availHeight - 20
          : window.innerHeight
      });
    }, 2400);
  };
  componentDidMount = () => {
    this.refresh(true); //first
    window.addEventListener("resize", this.refresh);
  };

  render() {
    const { width } = this.state;
    return (
      <div style={{ width: "calc(100% - 20px)", padding: "10px" }}>
        Infection from human to human is a lie, there is no taxonomy for virus
        except bacteria and cell byproduct or mitosis of already-
        <a href="https://froth.app">infected-cells</a>
        <br />
        <br />
        If Ana Guttierez was a male would he be in jail?
        <br />
        <br />
        "America is the greatest country in the world," not saying much
        <br />
        <br />
        In nj they will kick you off jury duty if you are "against invoices as
        income" and make a deal to claim you were disobedient to get out of
        pharma cop jail (they still have my nugg)
        <br />
        <br />
        Mr Chris Magnus: “they were checking for illegal money, drugs &
        firearms.” “they were checking for illegal guns, money & drugs.”
        <br />
        <br />
        “A ‘psych’ test to payout depending on if the cause is one thing or the
        other,” is on insane grounds instead of logic and admission, or their
        hypocrisy. Major racketeering for conflict of interest, the
        diagnostician being paid by positive result, or the wrong field at
        least.
        <br />
        'Percocet adderal oxy cocaine heroine 40% fentanyl from chosen or all
        ports,' Derek maltz. It makes it “stronger,” 'any amount can kill'
        <br />
        Google numbers
        <br />
        Fentanyl death
        <br />
        <br />
        Convict intranet can filter detectives of those who do not have
        ingredient list and p2p reviews
        <br />
        Geohash/month can be reported by paytech from similarly investigated
        code that triggers truncated sales tax upon regular business
        <br />
        <br />
        fight good against evil," yeah that's it. 2week anon uuid for tranched
        broker trades with SEC backdoor and forced abstaination of votes per
        holdings for 13d {">"}5%
        <br />
        <br />
        Government's job is to save consumers from finite producer tyranny.
        Politics is the culmination of law and science. target margin networks
        and hung-jury-permits of science trust-building!
        <br />
        <br />
        {width && <Data width={width} />}
        <br />
        <br />
        <div
          style={{
            wordBreak: "break-all"
          }}
        >
          https://datacommons.org/tools/timeline#statsVar=RetailDrugDistribution_DrugDistribution_Amphetamine__RetailDrugDistribution_DrugDistribution_Oxymorphone__RetailDrugDistribution_DrugDistribution_PowderedOpium__RetailDrugDistribution_DrugDistribution_Morphine__RetailDrugDistribution_DrugDistribution_Oxycodone__RetailDrugDistribution_DrugDistribution_Methadone__RetailDrugDistribution_DrugDistribution_Fentanyl__RetailDrugDistribution_DrugDistribution_Codeine__RetailDrugDistribution_DrugDistribution_Cocaine__RetailDrugDistribution_DrugDistribution_Cannabicyclol&place=country%2FUSA
          <br />
          <br />
          https://deadiversion.usdoj.gov/
        </div>
      </div>
    );
  }
}
export default App;
