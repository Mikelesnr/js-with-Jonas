//importing module
// import { addToCart, totalPrice as price, qt } from './shoppingCart.js';
// console.log('importing module');
// addToCart('bag', 20);
// console.log(price, qt);

import * as ShoppingCart from './shoppingCart.js'

// console.log(ShoppingCart.totalPrice);
ShoppingCart.addToCart('tea', ShoppingCart.totalPrice);

//* imports are not copies of exports but a live connection

// in modules you can use await outside of async function
// but this blocks the main execution thread
// const res = await fetch('https://jsonplaceholder.typicode.com/posts');
// const data = await res.json();
// console.log(data);

// const getaLastPost = async function (){
//     const res = await fetch('https://jsonplaceholder.typicode.com/posts');
//     const data = await res.json();
//     // console.log(data)

//     return {title: data.at(-1).title, text: data.at(-1).body}
// };

// const lastPost = getaLastPost();
// // console.log(lastPost);

// //not very clean
// // lastPost.then(last => console.log(last));

// //top level await
//  const lastPost2 = await getaLastPost();
// //  console.log(lastPost2)

// //ify -> function that runs as soon as it is created
// const shoppingCart2 = (function () {
//     const cart = []
//     const shippingCost = 10;
//     const totalPrice = 237;
//     const totalQuantity = 23;

//     const addToCart = function (product, quantity) {
//         cart.push({product, quantity});
//         console.log(`${quantity} ${product} added to cart (shipping cost is ${shippingCost})`);
//     };

//     const orderStock = function (product,quantity) {
//         console.log(`${quantity} ${product} ordered from supplier`);
//     };

//     return{
//         addToCart,
//         cart,
//         totalPrice,
//         totalQuantity
//     }
// })();

// shoppingCart2.addToCart('apple', 2);
// shoppingCart2.addToCart('pizza',2);
// console.log(shoppingCart2);
// console.log(shoppingCart2.shippingCost)

//common js eg npm

//npm

import cloneDeep from './node_modules/lodash-es/cloneDeep.js'
// import { cloneDeep } from '/lodash-es';

const state = {
    cart:[
        {product: 'bread', quantity: 5},
        {product: 'pizza', quantity: 6}
    ],
    user: { loggedIn: true},
};

const stateClone = Object.assign({}, state);
console.log(stateClone);
const stateDeepClone = cloneDeep(state);

state.user.loggedIn = false;
console.log(stateClone)

console.log(stateDeepClone);

// bundling with parcel and npm scripts

// keeps page from reloading when we save using parcel
// if(module.hot){
//     module.hot.accept()
// }

// import '/core-js/stable'