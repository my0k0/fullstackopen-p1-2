const Hello = (props) => {
  return <div><p>Hello { props.name }, you are { props.age } year old</p></div>
}

const Footer = () => {
  return <div>
    greeting  ap created by <a href="https://github.com/mluukkai">mluukkai</a>
  </div>
}

function App() {
  console.log('Hello from component');

  return <div>
      <p>Hello World</p>
      <Hello name='George' age='18'/>
      <Footer />
    </div>
}

export default App