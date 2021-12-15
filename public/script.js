
//find the delete-button in the document
const deleteBtn = document.querySelector('#delete-btn')
console.log(deleteBtn)

//add event to delete this sauce
deleteBtn.addEventListener('click', async () => {
    //get id from the current url path
    const id = window.location.pathname.split('/sauces/')[1]
    //fetch the menu route from express for this id
    let res = await fetch(`/sauces/${id}`, {
        method: 'DELETE',
    })
    console.log(res)
  });