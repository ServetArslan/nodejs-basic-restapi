const http = require("http")
const {
    getUsers,
    getUser,
    addUser,
    updateUser,
    deleteUser
} = require("./controller/userController")

const server = http.createServer((req, res) => {
    if (req.url === '/api/users' && req.method === 'GET') {
        getUsers(req, res)
    } else if (req.url.match(/\/api\/users\/([0-9]+)/) && req.method === "GET") {
        const id = req.url.split("/")[3]
        getUser(req, res, id)
    } else if (req.url === '/api/users' && req.method === 'POST') {
        addUser(req, res)

    } else if (req.url.match(/\/api\/users\/([0-9]+)/) && req.method === "PUT") {
        const id = req.url.split("/")[3]
        updateUser(req, res, id)
    } else if (req.url.match(/\/api\/users\/([0-9]+)/) && req.method === "DELETE") {
        const id = req.url.split("/")[3]
        deleteUser(req, res, id)
    } else {
        res.writeHead(404, {
            'Contet-Type': 'text/html'
        })
        res.end('ERROR - Invalid request')
    }

})


const port = process.env.PORT || 5000;

server.listen(port, () => {
    console.log(`PORT: ${port} - server is running`);
})