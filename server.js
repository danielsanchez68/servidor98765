//https://www.npmjs.com/package/express
//https://expressjs.com/
//npm i express

const express = require('express')
//import express from 'express'


let contadorVisitas = 0

const controladorDefault = (req,res) => {
    const { method, url } = req
    res.status(404).send(`<h3 style="color:red;">Ruta ${method} <span style="color:purple;">${url}</span> no implementada</h3>`)
}

//console.log('__dirname:', __dirname)

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use((req,res,next) => {         // middleware personalizado
    const { method, url } = req
    console.log('---------------')
    console.log('method:', method)
    console.log('url:', url)
    console.log('---------------')

    if(url == '/' && method == 'GET') contadorVisitas++

    //res.send('Soy el middleware personalizado')
    //if(contadorVisitas >= 10) res.send('Ud ha alcanzado el número máximo de visitas para este sitio')
    //else next()
    next()
})

app.use((req,res,next) => {
    console.log('Soy otro middleware personalizado!')
    //res.send('Soy otro middleware personalizado!')
    next()
})

app.use(express.static('public'))   // middleware del servicio de recursos estáticos de express

// -------------------------------------------------------
//             Proceso de las rutas GET
// -------------------------------------------------------

app.get('/', (req,res) => {
    //contadorVisitas++
    //res.sendFile('C:\\Cursos\\CursoNodeBackend\\3\\Clase5\\HTTP-Express\\public\\index.html')
    //res.sendFile('C:/Cursos/CursoNodeBackend/3/Clase5/HTTP-Express/public/index.html')
    //res.sendFile(__dirname + '/public/index.html')  // sólo para CommonJS
    //res.sendFile(process.cwd() + '/public/index.html')  // para CommonJS y ES Modules
    res.sendFile(process.cwd() + '/views/index.html')  // para CommonJS y ES Modules
})

app.get('/saludo', (req,res) => {
    res.send('<h3>Hola NodeJS desde Express</h3>')
})

app.get('/visitas', (req,res) => {
    res.send(`<h3>Ud visitó este sitio ${contadorVisitas} ${contadorVisitas == 1 ? 'vez' : 'veces'}</h3>`)
})

app.get('/datos/:nombre/:apellido?/:edad?', (req,res) => {
    const { query, params, body } = req
    //res.send('Ruta GET /datos recibida!')
    res.json({ query, params, body:body })
})

app.get('/login', (req,res) => {
    const { query } = req
    console.log({ query })
    //res.json({ query })
    //res.send('Datos recibidos!')
    res.redirect('/')
})


app.get('*', controladorDefault)

// -------------------------------------------------------
//             Proceso de las rutas POST
// -------------------------------------------------------
app.post('/datos', (req,res) => {
    res.send('Ruta POST /datos recibida!')
})

app.post('/login', (req,res) => {
    const { body } = req
    console.log({ body })
    //res.send('Datos recibidos!')
    res.redirect('/')
})

app.post('*', controladorDefault)

// -------------------------------------------------------
//             Proceso de las rutas PUT
// -------------------------------------------------------
app.put('/datos', (req,res) => {
    res.send('Ruta PUT /datos recibida!')
})

app.put('*', controladorDefault)

// -------------------------------------------------------
//            Proceso de las rutas DELETE
// -------------------------------------------------------
app.delete('/datos', (req,res) => {
    res.send('Ruta DELETE /datos recibida!')
})

app.delete('*', controladorDefault)

// -------------------------------------------------------
//          Proceso del listen del servidor
// -------------------------------------------------------
const PORT = process.env.PORT || 8080
const server = app.listen(PORT, () => console.log(`Servidor Express escuchando en http://localhost:${PORT}`))
server.on('error', error => console.log(`Error en servidor Express: ${error.message}`))





