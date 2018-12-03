package cs309.isucytes.websocket;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.server.standard.ServerEndpointExporter;

/**
 * Websocket application starter
 */
@Configuration
public class OnlineWebSocket {
	
	/**
	 * Creates a new server endpoint for the websocket.
	 * @return the Server endpoint object
	 */
	@Bean
	public ServerEndpointExporter serverEndpointExporter() {
		return new ServerEndpointExporter();
	}
}
