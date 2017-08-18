sap.ui.define([
    "sap/ui/core/Control",
    "sap/m/RatingIndicator",  //to collect user input on the product
    "sap/m/Label",  //to display further information
    "sap/m/Button"  //to submit the rating to the app to store it

], function (Control, RatingIndicator, Label, Button) {
    "use strict";
    return Control.extend("sap.ui.demo.wt.control.ProductRating", {
        metadata : {
            properties : {
                //define this property to hold  the value that user selected in the rating
                //getter and setter function for this property will automatically be created
                value: 	{type : "float", defaultValue : 0}
            },
            aggregations : {
                //we need three internal controls to realize our rating functionality so visibility attribute to hidden
                //Aggregations can be used to hold arrays of controls but we just want a single control in each of the aggregations so muliple to false
                _rating : {type : "sap.m.RatingIndicator", multiple: false, visibility : "hidden"},
                _label : {type : "sap.m.Label", multiple: false, visibility : "hidden"},
                _button : {type : "sap.m.Button", multiple: false, visibility : "hidden"}
            },

            //verskil aggregation and association
            events : {
                change : {  //the control will fire when the rating is submitted
                    parameters : {
                        value : {type : "int"}
                    }
                }
            }
        },
        init : function () {  //a framework method
            this.setAggregation("_rating", new RatingIndicator({
                value: this.getValue(),
                iconSize: "2rem",
                visualMode: "Half",
                liveChange: this._onRate.bind(this)
            }));
            this.setAggregation("_label", new Label({
                text: "{i18n>productRatingLabelInitial}"
            }).addStyleClass("sapUiTinyMargin"));
            this.setAggregation("_button", new Button({
                text: "{i18n>productRatingButton}",
                press: this._onSubmit.bind(this)
            }));
        },
        //setValue is an overridden setter
        setValue: function (iValue) {
            this.setProperty("value", iValue, true);
            this.getAggregation("_rating").setValue(iValue);
        },

        _onRate : function (oEvent) {
            var oRessourceBundle = this.getModel("i18n").getResourceBundle();
            var fValue = oEvent.getParameter("value");

            this.setValue(fValue);

            this.getAggregation("_label").setText(oRessourceBundle.getText("productRatingLabelIndicator", [fValue, oEvent.getSource().getMaxValue()]));
            this.getAggregation("_label").setDesign("Bold");
        },

        _onSubmit : function (oEvent) {
            var oResourceBundle = this.getModel("i18n").getResourceBundle();

            this.getAggregation("_rating").setEnabled(false);
            this.getAggregation("_label").setText(oResourceBundle.getText("productRatingLabelFinal"));
            this.getAggregation("_button").setEnabled(false);
            this.fireEvent("change", {
                value: this.getValue()
            });
        },
        renderer : function (oRM, oControl) {
            oRM.write("<div");
            oRM.writeControlData(oControl);
            oRM.addClass("myAppDemoWTProductRating");
            oRM.writeClasses();   //the CSS class and others have been added in the view are then rendered by calling writeClasses on the render instance
            oRM.write(">");
            //close the surrounding div tag and render three internal control by passing the content of the internal aggregation to the render managers renderControl function
            oRM.renderControl(oControl.getAggregation("_rating"));
            oRM.renderControl(oControl.getAggregation("_label"));
            oRM.renderControl(oControl.getAggregation("_button"));
            oRM.write("</div>");
        }
    });
});