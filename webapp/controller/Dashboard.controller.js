sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent",
    "sap/m/MessageToast"
], function (Controller, UIComponent, MessageToast) {
    "use strict";

    return Controller.extend("com.kaar.qualityportal.controller.Dashboard", {
        onInit: function () {
            // Initialize anything needed for the dashboard
        },

        onNavBack: function () {
            // Navigate back to the login page
            UIComponent.getRouterFor(this).navTo("login", {}, true);
        },

        onInspectionLotPress: function (oEvent) {
            // Example: Navigate to a detail page for the selected inspection lot
            var sInspectionLot = oEvent.getSource().getTitle();
            MessageToast.show("Selected Inspection Lot: " + sInspectionLot);
        }
    });
});
