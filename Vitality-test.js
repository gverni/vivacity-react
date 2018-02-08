const debug = require('debug')('vitality-test')
const jsonfile = require('jsonfile')
const Vitality = require('./Vitality.js')

var config = jsonfile.readFileSync('vitalityConfig.json')
var credentials = config.credentials

var vitality = new Vitality()
var strStatementTest = '    <li data-categorylist="true" class="gray-bg padding0">        <div class="detailed-wrp gray-point-wrp">            <ul class="detail-wrp">                <li class="pad14">                    <div class="detail-one">                        <h3 class="date">16 Apr</h3>                    </div>                </li>                    <li class="MemberDetailGrid">                        <div class="detail-two">                            <h3 class="firstname">GIUSEPPE</h3>                        </div>                    </li>                <li>                    <div class="detail-three">                        <h3>                                <span class="icon-undhealth"></span>                            Being a non-smoker                        </h3>                        <a href="#" class="show-details">Show details</a>                        <div class="payment-details display-none">                            <p>200 points per cover year.</p>                            <p class="pad-bottom55"><a href="#" class="hide-details float-right">Hide details</a></p>                        </div>                        <div class="point-social-wrp display-none ">                        </div>                    </div>                </li>                <li>                    <div class="detail-five block-eqlheight">                    </div>                </li>                <li>                    <div class="detail-four block-eqlheight">                        <span data-memberpoints="true" data-memberpointsval="100" class="fields points">100</span>                    </div>                </li>            </ul>        </div>    </li>    <li data-categorylist="true" class="gray-bg padding0">        <div class="detailed-wrp gray-point-wrp">            <ul class="detail-wrp">                <li class="pad14">                    <div class="detail-one">                        <h3 class="date">16 Apr</h3>                    </div>                </li>                    <li class="MemberDetailGrid">                        <div class="detail-two">                            <h3 class="firstname">GIUSEPPE</h3>                        </div>                    </li>                <li>                    <div class="detail-three">                        <h3>                                <span class="icon-undhealth"></span>                            Health Review                        </h3>                        <a href="#" class="show-details">Show details</a>                        <div class="payment-details display-none">                            <p>100 points per cover year.</p>                            <p class="pad-bottom55"><a href="#" class="hide-details float-right">Hide details</a></p>                        </div>                        <div class="point-social-wrp display-none ">                        </div>                    </div>                </li>                <li>                    <div class="detail-five block-eqlheight">                    </div>                </li>                <li>                    <div class="detail-four block-eqlheight">                        <span data-memberpoints="true" data-memberpointsval="100" class="fields points">100</span>                    </div>                </li>            </ul>        </div>    </li>'

vitality.login(credentials)
  .then((responseText) => {
    debug('Getting weekly point')
    return vitality.getWeeklypoints()
  })
  .then(weeklyPoints => {
    debug('This week points -> ' + weeklyPoints)
  })
  .catch(err => {
    debug('Error: ' + err)
  })
