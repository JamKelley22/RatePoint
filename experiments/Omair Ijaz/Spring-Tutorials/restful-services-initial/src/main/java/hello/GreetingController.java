package hello;

import java.util.concurrent.atomic.AtomicLong;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

//HTTP requests are handled by a controller identified by this annotation
@RestController

//This class will return a new instance of the Greeting Class
public class GreetingController {

    private static final String template = "Hello, %s!";
    private final AtomicLong counter = new AtomicLong();
    
    //This annotation maps the greeting() method to /greeting
    //more specifically @RequestMapping(method=GET)
    @RequestMapping("/greeting")
    
    //This binds value of name to String name parameter
    public Greeting greeting(@RequestParam(value="name", defaultValue="World") String name) {
        return new Greeting(counter.incrementAndGet(),
                            String.format(template, name));
    }
}
