let txtRegistrate=document.getElementById("txt-registrate");
let loginForm=document.getElementById("login-form");

let txtIngresa=document.getElementById("txt-ingresa");
let signinForm=document.getElementById("signin-form");

document.getElementById("btn-ingresar").addEventListener("click", redirect);


txtRegistrate.addEventListener("click", showRegistrate);
txtIngresa.addEventListener("click", showLogin);

function showRegistrate(){
    loginForm.style.display="none";
    signinForm.style.display="flex";
}

function showLogin() {
    signinForm.style.display="none";
    loginForm.style.display="flex";
}

function redirect(){
    window.location.href="index.html";
}