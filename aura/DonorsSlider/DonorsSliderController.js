/**
 * Created by Deepak Singh on 4/10/2019.
 */
({
    doInit: function (c, e, h) {
        try {
            let action = c.get('c.getTopDonors_Apex');
            action.setCallback(this, $A.getCallback(function (response) {
                if (response.getState() === 'SUCCESS' || response.getState() === 'DRAFT') {
                    console.log('---->'+response.getReturnValue());
                    if (response.getReturnValue() != null) {
                        if (response.getReturnValue().length > 0) {
                            c.set('v.donors', response.getReturnValue());
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
        } catch (e) {
            console.log('Exception in JS doInit ::');
            console.log(e.message);
        }
    }
});