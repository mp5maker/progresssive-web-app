(function() {
    function init() {
        if ('serviceWorker' in navigator) {
            const onSuccessRegister = (registration) => console.log("SW Register Success: ", registration.scope)
            const onErrorRegister = (error) => console.log("SW Register Error: ",error)

            navigator.serviceWorker.register('/sw.js')
                .then(onSuccessRegister)
                .catch(onErrorRegister)
        } else console.log('Your browser do not support service worker')

        const onSuccessPosts = (response) => {
            const postsElement = document.querySelector('.posts')
            if (response && response.data && Array.isArray(response.data)) {
                const posts = response.data

                posts.forEach((post) => {
                    const { title, body } = post
                    const articleElement = document.createElement('article')
                    const titleDivElement = document.createElement('div')
                    const titleElement = document.createElement('h6')
                    const bodyElement = document.createElement('div')

                    titleElement.innerText = title
                    titleElement.classList.add('post-title')
                    bodyElement.innerText = body
                    bodyElement.classList.add('post-body')

                    titleDivElement.appendChild(titleElement)
                    articleElement.appendChild(titleDivElement)
                    articleElement.appendChild(bodyElement)
                    articleElement.classList.add('post')

                    postsElement.appendChild(articleElement);
                })

            }
        }

        const onErrorPosts = (error) => error && error.response && console.log(error.response)

        axios.get("https://jsonplaceholder.typicode.com/posts/")
            .then(onSuccessPosts)
            .catch(onErrorPosts)
    }
    window.onload = init
})()