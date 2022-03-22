_exclude_columns=[ "created_at","updated_at", "id", "deleted_at", "org_id" ]

module.exports.DAOChangeAnalyzer = (old_model,new_model, exclude_columns=[]) => {

    if(!old_model) throw new Error("[DAOChangeAnalyzer] Old model instance cannot be null");
           
    exclude_columns.forEach(column => {

        if(column != "") _exclude_columns.push(column.trim()); 
    })

    columns = Object.keys(old_model);

    changes = [];

    columns.forEach(column => {

        if(!exceptionColumnExist(column)) {

            var old_str = old_model[column];

            var new_str = new_model[column];
    
            if(old_str !== new_str) {
    
                old_str = makeColumnNamePretty(old_str);
    
                new_str = makeColumnNamePretty(new_str);
    
                column = makeColumnNamePretty(column);
    
                var ch = "";

                if(old_str && new_str) ch = `${column} changed from ${old_str} to ${new_str}`;
                    
                if(!old_str && new_str) ch = `${column} changed to ${new_str}`;
                    
                if(!changes.includes(ch) && ch !== "")  changes.push(ch);
               
            }
        }


    })

    console.log("changes ", changes);

    return changes;

} 

function makeColumnNamePretty(str) {
    
    if(!str) return null;
    str =  str.charAt(0).toUpperCase() + str.slice(1);//capatalize first character
    pattern = /[_]/ig;
    return str.replace(pattern," ");
}

function exceptionColumnExist(column){

    return _exclude_columns.includes(column);

}