/**
 * Created by Deepak Singh on 3/13/2019.
 */
({
    showSpinner: function (c, e, h) {
        c.set("v.isSpinnerShow", true);
    },
    closeSpinner: function (c, e, h) {
        c.set("v.isSpinnerShow", false);
    },
    createDynamicComponent: function (c, e, h) {
        h.createDynamicComponentHelper(c, e, h);
    },
});