import org.springframework.stereotype.Component;

@Component
public class CaraPermissionsPopulator {

    private final CaraApiService apiService;

    public CaraPermissionsPopulator(CaraApiService apiService) {
        this.apiService = apiService;
    }

    public CaraPermissions populatePermissions() {
        CaraPermissions permissions = new CaraPermissions();

        permissions.setCaraBasic(new CaraPermissions.PermissionSet());
        permissions.getCaraBasic().setAendern(apiService.getPermission("CARA_BASIC", "AENDERN"));
        permissions.getCaraBasic().setAnsehen(apiService.getPermission("CARA_BASIC", "ANSEHEN"));

        permissions.setCaraAudit(new CaraPermissions.PermissionSet());
        permissions.getCaraAudit().setAendern(apiService.getPermission("CARA_AUDIT", "AENDERN"));
        permissions.getCaraAudit().setAnsehen(apiService.getPermission("CARA_AUDIT", "ANSEHEN"));

        permissions.setCaraToolbox(new CaraPermissions.PermissionSet());
        permissions.getCaraToolbox().setAendern(apiService.getPermission("CARA_TOOLBOX", "AENDERN"));
        permissions.getCaraToolbox().setAnsehen(apiService.getPermission("CARA_TOOLBOX", "ANSEHEN"));

        return permissions;
    }
}