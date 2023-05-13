const url = "https://jsonplaceholder.typicode.com/posts"

const loadingElement = document.querySelector("#loading")

const postsConteiner = document.querySelector("#posts-conteiner")

const postPage = document.querySelector('#post')
const postConteiner = document.querySelector("#post-conteiner")
const commentsConteiner = document.querySelector("#comments-conteiner")

const commentForm =  document.querySelector("#comment-form")
const commentEmail = document.querySelector("#email")
const commentBody  = document.querySelector("#body")
//Get id from url
const urlsaerchparams = new URLSearchParams(window.location.search)
const postId = urlsaerchparams.get("id")

//Get All Post

async function getAllPost(){
    const response = await fetch(url)
    const data = await response.json()
    console.log(data)
    loadingElement.classList.add("hide")
    data.map((posts)=>{
        const div = document.createElement("div")
        const tittle = document.createElement("h2")
        const body = document.createElement("p")
        const link = document.createElement("a")

        tittle.innerText = posts.title
        body.innerText = posts.body
        link.innerText = "Ler"
        link.setAttribute("href", `/post.html?id=${posts.id}`)
        link.setAttribute("target", "_blank")
        div.appendChild(tittle)
        div.appendChild(body)
        div.appendChild(link)
        postsConteiner.appendChild(div)

    })
}

//Get individual post
async function getPost(id){
    const [responsePost, responseComments] = await Promise.all([
        fetch(`${url}/${id}`),
        fetch(`${url}/${id}/comments`)
    ])

    const dataPost = await responsePost.json()
    const dataComments = await responseComments.json()
    loadingElement.classList.add("hide")
    postPage.classList.remove("hide")
    const tittle = document.createElement("h2")
    const body = document.createElement("p")
    tittle.innerText = dataPost.title
    body.innerText = dataPost.body
    postConteiner.appendChild(tittle)
    postConteiner.appendChild(body)

    dataComments.map((comment)=>{
        createComment(comment)
    })
}

function createComment(comment){
    const div = document.createElement("div")
    const email = document.createElement("h3")
    const commentBody = document.createElement("p")

    email.innerText = comment.email
    commentBody.innerText = comment.body

    div.appendChild(email)
    div.appendChild(commentBody)

    commentsConteiner.appendChild(div)

}

//Post comment
async function postComment(comment){
    const response = await fetch(`${url}/${postId}/comments`, {
        method: "POST",
        body: comment,
        headers: {
            "Content-type": "application/json"
        }
    })

    const data = await response.json()

    createComment(data)
}
if(!postId){
    getAllPost()
}else{
    getPost(postId)
    commentForm.addEventListener("submit", (e)=>{
        e.preventDefault()
        let comment = {
            email: commentEmail.value,
            body: commentBody.value
        }

        comment = JSON.stringify(comment)

        postComment(comment)
    })
    //add event to form
}
