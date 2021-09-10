const commentAddEventHandler = async(event) => {
    const form = document.querySelector('.post-comment');
    form.classList.remove('d-none');
}


const commentSubmitEventHandler = async(event) => {
    event.preventDefault();

    const content = document.querySelector('#comment-content');
    const alert = document.querySelector('#comment-alert');

    //Add the d-none class to alerts and missing fields spans
    if(!alert.classList.contains('d-none')){alert.classList.add('d-none')}
    if(!content.parentElement.querySelector('label span').classList.contains('d-none')){
        content.parentElement.querySelector('label span').classList.add('d-none');
    }

    if(content.value.trim()){
        const response = await fetch('/api/posts/comment', {
            method: 'POST',
            body: JSON.stringify({
                 post_id : event.target.id, 
                 content : content.value.trim() 
            }),
            headers: { 'Content-Type': 'application/json' },
        });

        const message = response.json();
        alert.textContent = message;
        alert.classList.remove("d-none");

        if(response.ok){
            document.location.replace(`/api/posts/post/${event.target.id}`);
        }
    }
    else{
        alert.textContent = 'Missing input fields above!';
        alert.classList.remove("d-none");
        
        //Display the * for the inputs that have missing fields
        if(e.value.trim() == ""){
            content.parentElement.querySelector('label span').classList.remove('d-none');
        }
    }

    //When you're done hide the form
    document.querySelector('.post-comment').classList.add('d-none')
}

const deleteCommentEventHandler = async(event)=> {

    const response = await fetch(`/api/posts/comment/delete/${event.target.id}`, {method: 'DELETE'});

    const message = await response.json();
    console.log(message);

    if(response.ok){
        document.location.replace(`/api/posts/post/${event.target.getAttribute("data")}`)
    }
}



[...document.querySelectorAll('.delete_btn')].forEach(function (item) {
	item.addEventListener('click', deleteCommentEventHandler);
});

//The Add Comment Button on top of the Comment Card
document.querySelector('.comment-btn').addEventListener('click', commentAddEventHandler)

//The submit button for the Comment form
document.querySelector('.post-comment').addEventListener('submit', commentSubmitEventHandler);