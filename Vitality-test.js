const debug = require('debug')('vitality-test')
const jsonfile = require('jsonfile')
const Vitality = require('./Vitality.js')

var config = jsonfile.readFileSync('vitalityConfig.json')
var credentials = config.credentials

var vitality = new Vitality()

vitality.login(credentials)
  .then(() => {
    debug('Getting weekly point')
    return vitality.getWeeklypoints()
  })
  .then(weeklyPoints => {
    debug('This week points -> ' + weeklyPoints)
  })
  .catch(err => {
    debug('Error: ' + err)
  })
