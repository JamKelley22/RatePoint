package cs309.isucytes.websocket;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;

import org.springframework.stereotype.Component;

/**
 * A class that uses the websockets for the Online Users display
 */
@ServerEndpoint("/websocket/onlineusers/{username}")
@Component
public class OnlineWebSocketServer {

	// Store all socket session and their corresponding username.
	private static Map<Session, String> sessionUsernameMap = new HashMap<>();
	private static Map<String, Session> usernameSessionMap = new HashMap<>();

	/**
	 * Handles a new user connecting
	 * 
	 * @param session  Session object for the user
	 * @param username Username of the user
	 * @throws IOException If a session cannot be found or other error occurs
	 */
	@OnOpen
	public void onOpen(Session session, @PathParam("username") String username) throws IOException {
		sessionUsernameMap.put(session, username);
		usernameSessionMap.put(username, session);

		// Give the new user the list of the other users already logged in
		for (String otherUser : usernameSessionMap.keySet()) {
			if (!otherUser.equals(username)) {
				sendMessageToUser(username, "+ " + otherUser);
			}
		}

		String message = "+ " + username;
		broadcast(message);

	}

	/**
	 * Handles the user logging off
	 * 
	 * @param session the session of the logging off user
	 * @throws IOException If a session cannot be found or other error occurs
	 */
	@OnClose
	public void onClose(Session session) throws IOException {
		String username = sessionUsernameMap.get(session);
		sessionUsernameMap.remove(session);
		usernameSessionMap.remove(username);

		String message = "- " + username;
		broadcast(message);
	}

	/**
	 * If an error occurs, it can be thrown here
	 * 
	 * @param session   Session of the error
	 * @param throwable Error thrown
	 */
	@OnError
	public void onError(Session session, Throwable throwable) {
		// Do error handling here
		System.err.println(throwable);
	}

	/**
	 * Sends a message to an individual user
	 * 
	 * @param username The username to send to
	 * @param message  The message to send.
	 */
	private void sendMessageToUser(String username, String message) {
		try {
			usernameSessionMap.get(username).getBasicRemote().sendText(message);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * Sends a message to all connected users.
	 * 
	 * @param message The message to send
	 * @throws IOException If an error in communication happens.
	 */
	private static void broadcast(String message) throws IOException {
		sessionUsernameMap.forEach((session, username) -> {
			synchronized (session) {
				try {
					session.getBasicRemote().sendText(message);
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		});
	}

}
