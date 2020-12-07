const jwt = require('jsonwebtoken');

// =================================
// Verificar Token
// =================================
let verifyToken = ( req, res, next ) => {
    let token = req.get( 'Authorization' );
    // console.log(token);
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
// Verificar AdminRole
// =================================
let verifyAdmin_Role = ( req, res, next ) => {
    let user = req.user; 
    if ( user.role === 'Admin' ) {
        next();
    } else {
        return res.json({
            ok: false,
            message: 'The user is not an admin'
        });
    }
};

module.exports = {
    verifyToken,
    verifyAdmin_Role
}
