if('serviceWorker' in navigator){
    navigator.serviceWorker.register('/myFirstTestPage/sw.js')
    .then((reg)=> console.log('Service worker has been successfully registered',reg))
    .catch((err)=> console.log('Service worker has been rejected',err));
}
