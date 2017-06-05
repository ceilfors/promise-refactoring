# promise-refactoring

Contains a small refactoring exercise for JavaScript Promises:

- before.js: Before the code is refactored
- after.js: After the exercise is completed

Common pitfalls captured:

- then() doesn't always need a promise object returned, you can have normal synchronous code where `return` and `throw` would work.
- Always promosify a callback functions first before using them.
- If a library has been promisified, use the promisified version.
- Don't use `new` to create a new Promise, generally the above would have remove the need of creating one manually.
