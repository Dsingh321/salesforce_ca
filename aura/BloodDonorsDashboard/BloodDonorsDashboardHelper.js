/**
 * Created by Deepak Singh on 3/13/2019.
 */
({
    createDynamicComponentHelper: function (c, e, h) {
        let tab = e.getSource();
        console.log(tab.get("v.id"));
        if (!$A.util.isUndefinedOrNull(tab.get("v.id"))) {
            if (tab.get("v.id").trim() != '') {
                let componentName = 'c:' + tab.get("v.id");
                h.injectComponentHelper(componentName, tab);
            }
        }
    },
    injectComponentHelper: function (name, target) {
        $A.createComponent(name, {}, function (contentComponent, status, error) {
           /* console.log('injectComponent_Helper status :: ' + status);
            console.log('injectComponent_Helper error :: ' + error);*/
            if (status === "SUCCESS") {
                target.set('v.body', contentComponent);
            } else {
                throw new Error(error);
            }
        });
    }
});