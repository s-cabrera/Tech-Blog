
const editBtnEventListener = async(event) => {
    //  console.log(`$Button id: ${event.target.id}`);
     document.location.replace(`/api/post/${event.target.id}`);
    // const response = await fetch('/api/post/edit/?id=${event.target.id}', {
    //     method: 'GET',
    //     headers: { 'Content-Type': 'application/json' },
    // })
    // if(!response.ok){
    //     console.log('Something went wrong');
    // }
    // else{
    //     console.log('Something went right');
    // }
}


//For Edit Button(s) in dashboard.handlebars
[...document.querySelectorAll('.edit-btn')].forEach(function (item) {
	item.addEventListener('click', editBtnEventListener);
});


