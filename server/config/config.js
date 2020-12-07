// se declaran const variables de forma global...

//======================================
//  Puerto
//======================================
process.env.PORT = process.env.PORT || 8888;

//======================================
//  Entorno
//======================================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//======================================
//  Vencimiento del token
//======================================
// 60sec * 60min * 24hr = 1DAY
process.env.EXP_TOKEN = 60 * 60 * 24 * 15;

//======================================
//  Semilla de auth
//======================================
process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';

//======================================
//  DB
//======================================
let urlDB;

if ( process.env.NODE_ENV === 'dev' ) {
    urlDB = 'mongodb://localhost:27017/dango'
} else {
    // urlDB = 'mongodb+srv://dango-user:7BQq1tkZ2ooWI7dT@cluster0.xycu9.mongodb.net/dango?retryWrites=true&w=majority'
    urlDB = process.env.MONGODB_URI;
}

// usar url para cambiar conexion
process.env.URLDB =  urlDB;
