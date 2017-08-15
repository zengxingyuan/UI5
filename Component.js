sap.ui.define([
               "sap/ui/core/UIComponent",
               "sap/ui/model/json/JSONModel"
               ],function(UIComponent,JSONModel){
	"use strict";
	return UIComponent.extend("sap.ui.demo.wt.Component",{
		metadata:{
			manifest:"json"
		},
		init:function(){  //the init function is automatically invoked by SAPUI5 when the component is instantiated
			//call the init function of the parent
			UIComponent.prototype.init.apply(this,arguments);
			//set data model
			var oData={
					recipient:{
						name:"world"
					}
			};
			var oModel=new JSONModel(oData);
			this.setModel(oModel);
		}
	});
});