/**
 * Created by Deepak Singh on 7/31/2019.
 */
({
    validateFields: function (c, e, h) {
        let allValid = c.find('input').reduce(function (validSoFar, inputCmp) {
            inputCmp.showHelpMessageIfInvalid();
            return validSoFar && inputCmp.get('v.validity').valid;
        }, true);
        if (allValid) {
            return true;
        }
    }
});