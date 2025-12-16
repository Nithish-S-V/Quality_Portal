sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
    "sap/ui/core/UIComponent",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], function (Controller, JSONModel, MessageToast, UIComponent, Filter, FilterOperator) {
    "use strict";

    return Controller.extend("com.kaar.qualityportal.controller.Login", {

        onInit: function () {
        },

        onLoginPress: function () {
            var oView = this.getView();
            var sEmployeeId = oView.byId("employeeIdInput").getValue();
            var sPassword = oView.byId("passwordInput").getValue();
            var oODataModel = oView.getModel(); // Get the default OData model
            var oRouter = UIComponent.getRouterFor(this); 

            var oLoginStatusText = oView.byId("loginStatusText");
            oLoginStatusText.setText(""); // Clear previous messages

            // Simple validation
            if (!sEmployeeId || !sPassword) {
                MessageToast.show(this.getResourceBundle().getText("emptyCredentialsError"));
                oLoginStatusText.setText(this.getResourceBundle().getText("emptyCredentialsError"));
                return;
            }

            // OData call to check credentials using $filter on Z863_C_QLOGIN
            var sPath = "/Z863_C_QLOGIN";
            var mFilters = [
                new Filter("EmpID", FilterOperator.EQ, sEmployeeId),
                new Filter("Password", FilterOperator.EQ, sPassword)
            ];

            // Show busy indicator
            oView.setBusy(true);

            oODataModel.read(sPath, {
                filters: mFilters,
                success: function (oData, oResponse) {
                    oView.setBusy(false);
                    if (oData.results && oData.results.length > 0) {
                        // Login successful
                        MessageToast.show(this.getResourceBundle().getText("loginSuccess"));
                        oLoginStatusText.setText(this.getResourceBundle().getText("loginSuccess"));

                        // Navigate to the dashboard
                        oRouter.navTo("dashboard", {}, true); // true for replace history
                    } else {
                        // Login failed (no matching record)
                        MessageToast.show(this.getResourceBundle().getText("loginFailed"));
                        oLoginStatusText.setText(this.getResourceBundle().getText("loginFailed"));
                    }
                }.bind(this),
                error: function (oError) {
                    oView.setBusy(false);
                    // Error during OData call
                    var sErrorMessage = this.getResourceBundle().getText("loginError");
                    try {
                         var oErrorCtx = JSON.parse(oError.responseText);
                         sErrorMessage += ": " + oErrorCtx.error.message.value;
                    } catch (e) {
                         sErrorMessage += ": " + oError.statusText;
                    }
                    MessageToast.show(sErrorMessage);
                    oLoginStatusText.setText(sErrorMessage);
                    console.error("Login OData Read Error:", oError);
                }.bind(this)
            });
        },

        getResourceBundle: function () {
            return this.getOwnerComponent().getModel("i18n").getResourceBundle();
        }
    });
});
