import { reactive } from './reactivity/index'


const obj = reactive({
  name: 'william',
  age: 18
})

// get
console.log(obj.name)


// set
obj.age += 1