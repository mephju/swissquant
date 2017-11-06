import React, { Component } from 'react'
import Chart from './Chart.js'
import instruments from '../data/instruments.js'
import styled from 'styled-components'
import Select from 'react-select'
import 'react-select/dist/react-select.css'

const Frame = styled.div`
  width: 50%;
  margin: 0 20px;
`

const Title = styled.h1`
  color: pink;
`


const instrumentOptions = instruments.map(i => ({
  label: i.instrumentId, value: i.instrumentId,
}))



class App extends Component {

  constructor(props) {
    super(props)

    this.onInstrumentChange = this.onInstrumentChange.bind(this)
    this.state = {
      instrument: instruments[0],
    }
  }

  onInstrumentChange(option) {
    if(option === null) return this.setState({instrument: instruments[0]})

    const instrument = instruments.find(i => i.instrumentId === option.label)
    this.setState({instrument})

  }

  render() {
    return <Frame className='App'>
      <Title> swissQuant Chart {this.state.instrument.instrumentId} </Title>
      <Select
        name='instrument'
        options={instrumentOptions}
        onChange={this.onInstrumentChange}
        value={this.state.instrument.instrumentId}
      />
      <Chart
        instrument={this.state.instrument}
      />
    </Frame>
  }
}

export default App
