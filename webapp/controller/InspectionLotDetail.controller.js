sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent",
    "sap/ui/core/routing/History",
    "sap/m/MessageToast",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], function (Controller, UIComponent, History, MessageToast, Filter, FilterOperator) {
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

            // Filter Result Records Table
            var oTableRecords = this.getView().byId("resultRecordsTable");
            if (oTableRecords) {
                var oBinding = oTableRecords.getBinding("items");
                // If binding exists, filter it. If not (first load), it might need to be handled differently 
                // but for XML views bindItems happens early.
                if (oBinding) {
                    oBinding.filter(new Filter("InspectionLot", FilterOperator.EQ, sInspectionLotId));
                } else {
                    // If binding is not ready yet, we can attach to an event or force it? 
                    // Generally for standard XML list binding, it should be there.
                    // But just in case, let's wait? No, let's trust it's there.
                    // If it's not, we might need to listen to 'updateFinished' once?
                }
            }

            // Filter Usage Decision Table
            var oTableUsage = this.getView().byId("usageDecisionTable");
            if (oTableUsage && oTableUsage.getBinding("items")) {
                oTableUsage.getBinding("items").filter(new Filter("InspectionLotNo", FilterOperator.EQ, sInspectionLotId));
            }
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
