/**
 * Controller class for the lightning component
 * FilterLookUpParentDependentCmp
 * Created By : Deepak
 */

public class FilterLookUpParentDependentCmpCtrl {
    @AuraEnabled(cacheable=true)
    public static String searchDB(String objectName, String fld_API_Text, String fld_API_Val,
            Integer lim, String fld_API_Search, String searchText) {
        try {
            String query;
            if(searchText == null) {
                query = 'SELECT ' + fld_API_Text + ' ,' + fld_API_Val +
                        ' FROM ' + objectName + ' order by LastViewedDate desc' +
                        ' LIMIT ' + lim ;
            } else {
                searchText = '\'%' + String.escapeSingleQuotes(searchText.trim()) + '%\'';
                query = 'SELECT ' + fld_API_Text + ' ,' + fld_API_Val +
                        ' FROM ' + objectName +
                        ' WHERE ' + fld_API_Search + ' LIKE ' + searchText +
                        ' LIMIT ' + lim;
            }
            //System.debug('query :::' + query);
            List<sObject> sobjList = Database.query(query);
            System.debug('sobjList ::' + sobjList);
            List<ResultWrapper> lstRet = new List<ResultWrapper>();
            for (SObject s : sobjList) {
                ResultWrapper obj = new ResultWrapper();
                obj.objName = objectName;
                obj.Id = String.valueOf(s.get(fld_API_Val)) ;

                if(fld_API_Text.contains(',')) {
                    obj.tagField = String.valueOf(s.get(fld_API_Text.split(',')[1])) ;
                    obj.text = String.valueOf(s.get(fld_API_Text.split(',')[0])) ;

                } else {
                    obj.text = String.valueOf(s.get(fld_API_Text)) ;
                }
                lstRet.add(obj);
            }
            return JSON.serialize(lstRet) ;
        } catch(Exception exp) {
            System.debug('Exception Message :: ' + exp.getMessage() + ' At line Number :: ' + exp.getLineNumber());
        }
        return null;
    }

    public class ResultWrapper {
        public String objName { get; set; }
        public String text { get; set; }
        public String tagField { get; set; }
        public String Id { get; set; }
    }
}