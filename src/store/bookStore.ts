import { observable } from "mobx"

const store = observable({})

export function createBookStore() {
  return {
    book: store,
    get bookInfo() {
      return this.book
    },
    setBookName(name: string) {
      (this.book as any).name = name
    },
  }
}
