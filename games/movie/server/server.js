const path = require('path')
const express = require('express')
const app = express()

app.use(express.static(path.join(__dirname,'../public')))

// port
const PORT = 3000 || process.env.PORT

app.listen(PORT, ()=>console.log(`server running on port ${PORT}`))