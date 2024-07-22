import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class CaraApiService {

    private final RestTemplate restTemplate;

    public CaraApiService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public boolean getPermission(String module, String action) {
        String url = "https://api.example.com/permissions/" + module + "/" + action;
        return restTemplate.getForObject(url, Boolean.class);
    }
}