/**
 * Created by Deepak Singh on 3/13/2019.
 */

public with sharing class DonorController {
    @AuraEnabled
    public static String createNewContact_Apex(Contact newDonor) {
        try {
            List<Contact> contacts = new List<Contact>();
            contacts = [SELECT Id FROM Contact WHERE MobilePhone = :newDonor.MobilePhone LIMIT 1];
            if(contacts.size() > 0) {
                return 'This Mobile Number is already added!';
            } else {
                insert newDonor;
                return 'record Created';
            }

        } catch(Exception exp) {
            System.debug('Exception Message :: ' + exp.getMessage() + ' At Line Number :: ' + exp.getLineNumber());
            throw new AuraHandledException('Exception Message :: ' + exp.getMessage() + ' At Line Number :: ' + exp.getLineNumber());
        }
    }
    @AuraEnabled
    public static List<Contact> searchDonor_Apex(String bloodGroup, String localArea) {
        try {
            List<Contact> contacts = new List<Contact>();
            if(localArea != null && localArea != '') {
                localArea = '%' + localArea + '%';
                contacts = [
                        SELECT Id,
                                Name,
                                Blood_Group__c,
                                Gender__c,
                                MobilePhone,
                                MailingCity,
                                MailingStreet,
                                Phone,
                                Last_Donation_Date__c
                        FROM Contact
                        WHERE Blood_Group__c = :bloodGroup
                        AND MailingCity LIKE :localArea
                        LIMIT 5000
                ];
                System.debug('contacts  bloodGroup  not null  ' + contacts.size());
            } else {
                contacts = [
                        SELECT Id,
                                Name,
                                Blood_Group__c,
                                Gender__c,
                                MobilePhone,
                                MailingCity,
                                MailingStreet,
                                Phone,
                                Last_Donation_Date__c
                        FROM Contact
                        WHERE Blood_Group__c = :bloodGroup
                        LIMIT 5000
                ];
                System.debug('contacts  bloodGroup null  ' + contacts.size());
            }
            return contacts;
        } catch(Exception exp) {
            System.debug('Exception Message :: ' + exp.getMessage() + ' At Line Number :: ' + exp.getLineNumber());
            throw new AuraHandledException('Exception Message :: ' + exp.getMessage() + ' At Line Number :: ' + exp.getLineNumber());
        }
    }

    @AuraEnabled
    public static String saveDonation_Apex(Donation_History__c donation) {
        try {
            insert donation;
            return 'record Created';
        } catch(Exception exp) {
            System.debug('Exception Message :: ' + exp.getMessage() + ' At Line Number :: ' + exp.getLineNumber());
            throw new AuraHandledException('Exception Message :: ' + exp.getMessage() + ' At Line Number :: ' + exp.getLineNumber());
        }
    }

}