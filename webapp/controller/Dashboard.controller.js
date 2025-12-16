sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], function (Controller, UIComponent, Filter, FilterOperator) {
    "use strict";

    return Controller.extend("com.kaar.qualityportal.controller.Dashboard", {
        onInit: function () {
            // Get the List control
            // We need to wait for the view to be rendered or do this in onAfterRendering, 
            // but usually view.byId works in onInit if items are bound in XML. 
            // Better to attach to updateFinished if list items load asynchronously, 
            // but for OData binding, onInit might be too early for 'items' binding if it's not set yet.
            // However, the user code puts it in onInit. Let's follow that but be safe.
            // Actually, we can just defer it slightly or wait for binding.
            // But since the list is in XML, byId should find the control. The binding object exists as soon as the XML is parsed? 
            // Yes, usually.

            // Wait for binding to be available (sometimes it takes a moment)
            // Or better, just do it. The user code does it directly.

            // To be safer, we can do it in onAfterRendering or just try in onInit.
        },

        onAfterRendering: function () {
            var oList = this.getView().byId("idInspectionLotList");
            var oBinding = oList.getBinding("items");

            // Apply the default "Pending" filter on initial load
            // Only apply if not already applied (to avoid re-filtering on re-rendering)
            // But checking filters is complex. Let's just apply it.
            if (oBinding) {
                this._applyPendingFilter(oBinding);
            }
        },

        onNavBack: function () {
            UIComponent.getRouterFor(this).navTo("login", {}, true);
        },

        onInspectionLotPress: function (oEvent) {
            var oContext = oEvent.getSource().getBindingContext();
            var sInspectionLot = oContext.getProperty("InspectionLot");

            var oRouter = UIComponent.getRouterFor(this);
            oRouter.navTo("inspectionLotDetail", {
                inspectionLotId: sInspectionLot
            });
        },

        onFilterChange: function (oEvent) {
            var sSelectedKey = oEvent.getParameter("item").getKey();
            var oList = this.getView().byId("idInspectionLotList");
            var oBinding = oList.getBinding("items");

            if (oBinding) {
                if (sSelectedKey === "pending") {
                    this._applyPendingFilter(oBinding);
                } else { // "all" is selected
                    oBinding.filter([]); // Remove all filters
                }
            }
        },

        _applyPendingFilter: function (oBinding) {
            // Filters for UsageDecisionCode being empty or null
            var aFilters = [
                new Filter({
                    filters: [
                        new Filter("UsageDecisionCode", FilterOperator.EQ, ''),
                        new Filter("UsageDecisionCode", FilterOperator.EQ, null) // In case it's literally null
                    ],
                    and: false // Apply as an OR condition (empty OR null)
                })
            ];
            oBinding.filter(aFilters);
        },

        // Formatter function to display "Pending" status or UD code
        formatUsageDecisionStatus: function (sUsageDecisionCode) {
            if (!sUsageDecisionCode || sUsageDecisionCode.trim() === '') {
                return this.getResourceBundle().getText("statusPending");
            }
            return this.getResourceBundle().getText("statusUDTaken") + ": " + sUsageDecisionCode;
        },

        getResourceBundle: function () {
            return this.getOwnerComponent().getModel("i18n").getResourceBundle();
        }
    });
});
