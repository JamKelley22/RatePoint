import * as POIAPI from './poi.js'
import * as PersonAPI from './person.js'
import * as ReviewAPI from './review.js'
import * as WebSocket from './webSocket.js'

const PROTOCOL = 'https://'
const MOCK_URL = 'private-b668e9-ratepoint.apiary-mock.com'
const PRODUCTION_URL = 'proj309-tg-03.misc.iastate.edu:8080'

const BASE_URL = PROTOCOL + MOCK_URL;//Change when backend switches

const WEBSOCKET_URL = `ws://${PRODUCTION_URL}/websocket/onlineusers/`

export { POIAPI, PersonAPI, ReviewAPI, BASE_URL, WEBSOCKET_URL, WebSocket }
