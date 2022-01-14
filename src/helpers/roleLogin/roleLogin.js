function isAdmin(){
    if(localStorage.getItem('mytoken')){
        var x = localStorage.getItem('myrole');
        if(x === '1'){
            return true;
        }
    }
    else{
        return false;
    }
}

function isDoctor(){
    if(localStorage.getItem('mytoken')){
        var x = localStorage.getItem('myrole');
        if(x === '2'){
            return true;
        }
    }
    else{
        return false;
    }
}

function isFrontoffice(){
    if(localStorage.getItem('mytoken')){
        var x = localStorage.getItem('myrole');
        if(x === '3'){
            return true;
        }
    }
    else{
        return false;
    }
}

function isLabtechnician(){
    if(localStorage.getItem('mytoken')){
        var x = localStorage.getItem('myrole');
        if(x === '4'){
            return true;
        }
    }
    else{
        return false;
    }
}
var roleController = {
    isAdmin : isAdmin,
    isDoctor : isDoctor,
    isLabtechnician : isLabtechnician,
    isFrontoffice : isFrontoffice
}

module.exports = roleController;