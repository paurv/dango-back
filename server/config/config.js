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
