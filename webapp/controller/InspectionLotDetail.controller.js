sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent",
    "sap/ui/core/routing/History",
    "sap/m/MessageToast",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/json/JSONModel"
], function (Controller, UIComponent, History, MessageToast, Filter, FilterOperator, JSONModel) {
    "use strict";

    return Controller.extend("com.kaar.qualityportal.controller.InspectionLotDetail", {

        onInit: function () {
            var oRouter = UIComponent.getRouterFor(this);
            oRouter.getRoute("inspectionLotDetail").attachPatternMatched(this._onObjectMatched, this);

            // Local View Model for editable fields
            var oViewModel = new JSONModel({
                goodStock: 0,
                blockedStock: 0,
                reworkStock: 0,
                totalRecorded: 0
            });
            this.getView().setModel(oViewModel, "viewModel");
        },

        _onObjectMatched: function (oEvent) {
            var sInspectionLotId = oEvent.getParameter("arguments").inspectionLotId;
            // Bind the view to the InspectionLot entity using its ID
            this.getView().bindElement({
                path: "/Z863_C_QINSPECT('" + sInspectionLotId + "')"
            });

            // Reset view model values
            this.getView().getModel("viewModel").setData({
                goodStock: 0,
                blockedStock: 0,
                reworkStock: 0,
                totalRecorded: 0
            });
        },

        calculateTotal: function () {
            var oModel = this.getView().getModel("viewModel");
            var iGood = parseFloat(oModel.getProperty("/goodStock")) || 0;
            var iBlocked = parseFloat(oModel.getProperty("/blockedStock")) || 0;
            var iRework = parseFloat(oModel.getProperty("/reworkStock")) || 0;

            oModel.setProperty("/totalRecorded", iGood + iBlocked + iRework);
        },

        onSaveResults: function () {
            var oModel = this.getView().getModel("viewModel");
            var iTotal = oModel.getProperty("/totalRecorded");

            // Logic to save results (e.g., OData update or function import)
            // Implementation placeholder
            if (iTotal > 0) {
                MessageToast.show("Inspection Results Saved Successfully!");
            } else {
                MessageToast.show("Please enter valid quantities.");
            }
        },

        onAcceptLot: function () {
            // Logic for Accepting Lot
            // e.g., Update UsageDecisionCode to 'A'
            MessageToast.show("Lot Accepted Successfully!");
        },

        onRejectLot: function () {
            // Logic for Rejecting Lot
            // e.g., Update UsageDecisionCode to 'R'
            MessageToast.show("Lot Rejected.");
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
