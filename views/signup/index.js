import { createNotification } from '../components/notification.js';

const form = document.querySelector('#form');
const nameInput = document.querySelector('#name-input');
const emailInput = document.querySelector('#email-input');
const passwordInput = document.querySelector('#password-input');
const matchInput = document.querySelector('#match-input');
const formBtn = document.querySelector('#form-btn');
const notification = document.querySelector('#notification');


//Regex validation

const EMAIL_VALIDATION = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const PASSWORD_VALIDATION = /^(?=.*\d)(?=.*[a-z])(?=.*[a-zA-Z]).{8,}$/;
const NAME_VALIDATION = /^[A-Z\u00d1][a-zA-Z-ÿí\u00f1\u00d1]+(\s*[A-Z\u00d1][a-zA-Z-ÿí\u00f1\u00d1]*)$/;

//Validations

let nameValidation = false;
let emailValidation = false;
let passwordValidation = false;
let matchValidation = false;

const validation = (input, regexValidation) => {
    formBtn.disabled = nameValidation && emailValidation &&  passwordValidation && matchValidation ? false : true;
    // console.log(nameValidation && emailValidation &&  passwordValidation && matchValidation);

    if (input.value === '') {
        input.classList.remove('outline-red-700', 'outline-2', 'outline');
        input.classList.remove('outline-green-700', 'outline-2', 'outline'); 
        input.classList.add('focus:outline-violet-700');
    } else if (regexValidation) {
        input.classList.remove('focus:outline-violet-700', 'outline-red-700');
        input.classList.add('outline-green-700', 'outline-2', 'outline');  
    } else if (!regexValidation){ 
        input.classList.remove('focus:outline-violet-700', 'outline-green-700');
        input.classList.remove('outline-green-700', 'outline-2', 'outline'); 
        input.classList.add('outline-red-700', 'outline-2', 'outline'); 
    } 
};


//Events
nameInput.addEventListener('input', e => {
    nameValidation = NAME_VALIDATION.test(e.target.value);
    validation(nameInput, nameValidation);
});

emailInput.addEventListener('input', e => {
    emailValidation = EMAIL_VALIDATION.test(e.target.value);
    validation(emailInput, emailValidation);
});

passwordInput.addEventListener('input', e => {
    passwordValidation = PASSWORD_VALIDATION.test(e.target.value);
    matchValidation = e.target.value === matchInput.value;
    validation(passwordInput, passwordValidation);
    validation(matchInput, matchValidation);
});

matchInput.addEventListener('input', e => {
    matchValidation = e.target.value === passwordInput.value;
    validation(matchInput, matchValidation);
});

form.addEventListener('submit', async e => {
    e.preventDefault();
try {
    console.log('arepa');
    const newUser = {
        name: nameInput.value,
        email: emailInput.value,
        password: passwordInput.value,
    }
    console.log('arepa 1');


    //Notificacion de  usuario creado y verifique su correo
    const { data } = await axios.post('/api/users', newUser);
    createNotification(false, data);
    setTimeout(() => {
        notification.innerHTML = '';
    }, 5000);

    console.log('arepa 3');

    //Para vaciar las casillas
    nameInput.value= '';
    emailInput.value= '';
    passwordInput.value= '';
    matchInput.value= '';

    //Para quitarles el color a las casillas
    validation(nameInput, false);
    validation(emailInput, false);
    validation(passwordInput, false);
    validation(matchInput, false);


} catch (error) {
    console.log('arepa 4 error');

    //Notificacion por si activan el boton ilegalmente
    createNotification(true, error.response.data.error)
    setTimeout(() => {
        notification.innerHTML = '';
    }, 5000);
    
}

    

});
