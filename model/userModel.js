const users = require("../data/users.json")
const {
    v4: uuidv4
} = require('uuid');
const {
    writeFile
} = require("../utils")

function findAll() {
    return new Promise((res, rej) => {
        res(users)
    })
}

function findByID(id) {
    return new Promise((res, rej) => {
        const user = users.find(u => u.id == id)
        res(user)
    })
}

function addUserModel(user) {
    return new Promise((res, rej) => {
        const newUser = {
            id: uuidv4(),
            ...user
        }
        users.push(newUser)
        writeFile("./data/users.json", users)
        res(users)
    })
}

function updateUserModel(id,data){
    return new Promise((res,rej)=>{
        const index = users.findIndex(i=>i.id==id)
        users[index] = {id,...data}
        writeFile('./data/users.json', users)
        res(users)
    })
}

function deleteUserModel(id){
    return new Promise((res,rej)=>{
        const newUsersList = users.filter(i=>i.id!=id)
        writeFile('./data/users.json', newUsersList)
        res(users)
    })
}

module.exports = {
    findAll,
    findByID,
    addUserModel,
    updateUserModel,
    deleteUserModel
}