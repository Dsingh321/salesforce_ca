({
    itemSelected: function (component, event, helper) {
        let target = event.target;
        let SelIndex = helper.getIndexFrmParent(target, helper, "data-selectedIndex");
        if (SelIndex) {
            let serverResult = component.get("v.server_result");
            let selItem = serverResult[SelIndex];
            if (selItem.Id) {
                component.set("v.selItem", selItem);
                component.set("v.last_ServerResult", serverResult);
            }
            component.set("v.server_result", null);
            component.set("v.searchText", undefined);
        }
    },
    firstServerCall: function (component, event, helper) {
        //Escape button pressed
        if (event.keyCode == 27) {
            helper.clearSelection(component, event, helper);
        } else {
            if (component.get('v.searchText') == '') {
                //Save server call, if last text not changed
                let objectName = component.get("v.objectName");
                let field_API_text = component.get("v.field_API_text");
                let field_API_val = component.get("v.field_API_val");
                let field_API_search = component.get("v.field_API_search");
                let limit = component.get("v.limit");
                let searchTextStartsWithFilter = component.get("v.searchTextStartsWithFilter");
                let action = component.get('c.searchDB');
                action.setStorable();
                action.setParams({
                    objectName: objectName,
                    fld_API_Text: field_API_text,
                    fld_API_Val: field_API_val,
                    lim: limit,
                    fld_API_Search: field_API_search,
                    searchText: null
                });
                action.setCallback(this, function (a) {
                    this.handleResponse(a, component, helper);
                });
                console.log('First Server call made');
                $A.enqueueAction(action);
            }
        }
    },
    serverCall: function (component, event, helper) {
        let target = event.target;
        // let searchText = target.value;
        let searchText = component.get("v.searchText");
        let last_SearchText = component.get("v.last_SearchText");
        //Escape button pressed
        if (event.keyCode == 27 || !searchText.trim()) {
            helper.clearSelection(component, event, helper);
        } else if (searchText.trim() != last_SearchText) {
            //Save server call, if last text not changed
            let objectName = component.get("v.objectName");
            let field_API_text = component.get("v.field_API_text");
            let field_API_val = component.get("v.field_API_val");
            let field_API_search = component.get("v.field_API_search");
            let limit = component.get("v.limit");
            let action = component.get('c.searchDB');
            action.setStorable();

            action.setParams({
                objectName: objectName,
                fld_API_Text: field_API_text,
                fld_API_Val: field_API_val,
                lim: limit,
                fld_API_Search: field_API_search,
                searchText: searchText
            });
            action.setCallback(this, function (a) {
                this.handleResponse(a, component, helper);
            });
            component.set("v.last_SearchText", searchText.trim());
            console.log('Server call made');
            $A.enqueueAction(action);
        } else if (searchText && last_SearchText && searchText.trim() == last_SearchText.trim()) {
            component.set("v.server_result", component.get("v.last_ServerResult"));
            console.log('Server call saved');
        }
    },
    handleResponse: function (res, component, helper) {
        if (res.getState() === 'SUCCESS') {
            if (res.getReturnValue() != null) {
                let retObj = JSON.parse(res.getReturnValue());
                if (retObj.length <= 0) {
                    let noResult = JSON.parse('[{"text":"No Results Found"}]');
                    component.set("v.server_result", noResult);
                    component.set("v.last_ServerResult", noResult);
                } else {
                    component.set("v.server_result", retObj);
                    component.set("v.last_ServerResult", retObj);
                }
            }
        } else if (res.getState() === 'ERROR') {
            let errors = res.getError();
            if (errors) {
                if (errors[0] && errors[0].message) {
                    alert(errors[0].message);
                }
            }
        }
    },
    getIndexFrmParent: function (target, helper, attributeToFind) {
        //User can click on any child element, so traverse till intended parent found
        if(target !== null){
            let SelIndex = target.getAttribute(attributeToFind);
            while (!SelIndex) {
                target = target.parentNode;
                SelIndex = helper.getIndexFrmParent(target, helper, attributeToFind);
            }
            return SelIndex;
        }

    },
    clearSelection: function (component, event, helper) {
        component.set("v.selItem", null);
        component.set("v.server_result", null);
        component.set("v.searchText", '');
    },
});