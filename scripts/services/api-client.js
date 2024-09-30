//network call code


// export default function doNetworkCall(){
//     const URL= "https://gist.githubusercontent.com/kshirsagarps/36fade16fa39202715656ef487aaf7b0/raw/2b682e589ef283f06be42d2799dfa54f57794a6e/Pizza.json"
//     const promise= fetch(URL); //event loop-->synchronous,asynchronous
//     console.log('Promise is', promise); //done by event loop
//     promise.then(function(response){
//         console.log(response);
//     }).catch(function (err){
//         console.log('Error', err);
//     });
//     console.log("Good Bye");
// } 


// export default function getData(res){
//     console.log('Data comes ', res);
// }
// function doNetworkCall(fn){
//     const URL= "https://gist.githubusercontent.com/kshirsagarps/36fade16fa39202715656ef487aaf7b0/raw/2b682e589ef283f06be42d2799dfa54f57794a6e/Pizza.json"
//     const promise= fetch(URL);
//     console.log('Promise is', promise);   
//     promise.then(function(response){
//         fn(response);
//     }).catch(function (err){
//         console.log('Error', err);
//     });
//     console.log("Good Bye");
// }
// doNetworkCall(getData);


// export default function getData(res){
//     console.log('Data comes ', res); 
// }
// async function doNetworkCall(fn){
//     const URL= "https://gist.githubusercontent.com/kshirsagarps/36fade16fa39202715656ef487aaf7b0/raw/2b682e589ef283f06be42d2799dfa54f57794a6e/Pizza.json"
//     try{
//     const response = await fetch(URL);
//     console.log('Response is ', response);
//     }
//     catch(err){
//         console.log('Error', err);
//     }
//     console.log("Good Bye");
// }
// doNetworkCall(getData);

export default async function doNetworkCall(){
     const URL = 'https://raw.githubusercontent.com/Skill-risers/pizzajson/main/pizza.json';
    try{
        // const promise = fetch(URL);
        // promise.then(response=>{
        //     const promise2 = response.json();
        //     promise2.then(json=>console.log(json))
        //     .catch(e=>console.log('JSON error ', e))
        // }).catch(e=>console.log(e));
    const response = await fetch(URL);
    const object = await response.json(); // Deserialization-(JSON to object)
    console.log('Object is ', object);
    return object; // Wrap Object in Promise
    }
    catch(err){
        throw err;
    }
}