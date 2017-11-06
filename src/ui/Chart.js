import React, { Component } from 'react'
import toYYYYMMDD from '../utils/toYYYYMMDD.js'

import {
  VictoryTooltip,
  VictoryChart,
  VictoryTheme,
  VictoryLabel,
  VictoryAxis,
  VictoryZoomContainer,
  VictoryScatter,
  VictoryLine,
} from 'victory'


const sortByY = (a, b) => a.y - b.y
const last = array => array[array.length - 1]
const MAX_POINTS = 50


const getPoints = (entries, domain) => {

  let data = entries.filter(
    point => point.x >= domain.x[0] && point.x <= domain.x[1]
  )

  if(data.length < MAX_POINTS) return data

  const k = Math.ceil(data.length / MAX_POINTS)
  return data.filter((d, i) => (i % k) === 0)
}


const getDomain = entries => {
  const sorted = entries.sort(sortByY)

  return {
    x: [entries[0].x, last(entries).x],
    y: [sorted[0].y, last(sorted).y],
  }
}

const scatterStyle = {
  data: { fill: 'pink' },
  parent: { border: '1px solid #ccc'}
}

const axisStyle = {fontSize: 6, fontWeight: 'bold'}


class App extends Component {

  constructor(props) {
    super(props)
    const {instrument} = props
    this.onDomainChange = this.onDomainChange.bind(this)
    const domain = getDomain(instrument.entries)

    const data = getPoints(instrument.entries, domain)
    this.state = {
      domain,
      data,
    }
  }

  componentWillReceiveProps(next) {
    if(this.props.instrument === next.instrument) return
    const domain = getDomain(next.instrument.entries)
    const data = getPoints(next.instrument.entries, domain)
    this.setState({
      data,
      domain,
    })
  }

  onDomainChange(domain) {
    const data = getPoints(this.props.instrument.entries, domain)
    this.setState({data})
  }

  render() {
    return <VictoryChart
      theme={VictoryTheme.material}
      domain={this.state.domain}
      containerComponent={
        <VictoryZoomContainer
          zoomDomain={this.state.domain}
          zoomDimension='x'
          onZoomDomainChange={this.onDomainChange}
        />
      }
    >
      <VictoryAxis
        label='Date'
        axisLabelComponent={<VictoryLabel style={axisStyle} />}
        tickLabelComponent={
          <VictoryLabel
            angle={45}
            dx={15}
            style={{fontSize: 5, fontWeight:'bold'}}
            text={toYYYYMMDD}
          />
        }
      />
      <VictoryAxis
        label='Value'
        dependentAxis
        axisLabelComponent={<VictoryLabel style={axisStyle} />}
        tickLabelComponent={<VictoryLabel dx={-15} style={{fontSize: 5}} />}
      />
      <VictoryScatter
        style={scatterStyle}
        data={this.state.data}
        labelComponent={<VictoryTooltip />}
      />
    </VictoryChart>
  }
}

export default App
