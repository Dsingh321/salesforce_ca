/**
 * Created by Deepak Singh on 3/31/2019.
 */
({
    searchDonorsHelper: function (c, e, h) {
        c.set('v.searchResults', []);
        let action = c.get('c.searchDonor_Apex');
        action.setParams({
            bloodGroup: c.get('v.bloodGroup'),
            localArea: c.get('v.localArea'),
        });
        action.setCallback(this, $A.getCallback(function (response) {
            if (response.getState() === 'SUCCESS' || response.getState() === 'DRAFT') {
                console.log(response.getReturnValue());
                if (response.getReturnValue() != null) {
                    if (response.getReturnValue().length > 0) {
                        c.set('v.searchResults', response.getReturnValue());
                        c.set('v.searchResultText', '');
                    } else {
                        c.set('v.searchResultText', 'Sorry, No Donor Found, Please try again with other options.');
                    }
                }
            } else if (response.getState() === 'INCOMPLETE') {
                console.log('User is offline');
            } else if (response.getState() === 'ERROR') {
                console.log('IN ERROR STATE');
                console.log(response.getError());

            } else {
                console.log('UNKNOWN STATE');
            }
        }));
        $A.enqueueAction(action);

    }
});