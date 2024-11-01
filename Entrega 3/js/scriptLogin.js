let txtRegistrate=document.getElementById("txt-registrate");
let loginForm=document.getElementById("login-form");

let txtIngresa=document.getElementById("txt-ingresa");
let signinForm=document.getElementById("signin-form");

const form = document.getElementById("formLogin");
const emailUser = document.getElementById("email-user");
const pass = document.getElementById("pass");


form.addEventListener('submit', e =>{
    e.preventDefault();

    validateInputs();
    console.log('esoy');
} );

const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerHTML = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success');
};

const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerHTML = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
}

const validateInputs = () => {
    const emailUserValue = emailUser.value.trim();
    const passwordValue = pass.value.trim();
    isEmailUserCorrect = false;
    isPasswordCorrect = false;
    
    if(emailUserValue === ''){
        console.log(isEmailUserCorrect);
        setError(emailUser, 'Ingrese mail o usuario');
    } else{
        isEmailUserCorrect = true;
        
        console.log(isEmailUserCorrect);
        setSuccess(emailUser);
    }
    if (passwordValue === '') {
        console.log(isPasswordCorrect);
        setError(pass, 'Ingrese una contraseña');
    } else if(passwordValue.length < 8){
        console.log(isPasswordCorrect);
        setError(pass,'La contraseña debe tener mas de 8 caracteres');
    } else{
        isPasswordCorrect = true;
        console.log(isPasswordCorrect);
        setSuccess(pass);
    }

    if (isEmailUserCorrect && isPasswordCorrect) {
        redirect();
    }
};

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
     window.location.href="home.html";
 }
