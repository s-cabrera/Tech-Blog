
const deletePostEventHandler = async(event) => {
    const response = await fetch(`/api/posts/post/delete/${event.target.id}`, {method: 'DELETE'});

    const message = await response.json();
    console.log(message);

    if(response.ok){
        document.location.replace(`/dashboard`)
    }
}

[...document.querySelectorAll('.post-delete')].forEach(function (item) {
	item.addEventListener('click', deletePostEventHandler);
});