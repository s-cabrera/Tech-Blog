const addPostEventListener = async(event) => {
    event.preventDefault();

    const title = document.querySelector('#post-title');
    const content = document.querySelector('#post-content');
    const alert = document.querySelector('#post-alert');

    const inputs = [title, content];

    //Add the d-none class to alerts and missing fields spans
    if (!alert.classList.contains('d-none')) { alert.classList.add('d-none') }

    inputs.forEach((e) => {
        if (!e.parentElement.querySelector('label span').classList.contains('d-none')) {
            e.parentElement.querySelector('label span').classList.add('d-none')
        }
    })

    //Check for empty fields
    if (title.value.trim() && content.value) {
        //Make POST Request to the backend (/api/post/add)
        const response = await fetch('/api/post/add/', {
            method: 'POST',
            body: JSON.stringify({
                title: title.value.trim(),
                content: content.value
            }),
            headers: { 'Content-Type': 'application/json' },
        })

        if (response.ok) {
            // If successful, redirect the browser to their dashboard page
            document.location.replace('/dashboard');
        } else {
            //send display message
            const message = await response.json();
            alert.textContent = message;
            alert.classList.remove("d-none");
        }
    }

    else {
        //Empty fields
        alert.textContent = 'Missing input fields above!';
        alert.classList.remove("d-none");

        //Display the * for the inputs that have missing fields
        inputs.forEach((e) => {
            //Make the correct input span appear
            if (e.value.trim() == "") {
                e.parentElement.querySelector('label span').classList.remove('d-none');
            }

        });
    }

    console.log(title.value.trim(), content.value);
}

//For Submit button in post.handlebars
document.querySelector('.post-add').addEventListener('submit', addPostEventListener)