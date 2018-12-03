import { library } from '@fortawesome/fontawesome-svg-core'
import { faThumbsUp, faTrophy, faClock, faCar, faArrowLeft,
  faEye, faEyeSlash, faMapMarker, faPlusCircle, faTrash, faCheck,
  faBan, faEdit, faCaretRight,faCaretDown,faStar,faStarHalfAlt, faTimes, faSpinner
} from '@fortawesome/free-solid-svg-icons'
import {
  faStar as faEmptyStar, faThumbsUp as faEmptyThumbsUp
} from '@fortawesome/free-regular-svg-icons'

library.add(faThumbsUp, faTrophy, faClock, faCar, faArrowLeft,
  faEye, faEyeSlash, faMapMarker, faPlusCircle, faTrash, faCheck,
  faBan, faEdit,faCaretRight,faCaretDown,faStar,faEmptyStar,
  faStarHalfAlt,faTimes,faEmptyThumbsUp, faSpinner
)

export default library;
