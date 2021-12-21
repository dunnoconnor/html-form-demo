const userInfo = document.querySelector('#user')

let sessionuser = sessionStorage.getItem('username');

if(!sessionuser){
    userInfo.innerText = 'guest'
} else {
    userInfo.innerText = sessionuser
}