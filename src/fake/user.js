import { database } from './fake_database.js'


const users = database.get("users")


const getUserById = (id) => (
  users.find( user => user._id === id)
)


const getUnusedId = () => {
  const ids = users.reduce(( ids, user ) => {
    ids.push(user.id)
    return ids
  }, [])

  return Math.max(0, ...ids) + 1 
}


const addUser = ({ name, pass }) => {
  if (users.find( user => (
    user.name.toLowerCase() === name.toLowerCase()
  ))) {
    return `A user with the name "${name}" already exists.`
  }

  const _id = getUnusedId()
  const user = {
    _id,
    name,
    pass
  }

  users.push(user)

  database.save({ users })
}


export {
  getUserById
}