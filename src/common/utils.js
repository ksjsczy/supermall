export function debounce(fn, delay) {
  let timer = null;
  return function (...args) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

 // debounce(fn, delay) {
    //   let timer = null;
    //   return function () {
    //     if (timer) {
    //       clearTimeout(timer);
    //     }
    //     timer = setTimeout(fn, delay);
    //   };
    // },
