import { useState } from "react";
import Button from './Button';

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  
  const [selected, setSelected] = useState(0)
  const [voteCount, setVoteCount] = useState({0:0,1:0,2:0,3:0,4:0,5:0,6:0,7:0})
  const [mostArt, setMostArt] = useState('');

  const generateRandom = () => {
    const rand = Math.floor(Math.random() * anecdotes.length);
    setSelected(rand);
  }

  const vote = () => {
    const copy = {...voteCount}
    copy[selected] = copy[selected] ? copy[selected] + 1 : 1;
    setVoteCount(copy);

    const max = Object.entries(voteCount).reduce((maxIndex, [currentIndex, currentValue], _, array) => {
      if (currentValue > array[maxIndex][1])
        return parseInt(currentIndex)
      else
        return maxIndex;
    }, 0)
    setMostArt(max)
  }

  return (
    <div>
      <h3>Anecdote of the day</h3>
      <div>{anecdotes[selected]}</div>
      <div>has {voteCount[selected] ?? 0} votes</div>
      <div>
        <Button text="vote" handler={vote}></Button>
        <Button text="next anecdote" handler={generateRandom}></Button>
      </div>
      <h3>Anecdote with most values</h3>
      <p>{anecdotes[mostArt]}</p>
    </div>
  )
}

export default App;