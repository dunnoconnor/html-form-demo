//find the delete-button in the document
const deleteBtn = document.querySelector('#delete-btn')

//find the like button in the document
const likeBtn = document.querySelector('#like-btn')

//find the likes display in the document
const likesDisplay = document.querySelector('#likes')

//get current sauce id from url path
const id = window.location.pathname.split('/sauces/')[1]

//add event to delete this sauce
deleteBtn.addEventListener('click', async (event) => {
    //fetch the menu route from express for this id
    let res = await fetch(`http://localhost:3000/sauces/${id}`, {
        method: 'DELETE',
    })
    //log the response
    console.log(res)
    //send the user back to the sauces path
    window.location.assign(`http://localhost:3000/sauces/`)
  });

likeBtn.addEventListener('click', () => {
    let currentLikes = parseInt(likesDisplay.innerHTML)
    console.log(currentLikes)
    currentLikes+=1
    likesDisplay.innerHTML = currentLikes

    fetch(`http://localhost:3000/sauces/${id}`, {
        method: 'PUT',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({
        likes: currentLikes
        })
    })
})
