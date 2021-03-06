import { WEBSOCKET_URL } from './index.js'
import { store } from '../store.js'
import * as Actions from '../actions/actions.js'

let ws;

/**
 * Connect to Server side websocket
 * @param {username} The name of the user logged in
 * @return
 */
export function connect(username) {
  console.log("WebSocket Connect");
  if(ws) {
    console.log("WebSocket already exists, reseting");
      ws.close();
      ws = null;
  }

  ws = new WebSocket(WEBSOCKET_URL + username);

  /**
   * Called when recieving a message from server WebSocket
   * @param {event} 
   * @return
   */
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

/**
 * Closes to Server side websocket
 * @param
 * @return
 */
export function closeWebsocket() {
  console.log("WebSocket Close");
  if(!ws) {
    console.error("WebSocket Not Initialized");
    return;
  }
  ws.close();
}
