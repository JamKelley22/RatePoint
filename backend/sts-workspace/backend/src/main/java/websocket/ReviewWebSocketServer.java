package websocket;

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

@ServerEndpoint("/websocket/onlineusers/{username}")
@Component
public class ReviewWebSocketServer {

	// Store all socket session and their corresponding username.
	private static Map<Session, String> sessionUsernameMap = new HashMap<>();
	private static Map<String, Session> usernameSessionMap = new HashMap<>();

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

	@OnClose
	public void onClose(Session session) throws IOException {
		String username = sessionUsernameMap.get(session);
		sessionUsernameMap.remove(session);
		usernameSessionMap.remove(username);

		String message = "- " + username;
		broadcast(message);
	}

	@OnError
	public void onError(Session session, Throwable throwable) {
		// Do error handling here
		System.err.println(throwable);
	}

	private void sendMessageToUser(String username, String message) {
		try {
			usernameSessionMap.get(username).getBasicRemote().sendText(message);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

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
