import * as routes from './routes.js'

const RECAPTCHA_SITE_KEY = '6Le4hHgUAAAAAKlyl0CIBye2NCXufd2jx0gkZK11'

const USER_ROLES = {
  ADMIN: 2,
  MOD: 1,
  USER: 0
}

export { routes, RECAPTCHA_SITE_KEY, USER_ROLES }
