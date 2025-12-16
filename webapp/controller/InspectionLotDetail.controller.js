sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent",
    "sap/ui/core/routing/History",
    "sap/m/MessageToast"
], function (Controller, UIComponent, History, MessageToast) {
    "use strict";

    return Controller.extend("com.kaar.qualityportal.controller.InspectionLotDetail", {

        onInit: function () {
            var oRouter = UIComponent.getRouterFor(this);
            oRouter.getRoute("inspectionLotDetail").attachPatternMatched(this._onObjectMatched, this);
        },

        _onObjectMatched: function (oEvent) {
            var sInspectionLotId = oEvent.getParameter("arguments").inspectionLotId;
            // Bind the view to the InspectionLot entity using its ID
            this.getView().bindElement({
                path: "/Z863_C_QINSPECT('" + sInspectionLotId + "')"
            });
        },

        onNavBack: function () {
            var oHistory = History.getInstance();
            var sPreviousHash = oHistory.getPreviousHash();

            if (sPreviousHash !== undefined) {
                window.history.go(-1);
            } else {
                var oRouter = UIComponent.getRouterFor(this);
                oRouter.navTo("dashboard", {}, true);
            }
        }
    });
});
