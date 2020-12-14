const express = require('express');
const Stores = require('../models/stores');
const { urlParser } = require('../middlewares/urlMw');
const { verifyAdmin_Role,
        verifyToken,
        verifyCompany_Role,
        verify_AdminComp } = require('../middlewares/auth');
const _ = require('underscore');

const app = express();

// TIENDAS
// obtener tiendas (sin autenticacion)
app.get('/', ( req, res) => {
    Stores.find()
        .exec()
        .then( allStores => {
            res.json({
                ok: true,
                allStores
            });
        }).catch( err => {
            res.status(400).json({
                ok: false,
                err
            });
        });
});

// Obtener tienda Usuario
app.get('/user', verifyToken, ( req, res ) => {
    const filter =  {owner: req.user._id};
    Stores.findOne( filter )
            .then( storeUser => {
                res.json({
                    ok: true,
                    storeUser
                });
            }).catch( err => {
                res.status(400).json({
                    ok: false,
                    err
                });
            });
});

// Crear tiendas
app.post('/', [urlParser, verifyToken, verifyCompany_Role], (req, res) => {
    const body = req.body;
    const store = new Stores({
        owner: req.user._id,
        name: body.name,
        storeUrl: body.storeUrl
    });
    store.save()
        .then( resp => {
            res.json({
                ok: true,
                store: resp
            });
        }).catch( err => {
            res.status(400).json({
                ok: false,
                error: err
            })
        });
});

// Eliminar tiendas
app.delete('/:idStore', [verifyToken, verifyAdmin_Role], ( req, res ) => {
    const id = req.params.idStore;
    Stores.findByIdAndRemove( id )
        .then( deletedStore => {
            res.json({
                ok: true,
                deletedStore
            });
        }).catch( err => {
            res.status(400).json({
                ok: false,
                err
            });
        });
});

// bloquear tiendas
app.put('/:idStore', [verifyToken, verifyAdmin_Role], ( req, res ) => {
    const id = req.params.idStore;
    const data = _.pick( req.body, ['blocked'] );

    Stores.findByIdAndUpdate( id, data, { new: true, runValidators: true} )
        .then( blockedStore => {
            res.json({
                ok: true,
                blockedStore
            });
        }).catch( err => {
            res.status(400).json({
                ok: false,
                err
            })
        })
});

// actualizar header
app.put('/', [verifyToken], (req, res) => {
    const filter = {owner: req.user._id};
    const data = req.body;
    Stores.findOneAndUpdate( filter, data, { new: true, runValidators: true } )
            .then( updatedStore => {
                res.json({
                    ok: true,
                    updatedStore
                });
            }).catch( err => {
                res.status(400).json({
                    ok: false,
                    err
                });
            });
});

// actualizar footer
// app.put('/', verifyToken, (req, res) => {
//     console.log('entro');
//     const filter = {owner: req.user._id};
//     const data = req.body;
//     const update = {
//             "footer.email": data.email,
//             "footer.tel": data.tel
//         }
//     Stores.findOneAndUpdate( filter, update, { new: true, runValidators: true } )
//             .then( updatedFooter => {
//                 res.json({
//                     ok: true,
//                     updatedFooter
//                 });
//             }).catch( err => {
//                 res.status(400).json({
//                     ok: false,
//                     err
//                 });
//             });
// });

// PAGINAS
// Crear paginas 
app.put('/:idStore/page', [verifyToken, verify_AdminComp], ( req, res ) => {
    const filter = {_id: req.params.idStore, owner: req.user._id};
    const update = {
        "pages": {
            pageUrl: req.body.pageUrl,
            pageName: req.body.pageName,
            description: req.body.description,
            mainPage: req.body.mainPage
        }
    };

    Stores.countDocuments({'pages.pageUrl': update.pages.pageUrl}, ( countErr, count) => {
        if (countErr) { return res.status(400).json({ ok: false, message: countErr }) }
        if(count>0){
            res.status(405).json({
                ok: false,
                message: 'La url asignada ya existe'
            })
        } else {
            Stores.findOneAndUpdate( filter, {$push: update}, {new: true, runValidators: true})
                .then( newPage => {
                    res.json({
                        ok: true,
                        newPage
                    });
                }).catch( err => {
                    res.status(400).json({
                        ok: false,
                        err
                    });
                });
        }
    });
});

// Eliminar paginas
app.put('/:idStore/page/:idPage', [verifyToken], ( req, res ) => {
    const conditions = { _id: req.params.idStore, 'pages._id': req.params.idPage };
    const update = {'$pull': { pages: { _id: req.params.idPage } }};
    Stores.findOneAndUpdate( conditions, update, { new: true, runValidators: true } )
        .then( deletedStore => {
            res.json({
                ok: true,
                newPageArray: deletedStore.pages
            });
        }).catch( err => {
            res.status(400).json({
                ok: false,
                err
            });
        });
});

// agregar codigo
app.put('/:idStore/pageEdition/:idPage', verifyToken, ( req, res ) => {
    console.log(req);
    const conditions = { _id: req.params.idStore, 'pages._id': req.params.idPage };
    const update = { $set: { "pages.$.codeBlock": req.body } };

    Stores.findOneAndUpdate( conditions, update, { new: true, runValidators: true } )
        .then( updatesPages => {
            res.json({
                ok: true,
                updatesPages
            });
        }).catch( err => {
            res.status(400).json({
                ok: false,
                err
            });
        });
});

app.put('/:idStore/pageCssJs/:idPage', verifyToken, ( req, res ) => {
    const conditions = { _id: req.params.idStore, 'pages._id': req.params.idPage };
    const update = { pages: { $set: {codeBlock: req.body}  } };

    Stores.findByIdAndUpdate( conditions, update, { new: true, runValidators: true } )
        .then( updatesPages => {
            res.json({
                ok: true,
                updatesPages
            });
        }).catch( err => {
            res.status(400).json({
                ok: false,
                err
            });
        });
});

// Obtener Paginas x Usuario
app.get('/:idStore/pages', [verifyToken], ( req, res ) => {
    Stores.find()
        .exec()
        .then( allPages => {
            res.json({
                ok: true,
                allPages: allPages[0].pages
            });
        }).catch( err => {
            res.status(400).json({
                ok: false,
                err
            });
        });
});



module.exports = app;
