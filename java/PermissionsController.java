@RestController
public class PermissionsController {

    private final CaraPermissionsPopulator populator;

    public PermissionsController(CaraPermissionsPopulator populator) {
        this.populator = populator;
    }

    @GetMapping("/permissions")
    public CaraPermissions getPermissions() {
        return populator.populatePermissions();
    }
}