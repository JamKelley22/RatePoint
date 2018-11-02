import * as POIAPI from './poi.js'
import * as PersonAPI from './person.js'
import * as ReviewAPI from './review.js'

const MOCK_URL = 'https://private-b668e9-ratepoint.apiary-mock.com'
const PRODUCTION_URL = 'http://proj309-tg-03.misc.iastate.edu:8080'

const BASE_URL = MOCK_URL;//Change when backend switches

export { POIAPI, PersonAPI, ReviewAPI, BASE_URL }
