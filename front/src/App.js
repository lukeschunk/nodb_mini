import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import Winner from './components/winner'

class App extends Component {
  constructor () {
    super() 

    this.state = {
      personToFight: {},
      you: {},
      winner: ''
    }
  }


  componentDidMount() {
    axios.get('http://localhost:4000/api/person')
      .then(response => {
        this.setState({ personToFight: response.data })
      })
  }

  fight = () => {
    
    console.log('this.state1', this.state.you.intelligence)
    console.log('this.state2', this.state.personToFight.intelligence)

    let winner;
    if (Number(this.state.you.intelligence) > Number(this.state.personToFight.intelligence)) {
      winner = this.state.you.name
    } else {
      winner = this.state.personToFight.name
    }
    this.setState({ winner })
  }
  
  addPerson = () => {
    axios({
      method: 'POST',
      url: 'http://localhost:4000/api/person',
      data: this.state.you
    })

  }

  render() {
    console.log('this is this.state', this.state)
    const { personToFight, you } = this.state
    return (
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div>{this.state.winner && (
          <Winner winner={this.state.winner} />
        )}
      </div>

      <div style={{display: 'flex', justifyContent: 'space-around'}}className="App">
        <div>
          <h1> Person To Fight: </h1>
          <h2> Name: {personToFight.name}</h2>
          <h3> Strength: {personToFight.strength}</h3>
          <h3> Intelligence: {personToFight.intelligence}</h3>
        </div>

        
        <div>
          <h1> You:</h1>
          <h2> Name: {you.name}</h2>
          <h3> Strength: {you.strength}</h3>
          <h3> Intelligence: {you.intelligence}</h3>
          <button onClick={this.addPerson}>Add Person To Roster</button>

        </div>
      </div>

      <div style={{ margin: '0 auto', marginTop: 40 }}>
        <input placeholder="Name" onChange={(e) => this.setState({ you: {...this.state.you, name: e.target.value} })} />
        <input placeholder="Strength" onChange={(e) => this.setState({ you: {...this.state.you, strength: e.target.value} })} />
        <input placeholder="Intelligence" onChange={(e) => this.setState({ you: {...this.state.you, intelligence: e.target.value} })} />
      </div>

      <button style={{ margin: '0 auto', marginTop: 20, width: 200, fontSize: 18 }}onClick={this.fight}>Fight!</button>
    </div>
    );
  }
}

export default App;
