// Exercise 1
function compareToTen(num){
    let mypromise = new Promise((resolve, reject) => {
        if(num <= 10){
            resolve(num + " is less than or equal to 10, success!");
        } else {
            reject(num + " is greater than 10, error!");
        }
    });
    return mypromise; 
}

compareToTen(15)
  .then(result => console.log(result))
  .catch(error => console.log(error))

compareToTen(8)
  .then(result => console.log(result))
  .catch(error => console.log(error))


function compareToTenV2(num) {
  return new Promise((resolve, reject) => {
    num <= 10
      ? resolve(`${num}  less or equal to 10`)
      : reject(`${num}  greater than 10`);
  });
}

compareToTenV2(15)
  .then(console.log)
  .catch(console.error);

compareToTenV2(8)
  .then(console.log)
  .catch(console.error);


// Exercise 2
let promises = new Promise((resolve,reject)=>{
   setTimeout(()=>{
    resolve("success")
   },4000)
});
promises.then((result)=>console.log(result))


const waitForSuccess = new Promise((resolve) => {
  setTimeout(() => resolve(" Success after 4s"), 4000);
});

waitForSuccess.then(console.log);


// Exercise 3
Promise.resolve(3).then((result)=>console.log(result))
Promise.reject("Error").catch((error)=>console.log(error))


Promise.resolve(3)
  .then(value => console.log("Resolved with:", value));

Promise.reject("Boo!")
  .catch(err => console.error("Rejected because:", err));
