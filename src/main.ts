import { reactive, readonly } from './reactivity/index'


const obj = reactive({
  name: 'william',
  age: 18
})

const obj2 = readonly({
  name: 'john',
  age: 19
})

// get
console.log(obj.name, obj2.name)


// set
obj.age += 1

obj2.age += 1