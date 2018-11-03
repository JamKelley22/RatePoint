import * as POIAPI from './poi.js'
import * as PersonAPI from './person.js'
import * as ReviewAPI from './review.js'
import * as RatePointWebSocket from './webSocket.js'

const PROTOCOL_MOCK = 'https://'
const PROTOCOL_PRODUCTION = 'http://'
const MOCK_URL = 'private-b668e9-ratepoint.apiary-mock.com'
const PRODUCTION_URL = 'proj309-tg-03.misc.iastate.edu:8080'

const MOCK = PROTOCOL_MOCK + MOCK_URL;
const PRODUCTION = PROTOCOL_PRODUCTION + PRODUCTION_URL;

const BASE_URL = PRODUCTION;

const WEBSOCKET_URL = `ws://${PRODUCTION_URL}/websocket/onlineusers/`

export { POIAPI, PersonAPI, ReviewAPI, BASE_URL, WEBSOCKET_URL, RatePointWebSocket }
