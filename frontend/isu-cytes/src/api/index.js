import * as POIAPI from './poi.js'
import * as PersonAPI from './person.js'
import * as ReviewAPI from './review.js'
import * as ListAPI from './list.js'
import * as RatePointWebSocket from './webSocket.js'
import * as RecaptchaAPI from './recaptcha.js'

const PROTOCOL_MOCK = 'https://'
const PROTOCOL_PRODUCTION = 'http://'
const MOCK_URL = 'private-b668e9-ratepoint.apiary-mock.com'
const PRODUCTION_URL = 'proj309-tg-03.misc.iastate.edu:8080'
const RECAPTCHA_WEBTASK_SERVER_URL = 'https://wt-c441cf5c5addaa35ef0621c594b39c20-0.sandbox.auth0-extend.com/RatePoint-Recaptcha'

const MOCK = PROTOCOL_MOCK + MOCK_URL;
const PRODUCTION = PROTOCOL_PRODUCTION + PRODUCTION_URL;

const BASE_URL = PRODUCTION;

const WEBSOCKET_URL = `ws://${PRODUCTION_URL}/websocket/onlineusers/`

export { POIAPI, PersonAPI, ReviewAPI, ListAPI, RecaptchaAPI, BASE_URL, WEBSOCKET_URL, RatePointWebSocket, RECAPTCHA_WEBTASK_SERVER_URL }
