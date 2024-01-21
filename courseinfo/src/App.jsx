import Header from './Header';
import Content from './Content';
import Total from './Total';

const App = () => {
  const course = 'Half Stack application development';
  const part1 = 'Fundanmentals of React';
  const exercise1 = 10;

  const part2 = 'Using props to pass data';
  const exercise2 = 7;
  
  const part3 = 'State of a component';
  const exercise3 = 14;

  return (
    <div>
      <Header header={course}></Header>
      <Content part1={part1} part2={part2} part3={part3} exercise1={exercise1} exercise2={exercise2} exercise3={exercise3}></Content>
      <Total exercise1={exercise1} exercise2={exercise2} exercise3={exercise3}></Total>
    </div>
  )
}

export default App;