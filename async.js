
class Promise1 {
  constructor() {
    this.callback = [];
  }
  then(onSuccess, onFail) {
    this.callback.push({
      resolve: onSuccess,
      reject: onFail,
    });
    return this;
  }
  resolve(result) {
    return this.complete('resolve', result);
  }
  reject(result) {
    return this.complete('reject', result);
  }
  complete(type, result) {
    const fn = this.callback.shift();
    fn[type](result);
  }
}
const p = new Promise1();
// setTimeout(() => {
//   p.resolve('done');
// }, 2000);
console.log(p.then(r => console.log(r)));


const  test = val => console.log( val );
const test1 =val => test(val);
debugger;
test1(100)
