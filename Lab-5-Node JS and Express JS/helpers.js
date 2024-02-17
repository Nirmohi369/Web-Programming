//You can add and export any helper functions you want here. If you aren't using any, then you can just leave this file as is.
function checkId(id){
    if(!id){
        throw 'id parameter is missing';
    }
    if(id.trim().length === 0){
        throw 'empty id';
    }
    return id;
}
export {
    checkId
}