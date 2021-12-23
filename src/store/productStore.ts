import { observable } from 'mobx'
const store = observable({})



export function createProductStore():any{
  return {
    data: [''],
    get dataInfo() {
      return this.data
    }
  }
}
