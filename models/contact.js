// Requerimos la dependencia de mongoose para poder trabajar con MongoDB
const mongoose = require('mongoose');

//El esquema o tabla del modelo del user y especificamos sus propiedades(que si es un string o un booleano, etc)
const contactSchema = new mongoose.Schema({
    name: String, 
    number: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
});

// Configuro la respuesta del usuario
contactSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id; //borrar el "_id" del string para que no salga "id._id"
        delete returnedObject.__v; //borrar el numero de la version
    }
});

//Le damos un nombre:
const Contact =  mongoose.model('Contact', contactSchema);

module.exports = Contact;

