({

    handleSaveDonor: function (c, e, h) {
        try { 
            if (h.validateFields(c, e, h)) {
                let action = c.get('c.createNewContact_Apex');
                action.setParams({
                    newDonor: c.get('v.newDonor')
                });
                action.setCallback(this, $A.getCallback(function (response) {
                    if (response.getState() === 'SUCCESS' || response.getState() === 'DRAFT') {
                        if (response.getReturnValue() != null) {
                            if (response.getReturnValue() === 'record Created') {
                                c.set('v.succussMessage', 'Added Sucessfully.');
                                 c.set('v.newDonor', "{'sObjectType':'Contact'}");
                            } else {
                                c.set('v.validationMessage',response.getReturnValue());
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
    closeError: function (c, e, h) {
        c.set('v.validationMessage', '');
        c.set('v.succussMessage', '');
    }
});