const editPostEventListener = async(event) => {
    event.preventDefault();
    console.log("Made it to the listener");
    const title = document.querySelector('#post-title');
    const content = document.querySelector('#post-content');
    const alert = document.querySelector('#post-alert');
    console.log("Made it past vars");
    const inputs = [title, content];

    //Add the d-none class to alerts and missing fields spans
    if (!alert.classList.contains('d-none')) { alert.classList.add('d-none') }

    inputs.forEach((e) => {
        if (!e.parentElement.querySelector('label span').classList.contains('d-none')) {
            e.parentElement.querySelector('label span').classList.add('d-none')
        }
    })

    console.log(title.value.trim(), content.value);
    console.log(`id: ${event.target.id}`);
    //Check for empty fields
    if (title.value.trim() && content.value) {
        //Make POST Request to the backend (/api/post/add)
        const response = await fetch(`/api/post/edit/${event.target.id}`, {
            method: 'PUT',
            body: JSON.stringify({
                title: title.value.trim(),
                content: content.value
            }),
            headers: { 'Content-Type': 'application/json' },
        })
        
        const message = await response.json();
        if (response.ok) {
            // If successful, redirect the browser to their dashboard page      
            console.log(message);
            document.location.replace('/dashboard');
        } else {
            //send display message
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


//For Submit button in edit.handlebars
document.querySelector('.post-edit').addEventListener('submit', editPostEventListener)