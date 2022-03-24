export default function updateDarkMode(){

    if(localStorage.getItem('darkMode') === 'true'){
        return true
    }else{
        return false
    }


}