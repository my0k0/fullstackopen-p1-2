import { useState } from "react";
import Header from './Header';
import Button from './Button';
import Part from './Part';

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const average = (good, neutral, bad) => {
    const total = good + neutral + bad;
    const avgGood = good;
    const avgNeu = neutral * 0;
    const avgBad = -1 * bad;

    return total ? ((avgGood + avgNeu + avgBad) / total).toFixed(1) : 0;
  }

  const positiveAvg = (good, total) => {
    return total ? (good / (good + neutral + bad) * 100).toFixed(1) + ' %' : 0;
  }

  const statistics = () => {
    return [
      {text: "good", value: good},
      {text: "neutral", value: neutral},
      {text: "bad", value: bad},
      {text: "all", value: good + neutral + bad},
      {text: "average", value: average(good, neutral, bad)},
      {text: "positive", value: positiveAvg(good, (good + neutral + bad))}
    ];
  }

  return (<div>
    <Header header="give feedback"></Header>
    <Button label="good" handler={() => setGood(good + 1)} />
    <Button label="neutral" handler={() => setNeutral(neutral + 1)} />
    <Button label="bad" handler={() => setBad(bad + 1)} />
    <Header header="statistics" />
    <Part statistics={statistics()} />
  </div>)
}

export default App;