# promise-refactoring

Contains a small refactoring exercise for JavaScript Promises:

- before.js: Before the code is refactored
- after.js: After the exercise is completed

Common pitfalls captured:

- then() doesn't always need a promise object returned (you can have normal synchronous code)
- Always promosify a callback to its lowest level (the original function with callback)
- If a library has been promisified, use the promisified version
- Don't use `new` to create a new Promise. You can use `Promise.resolve()`.
