import com.fasterxml.jackson.annotation.JsonProperty;

public class CaraPermissions {

    @JsonProperty("CARA_BASIC")
    private PermissionSet caraBasic;

    @JsonProperty("CARA_AUDIT")
    private PermissionSet caraAudit;

    @JsonProperty("CARA_TOOLBOX")
    private PermissionSet caraToolbox;

    // Getters and setters

    public static class PermissionSet {
        @JsonProperty("AENDERN")
        private boolean aendern;

        @JsonProperty("ANSEHEN")
        private boolean ansehen;

        // Getters and setters
    }
}