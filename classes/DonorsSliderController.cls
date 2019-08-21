/**
 * Created by Deepak Singh on 4/10/2019.
 */

public with sharing class DonorsSliderController {

    @AuraEnabled
    public static List<Donor> getTopDonors_Apex() {
        try {
            List<Account> accounts = new List<Account>();
            List<Donor> donors = new List<Donor>();
            accounts = [SELECT Id FROM Account WHERE Name = 'Donor Account' LIMIT 1];
            if(accounts.size() > 0) {
                List<Attachment> attachments = new List<Attachment>();
                attachments = [SELECT Id FROM Attachment WHERE ParentId = :accounts[0].Id ORDER BY CreatedDate DESC LIMIT 5];
                if(attachments.size() > 0) {
                    for (Attachment attachment : attachments) {
                        Donor donor = new Donor();
                        donor.imageUrl = '/servlet/servlet.FileDownload?file=' + String.valueOf(attachment.Id);
                        donors.add(donor);
                    }
                }
            }
            return donors;
        } catch(Exception exp) {
            System.debug('Exception Message :: ' + exp.getMessage() + ' At Line Number :: ' + exp.getLineNumber());
            throw new AuraHandledException('Exception Message :: ' + exp.getMessage() + ' At Line Number :: ' + exp.getLineNumber());
        }
    }
    public class Donor {
        @AuraEnabled public String imageUrl { get; set; }
    }
}