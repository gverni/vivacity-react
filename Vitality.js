const fetch = require('node-fetch')
// const DOMParser = require('xmldom').DOMParser
// const XMLSerializer = require('xmldom').XMLSerializer
const debug = require('debug')('vitality')

// Extend Date object to add week number ISO calculation
class DateWeek extends Date {
  getWeek () {
    var date = new Date(this.getTime())
    date.setHours(0, 0, 0, 0)
    // Thursday in current week decides the year.
    date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7)
    // January 4 is always in week 1.
    var week1 = new Date(date.getFullYear(), 0, 4)
    // Adjust to Thursday in week 1 and count number of weeks from date to week1.
    return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 -
      3 + (week1.getDay() + 6) % 7) / 7)
  }
}

// Vitality object
var Vitality = function () {
  const urlStatement = 'https://member.vitality.co.uk/mvc/MyPoints/GetEventListByCategory?year=0&member='
  const urlLogin = 'https://member.vitality.co.uk/mvc/LogOn/LogOnUser?Username='
  const urlRefreshHeaderInfo = 'https://member.vitality.co.uk/mvc/vitalityglobal/RefreshHeaderData'
  // const urlRunningMan = 'https://member.vitality.co.uk/mvc/PointsGraphWithRunningMan/RunningMan'
  const urlServiceStatus = 'https://member.vitality.co.uk/Vitality/service-status'
  var cookies = ''

  var statementItems = [] // Holds the statement converted from HTML
  var weeklyPoints = {} // Holds the points grouped by week number. Needs to be initialized
  var membershipInfo = {} // Holds some memebrship information

  const thisWeekNo = (new DateWeek()).getWeek()

  /* Public methods */
  // Return a promise that resolves when all membership info have been fetched
  this.login = function (credentials) {
    var url = urlLogin + credentials['username']
    var data = {
      UserName: credentials['username'],
      Password: credentials['password'],
      RememberMe: 'false',
      RedirectToItemPath: '/'
    }

    // Save login info (for future usage)
    membershipInfo.credentials = credentials
    debug('login for ' + membershipInfo.credentials.username)
    return fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json;charset=UTF-8'
      }
    }).then(response => {
      if (response.headers.hasOwnProperty('_headers')) {
        // node-fetch fetch header
        cookies = response.headers['_headers']['set-cookie']
      } else if (response.headers.hasOwnProperty('map')) {
        // react-native fetch header
        cookies = response.headers['map']['set-cookie']
      }
      return response.text()
    }).then(() => {
      debug('login succesful')
      return Promise.all([fetchMembershipNumber(), fetchRefreshHeaderData()])
    })
  }

  this.getWeeklypoints = function (weekNo) {
    return new Promise((resolve, reject) => {
      fetchStatement().then(() => {
        var totWeek = 0
        if (weekNo === undefined) {
          weekNo = thisWeekNo
        }
        if (weekNo <= 0) {
          // WeekNo negative. Go backwards to last year
          weekNo += 52
        }
        // TODO: plot more than one user. Currently this is plotting only the first user
        let user = Object.getOwnPropertyNames(weeklyPoints)[0]
        if (weeklyPoints[user].hasOwnProperty(weekNo)) {
          totWeek = weeklyPoints[user][weekNo].reduce(function (a, b) { return { Points: a['Points'] + b['Points'] } })['Points']
        }
        resolve(totWeek)
      })
    })
  }

  this.getTotalPoints = function () {

  }

  /* Private methods */
  function fetchStatement () {
    return new Promise((resolve, reject) => {
      if (Object.keys(weeklyPoints).length) {
        resolve()
      } else {
        var url = urlStatement + membershipInfo.MembershipNumber
        debug('fetchStatement for ' + membershipInfo.MembershipNumber)
        fetch(url, {
          headers: {
            'cookie': cookies
          }
        }).then(response => response.text())
        .then((responseBody) => {
          statementToWeeklyPoints(responseBody)
          resolve()
        })
      }
    })
  }

  function statementToWeeklyPoints (strStatement) {
    parseStatementToArray(strStatement)
    if (statementItems.length) {
      statementItems.forEach((item) => {
        let fullDate = item.date + ' ' + ((new DateWeek(item.date + (new DateWeek()).getFullYear()) > new DateWeek()) ? (new DateWeek()).getFullYear() - 1 : (new DateWeek()).getFullYear())
        let dateWeekNo = (new DateWeek(fullDate)).getWeek()
        let firstName = item.name
        let points = item.points
        if (!weeklyPoints.hasOwnProperty(firstName)) { weeklyPoints[firstName] = {} }
        if (!weeklyPoints[firstName].hasOwnProperty(dateWeekNo)) { weeklyPoints[firstName][dateWeekNo] = [] }
        if (points !== '0') {
          weeklyPoints[firstName][dateWeekNo].push({ Name: firstName, Date: fullDate, WeekNo: parseInt(dateWeekNo), Points: parseInt(points) })
        }
      })
    } else {
      debug('statementToWeeklyPoints: Statement array empty')
    }
  }

  function parseStatementToArray (strStatement) {
    var statementDetails = strStatement.split('<li data-categorylist="true" class="gray-bg padding0">')
    statementDetails.forEach((item) => {
      try {
        let itemObj = {}
        itemObj.date = /<h3 class="date">(.*?)<\/h3>/.exec(item)[1]
        itemObj.name = /<h3 class="firstname">(.*?)<\/h3>/.exec(item)[1]
        itemObj.points = /class="fields points">(.*?)<\/span>/.exec(item)[1]
        statementItems.push(itemObj)
      } catch (err) {
        debug('Error: ' + err)
        debug('Parsing: ' + item)
      }
    })
    debug('parseStatementToArray: Processed ' + statementItems.length + ' element in statment')
  }

    // RefreshHeaderData is a specific API in vitality website that returns a
    // JSON containing the following info:
    // {"FullName":"","UnreadMyMessages":null,"ActiveGoals":"","VitalityPoints":"","VitalityPointsStatus":"", ...}
    // We are using this API to update membershipInfo
  function fetchRefreshHeaderData () {
    return new Promise((resolve, reject) => {
      debug('fetchRefreshHeaderData')
      fetch(urlRefreshHeaderInfo, {
        headers: {
          'cookie': cookies
        }
      })
      .then(response => response.text())
      .then(responseJSON => {
        membershipInfo.FullName = responseJSON.FullName
        membershipInfo.VitalityPoints = responseJSON.VitalityPoints
        membershipInfo.VitalityPointsStatus = responseJSON.VitalityPointsStatus
        resolve()
      })
    })
  }

  function fetchMembershipNumber () {
    // Using serviceStatus page because it's the quickest to be fetched
    return new Promise((resolve, reject) => {
      debug('fetchMembershipNumber')
      fetch(urlServiceStatus, {
        headers: {
          'cookie': cookies
        }
      })
      .then(response => response.text())
      .then(responseBody => {
        var results = /<label id="membershipnumberlabel" class="per-info">([0-9]*)<\/label>/.exec(responseBody)
        if (results) {
          membershipInfo.MembershipNumber = results[1]
          debug('fetchMembershipNumber succesful: ' + membershipInfo.MembershipNumber)
          resolve(results[1])
        } else {
          reject('fetchMembershipNumber: Membership number not found in ' + urlServiceStatus)
        }
      })
    })
  }
}

module.exports = Vitality
