sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/m/MessageToast"
], function (Controller,History,MessageToast) {
    "use strict";
    return Controller.extend("sap.ui.demo.wt.controller.Detail", {
        onInit: function () {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.getRoute("detail").attachPatternMatched(this._onObjectMatched, this);
        },
        _onObjectMatched: function (oEvent) {
            this.getView().bindElement({
                path: "/" + oEvent.getParameter("arguments").invoicePath,
                model: "invoice"
            });
        },
        onNavBack:function () {
            var oHistory=History.getInstance();
            var sPreviousHash=oHistory.getPreviousHash();

            if(sPreviousHash!==undefined){
                window.history.go(-1);
                //The third parameter true tells the router to replace the current history state with the new one since we actually do a back navigation by ourselves. The second parameter is an empty array ({}) as we do not pass any additional parameters to this route

            }else{
                var oRouter=sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("overview",{},true);
            }
        },
        onRatingChange:function(oEvent){
            var fValue = oEvent.getParameter("value");
            var oResourceBundle = this.getView().getModel("i18n").getResourceBundle();
            MessageToast.show(oResourceBundle.getText("ratingConfirmation", [fValue]));        }
    });
});