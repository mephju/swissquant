import React, {Component} from 'react'
import {VictoryAxis, VictoryLabel} from 'victory'
import toYYYYMMDD from '../utils/toYYYYMMDD.js'
const axisStyle = {fontSize: 6, fontWeight: 'bold'}

const Axes = props => {
  return <div>
    <VictoryAxis
      key='x'
      label='Date'
      axisLabelComponent={<VictoryLabel style={axisStyle} />}
      tickLabelComponent={
        <VictoryLabel
          angle={45}
          dx={15}
          style={{fontSize: 5, fontWeight:'bold'}}
          // text={toYYYYMMDD}
        />
      }
    />
    <VictoryAxis
      key='y'
      label='Value'
      dependentAxis
      axisLabelComponent={<VictoryLabel style={axisStyle} />}
      tickLabelComponent={<VictoryLabel dx={-15} style={{fontSize: 5}} />}
    />
  </div>
}

export default Axes