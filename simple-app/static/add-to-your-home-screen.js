(function() {
    let deferredPrompt;
    const BANNER_ID = 'banner'

    const banner = window.localStorage.getItem(BANNER_ID)
    const bannerElement = document.querySelector('.banner')
    if (banner !== 'not-needed') bannerElement.classList.add('active')

    const onBannerClick = () => {
        const newDeferredPromptPromise = new Promise((resolve) => {
            console.log(deferredPrompt)
            if (deferredPrompt && deferredPrompt.prompt) deferredPrompt.prompt()
            resolve()
        })

        newDeferredPromptPromise.then(() => {
            if (deferredPrompt && deferredPrompt.userChoice) {
                const onSuccessUserChoice = (choiceResult) => {
                    if (choiceResult.outcome == 'accepted')
                    bannerElement.classList.remove('active')
                    window.localStorage.setItem(BANNER_ID, 'not-needed')
                }

                deferredPrompt.userChoice.then(onSuccessUserChoice)
            }
        })
    }

    bannerElement.addEventListener('click', onBannerClick)
    window.addEventListener('beforeinstallprompt', (event) => {
        event.preventDefault()
        deferredPrompt = event;

    })
})()