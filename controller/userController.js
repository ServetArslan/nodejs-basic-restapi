const {
    findAll,
    findByID,
    addUserModel,
    updateUserModel,
    deleteUserModel
} = require("../model/userModel")
const {
    getPostData
} = require("../utils")

const getUsers = async (req, res) => {
    try {
        const usersList = await findAll();
        res.writeHead(200, {
            'Contet-Type': 'application/json'
        })
        res.end(JSON.stringify(usersList))
    } catch (error) {
        console.log(error);
    }
}

const getUser = async (req, res, id) => {
    try {
        const user = await findByID(id)
        if (user) {
            res.writeHead(200, {
                'Contet-Type': 'application/json'
            })
            res.end(JSON.stringify(user))
        } else {
            res.writeHead(200, {
                'Contet-Type': 'text/html'
            })
            res.end("User not found")
        }
    } catch (error) {

    }
}

const addUser = async (req, res) => {
    try {

        const getData = await getPostData(req)

        const {
            name,
            email
        } = JSON.parse(getData)

        const user = {
            name,
            email
        }
        const data = await addUserModel(user)
        res.writeHead(201, {
            'Contet-Type': 'application/json'
        })
        res.end(JSON.stringify(data))

    } catch (error) {

    }
}

const updateUser = async (req, res, id) => {
    try {
        const user = await findByID(id)

        if (user) {

            const getData = await getPostData(req)
            const {
                name,
                email
            } = JSON.parse(getData)

            const data = {
                name: name || user.name,
                email: email || user.email
            }

            const userUpt = await updateUserModel(id, data)

            res.writeHead(200, {
                'Contet-Type': 'application/json'
            })

            res.end(JSON.stringify(userUpt))
        } else {
            res.writeHead(200, {
                'Contet-Type': 'text/html'
            })
            res.end("User not found")
        }
    } catch (error) {

    }
}

const deleteUser = async (req, res, id) => {
    try {
        const user = await findByID(id)
        if (user) {
            deleteUserModel(id)
            res.writeHead(200, {
                'Contet-Type': 'text/html'
            })
            res.end("user deleted")
        } else {
            res.writeHead(200, {
                'Contet-Type': 'text/html'
            })
            res.end("User not found")
        }
    } catch (error) {

    }
}

module.exports = {
    getUsers,
    getUser,
    addUser,
    updateUser,
    deleteUser
}