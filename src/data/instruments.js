import data from './data.json'
import toYYYYMMDD from '../utils/toYYYYMMDD.js'

const toXyPoint = point => {
  const x = new Date(point.d).getTime()
  return {
    x,
    y: point.v,
    label: toYYYYMMDD(x) + ' - ' + point.v
  }
}

const instruments = data.mktData.map(i => {
  console.debug('instrument', i.instrumentId, i.timeSeries.entries.length)
  const instrument = {
    instrumentId: i.instrumentId,
    entries: i.timeSeries.entries.map(toXyPoint)
  }
  return instrument
})


console.debug('instruments', instruments)

export default instruments