import fecha from 'fecha'
const YYYYMMDD = 'YYYY MM DD'

const toYYYYMMDD = timestamp => {
  const d = new Date(timestamp)
  return fecha.format(d, YYYYMMDD)
}


export default toYYYYMMDD