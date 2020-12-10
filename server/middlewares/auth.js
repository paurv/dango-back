const jwt = require('jsonwebtoken');

// =================================
// Verificar Token
// =================================
let verifyToken = ( req, res, next ) => {
    let token = req.get( 'Authorization' );
    jwt.verify( token, process.env.SEED, ( err, decoded ) =>{
        if( err ) {
            return res.status(401).json({
                ok: false,
                err
            });
        }
        req.user = decoded.user;
        next();
    });
};

// =================================
// Verificar Rol Administrador
// =================================
let verifyAdmin_Role = ( req, res, next ) => {
    let user = req.user; 
    if ( user.role === 'Admin' ) {
        next();
    } else {
        return res.json({
            ok: false,
            message: 'El usuario no es Admin'
        });
    }
};

// =================================
// Verificar Rol Empresa
// =================================
let verifyCompany_Role = ( req, res, next ) => {
    let user = req.user; 
    if ( user.role === 'Empresa' ) {
        next();
    } else {
        return res.json({
            ok: false,
            message: 'El usuario no es Empresa'
        });
    }
};

// =================================
// Verificar cliente
// =================================
let verify_AdminComp = ( req, res, next ) => {
    let user = req.user; 
    if ( user.role === 'Empresa' || 'Admin' ) {
        next();
    } else {
        return res.json({
            ok: false,
            message: 'El usuario no es Empresa'
        });
    }
};

module.exports = {
    verifyToken,
    verifyAdmin_Role,
    verifyCompany_Role,
    verify_AdminComp
}
