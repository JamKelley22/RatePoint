package cs309.isucytes;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@SpringBootApplication
public class BackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

	@Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurerAdapter() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/lists").allowedOrigins("*");
                registry.addMapping("/lists/{id}").allowedOrigins("*");

                registry.addMapping("/people").allowedOrigins("*");
                registry.addMapping("/people/{username}").allowedOrigins("*");
                registry.addMapping("/people/{username}/lists").allowedOrigins("*");
                registry.addMapping("/verify").allowedOrigins("*");

                registry.addMapping("/pois").allowedOrigins("*");
                registry.addMapping("/pois/{id}").allowedOrigins("*");
                registry.addMapping("/pois/{id}/average").allowedOrigins("*");

                registry.addMapping("/reviews").allowedOrigins("*");
                registry.addMapping("/reviews/poi/{id}").allowedOrigins("*");
                registry.addMapping("/pois/{id}").allowedOrigins("*");
            }
        };
    }
}
