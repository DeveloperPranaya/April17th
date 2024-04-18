// const jsonServer = require('json-server')
// const server =jsonServer.create();
// const router = jsonServer.router('./db.json');
// const middlewares = jsonServer.defaults(
//     {
//         static:'./build'
//     }
// );

// const port =process.env.PORT || 4000;
// const cors = requie('cors');
// const corsOptions ={
//     origin:'*',
//     credentials:"true",
//     optionSuccessStatus:200
// };

// server.use(cors(corsOptions));

// server.use(middlewares);
// server.use(
//     jsonServer.rewriter({
//         "/api/*":"/$1"
//     })
// );

// server.use(router);
// server.listen(port,()=>{
//     console.log("server is running on ${port}")
// })


const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use(router)
server.listen(process.env.PORT, () => {
  console.log('JSON Server is running')
})
