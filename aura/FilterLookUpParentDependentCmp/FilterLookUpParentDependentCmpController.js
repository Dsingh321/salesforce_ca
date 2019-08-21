({
    itemSelected : function(component, event, helper) {
        helper.itemSelected(component, event, helper);
    },
    serverCall :  function(component, event, helper) {
        helper.serverCall(component, event, helper);
    },
    clearSelection : function(component, event, helper){
        helper.clearSelection(component, event, helper);
    },
    firstServerCall : function(component, event, helper){
        helper.firstServerCall(component, event, helper);
    },
    clearList :function(component, event, helper) {
        component.set("v.server_result", null);
    }
})