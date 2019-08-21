({
    showLocalArea: function (c, e, h) {
        c.set('v.isLocalAreaShow', true);
    },
    hideLocalArea: function (c, e, h) {
        c.set('v.localArea', '');
        c.set('v.isLocalAreaShow', false);
    },
    searchDonors: function (c, e, h) {
        let bloodGroupElement = c.find('bloodGroup-error');
        let area = c.find('area-error');
        $A.util.addClass(bloodGroupElement, 'slds-hide');
        $A.util.addClass(area, 'slds-hide');
        if (c.get('v.bloodGroup') === '') {
            $A.util.removeClass(bloodGroupElement, 'slds-hide');
            return;
        }
        if (c.get('v.isLocalAreaShow') && c.get('v.localArea') === '') {
            $A.util.removeClass(area, 'slds-hide');
            return;
        }
        if (c.get('v.isLocalAreaShow') && c.get('v.localArea').trim() === '') {
            c.set('v.localArea','');
            $A.util.removeClass(area, 'slds-hide');
            return;
        }
        h.searchDonorsHelper(c, e, h);
    },

});