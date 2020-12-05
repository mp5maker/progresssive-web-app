export const register = () => {
    if ("serviceWorker" in navigator) {
        const onSuccessRegister = (registration: any) => {
            console.log("SW Register Success: ", registration.scope);
        }
        const onErrorRegister = (error: any) => {
            console.log("SW Register Error: ", error);
        }

        navigator.serviceWorker
            .register("/sw.js")
            .then(onSuccessRegister)
            .catch(onErrorRegister);
    } else console.log("Your browser do not support service worker");
}