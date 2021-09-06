console.log("Connected to the login page");
const loginBtnEventHandler = async(event) => {
    //Prevent the page from erasing the data in the input fields
    event.preventDefault();

    console.log("Login button clicked");

    //Store data  from the input fields to the 
    const email = document.querySelector('#login-email');
    const password = document.querySelector('#login-password');
    const alert = document.querySelector('#login-alert');

    const inputs = [email, password];

    //Add the d-none class to alerts and missing fields spans
    if(!alert.classList.contains('d-none')){alert.classList.add('d-none')}

    inputs.forEach((e) => {
        if(!e.parentElement.querySelector('label span').classList.contains('d-none')){
            e.parentElement.querySelector('label span').classList.add('d-none')
        }
    })

    //Check for empty fields
    if(email.value.trim() && password.value.trim()){
        //Make the POST request to the backend (/api/user/login)
        const response = await fetch('/api/user/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' },
        });
    }
    else{
        alert.textContent = 'Missing input fields above!';
        alert.classList.remove("d-none");
        
        //Display the * for the inputs that have missing fields
        inputs.forEach((e) => {
            //Make the correct input span appear
            if(e.value.trim() == ""){
                e.parentElement.querySelector('label span').classList.remove('d-none');
            }
            
        });
    }
}

document.querySelector('.login-form').addEventListener('submit', loginBtnEventHandler);