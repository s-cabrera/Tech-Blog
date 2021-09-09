console.log("Connected to the signup page");
const signupBtnEventHandler = async(event) => {
    //Prevent the page from erasing the data in the input fields
    event.preventDefault();

    console.log("Signup button clicked");

    //Store data  from the input fields to the 
    const first_name = document.querySelector('#signup-first-name');
    const last_name = document.querySelector('#signup-last-name');
    const email = document.querySelector('#signup-email');
    const username = document.querySelector('#signup-username');
    const password = document.querySelector('#signup-password');
    const alert = document.querySelector('#signup-alert');

    const inputs = [first_name, last_name, email, username, password];

    //Add the d-none class to alerts and missing fields spans
    if(!alert.classList.contains('d-none')){alert.classList.add('d-none')}

    inputs.forEach((e, i) => {
        if(!(e.parentElement.querySelector('label span').classList.contains('d-none'))){
            e.parentElement.querySelector('label span').classList.add('d-none')
        }
    })

    //Check for empty fields
    if(first_name.value.trim() && last_name.value.trim() && email.value.trim() &&
        username.value.trim() && password.value.trim()){
        //Make the POST request to the backend (/signup)
        const response = await fetch('/api/user/signup', {
            method: 'POST',
            body: JSON.stringify(
                { 
                    first_name: first_name.value.trim(), 
                    last_name: last_name.value.trim(), 
                    email: email.value.trim(),
                    username: username.value.trim(), 
                    password: password.value.trim() 
                }
            ),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            // If successful, redirect the browser to the profile page
            document.location.replace('/dashboard');
        }
        else{
            //send display message
            const message = await response.json();
            alert.textContent = message;
            alert.classList.remove("d-none");
        }
    }
    else{
        //Field missing, display alert
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

document.querySelector('.signup-form').addEventListener('submit', signupBtnEventHandler);

