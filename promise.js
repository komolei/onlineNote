

// function cb(err, result) {
//   if (err) console.log(err.stack);
//   console.log(result);
//   return result.toUpperCase();
// }
// function foo() {
//   console.log('params');
//   setTimeout(() => {
//     cb(null, 'qef');
//   }, 1000);
// }
// foo();

// (async () => {
//   async function useFoo() {
//     const foo1 = new Promise((resolve, reject) => {
//       setTimeout(() => {
//         console.log('fadfa');
//       }, 2000);
//     });
//     return foo1;
//   }
//   await useFoo();
// })();

// console.log('u',u);
// useFoo().then().catch(err => console.log(err));

// const p = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve('done');
//     console.log('cb');
//   }, 1000);
// });
// p.then((r) => {
//   console.log(r);
//   return new Promise((resolve, reject) => {
//     setTimeout(() => resolve('step2'), 2000);
//   });
// }).then(r => console.log(`this result is ${r};`)).catch(e => console.log(e));


// async function foo() {
//   return 'komolei';
// }
// // console.log(foo());
// const p = foo();
// console.log(p);
// p.then(r => console.log(r));


// async function bar() {
//   const p = new Promise((resolve, reject) => {
//     resolve('done');
//   });
//   return p;
// }
//
// async function foo() {
//   const barResult = await bar();
//   console.log(barResult);
// }
//
// foo();

function foo(params, cb) {
  setTimeout(() => {
    cb(null, 'xixi');
  }, 2000);
}
// foo(null, () => {
//   console.log('done');
// });

async function newFoo(params) {
  return new Promise((resolve, reject) => {
    foo(params, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
}
(async () => {
  const p = await newFoo({});
  console.log(p);
})();
