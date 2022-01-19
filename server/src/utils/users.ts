class User {
  username: string
  password: string
  online: boolean
  rooms: []
  constructor(username: string, password: string) {
    this.username = username
    this.password = password
    this.rooms = []
    this.online = false
  }
}

const users: User[] = []

function removeFormArray(array: any[], item: any) {
  let index = array.findIndex((value) => value === item)
  if (index > -1) {
    array.splice(index, 1)
  }
}

export { User, users, removeFormArray }
