import { WEBSOCKET_URL } from './index.js'
import { store } from '../store.js'
import * as Actions from '../actions/actions.js'

export function connect(username) {
  console.log(WEBSOCKET_URL + username);
  let ws = new WebSocket(WEBSOCKET_URL + username);

  ws.onconnect = (event) => {
    console.log("===OnConnect===");
    console.log(event.data);
    store.dispatch(
      Actions.getCurrentUsers(
        event.data.map(user => {
          return user.split(' ')[0]
        })
      )
    )
  }

  ws.onmessage = (event) => {
    console.log("===OnMessage===");
    console.log(event.data);
    let dataArr = event.data.split(' ');
    if(dataArr.length < 2) {
      //Error, needs to look like ["+","username"]
      console.error("Invalid Syntax in Websocket message(length): " + event.data);
      return;
    }
    switch (dataArr[0]) {
      case '+'://User Connect
        store.dispatch(Actions.userConnect(dataArr[1]))
        break;
      case '-'://User Dissocnnect
        store.dispatch(Actions.userDisconnect(dataArr[1]))
        break;
      default:
        console.error("Invalid Syntax in Websocket message: " + dataArr[0]);
    }
  }
}

export function testUserConnect(username) {
  store.dispatch(Actions.userConnect(username))
}
export function testUserDisconnect(username) {
  store.dispatch(Actions.userConnect(username))
}
