/**
 * Created by libo on 2017/8/9.
 */
function getRandom(min,max) {
  return Math.floor(Math.random() * ( max - min + 1)+min)
}
export function shuffle(arr) {
  let _arr = arr.slice()

  for (let i = 0;i <_arr.length;i++){
     let j = getRandom(0,i)
     let  t = _arr[i]
    _arr[i] = _arr[j]
    _arr[j] = t
  }
  return _arr
}

export function debounce(func,delay) {

  let timer;

  return function (...args) {
    if (timer){
      clearTimeout(timer)
    }
    timer = setTimeout(()=>{
      func.apply(this,args)

    },delay)
  }
}
