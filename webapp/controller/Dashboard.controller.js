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
            // Get the binding context of the pressed item
            var oContext = oEvent.getSource().getBindingContext();
            // Get the InspectionLot ID from the context
            var sInspectionLot = oContext.getProperty("InspectionLot");

            var oRouter = UIComponent.getRouterFor(this);
            // Navigate to the 'inspectionLotDetail' route, passing the InspectionLot ID
            oRouter.navTo("inspectionLotDetail", {
                inspectionLotId: sInspectionLot
            });
        }
    });
});
