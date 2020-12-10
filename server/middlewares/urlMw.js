
// =================================
// Quitar espacios url
// =================================
let urlParser = ( req, res, next ) => {
    let url = req.body.storeUrl;
    url = url.replace(/\s+/g, '');
    req.body.storeUrl = '/'+url;
    next();
};

module.exports = {
    urlParser
}
