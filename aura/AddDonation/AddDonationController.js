/**
 * Created by Deepak Singh on 7/31/2019.
 */
({
    doInit: function (c) {
        let dateJs = new Date();
        c.set('v.todayDate', dateJs.toISOString());
    },
    saveDonation: function (c, e, h) {
        try {
            if (h.validateFields(c, e, h)) {
                let donation = c.get('v.newDonation');
                donation.Donor__c = c.get('v.donor.Id');
                let action = c.get('c.saveDonation_Apex');
                action.setParams({
                    donation: donation
                });
                action.setCallback(this, $A.getCallback(function (response) {
                    if (response.getState() === 'SUCCESS' || response.getState() === 'DRAFT') {
                        if (response.getReturnValue() != null) {
                            if (response.getReturnValue() === 'record Created') {
                                c.set('v.successMessage', 'Donation added successfully.');
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
        } catch (e) {
            console.log('Exception in JS handleSaveDonor ::');
            console.log(e.message);
        }
    },
    closeMessage: function (c) {
        c.set('v.donor',undefined);
        c.set('v.newDonation', "{'sObjectType':'Donation_History__c'}");
        c.set('v.successMessage', '');
    }
});