const express = require('express');
const fileUpload = require('express-fileupload');
const Media = require('../models/media');
const app = express();

const fs = require('fs');
const path = require('path');

app.use(fileUpload()); 
//========================== Media ==========================
// Obtener media

// Crear media
app.put('/:type/:id', ( req, res ) => {
    const type = req.params.type;
    const id = req.params.id;

    if ( !req.files ) {
        return res.status(400).json({
            ok: false,
            message: 'Ningun archivo fue seleccionado'
        });
    }

    //Validar tipo
    const validTypes = ['products'];
    if ( validTypes.indexOf( type ) < 0 ) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'Los tipos permitidos son: ' + validTypes.join(', ')
            }
        })
    }

    const file = req.files.newFile;
    const fileNameCropped = file.name.split('.');
    const extention = fileNameCropped[ fileNameCropped.length - 1 ];

    // Exensiones permitidas
    // const validExtensions = ['png', 'jpg', 'gif', 'jpeg'];
    // if ( validExtensions.indexOf(extention) < 0 ) { //la extension no esta en validExt
    //     return res.status(404).json({
    //         ok: false,
    //         message: 'Las extensiones validas son: ' + validExtensions.join(', '),
    //         extRecieved: extention
    //     })
    // }
    // fileExist

    // Cambiar nombre al archivo
    const fileName = `${ id }-${ new Date().getMilliseconds() }.${ extention }`;

    // mv: move 
    file.mv(`uploads/${ type }/${ fileName }`, err => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }   // La imagen ya fue cargada
        res.json({
            ok: true,
            message: 'Archivo subido.'
        });
    });
});

// Eliminar media
// Editar media 

function userImage() {}

function productImage() {}

function deleteFile( fileName, type ) {

    let pathFile = path.resolve(__dirname, `../../uploads/${ type }/${ fileName }`);
    if ( fs.existsSync(pathFile) ) {
        fs.unlinkSync(pathFile);
    }

}

// usar media Schema para crear los files
function fileExist( folder, type ) {
    const pathFile = path.resolve(__dirname, `../../uploads/${ type }/${ folder }`);
    if ( fs.existsSync(pathFile) ) {
        console.log('el archivo ya extiste');
    } else {
        fs.mkdirSync( pathFile );
        console.log( 'Archivo creado' );
    }
}

module.exports = app;