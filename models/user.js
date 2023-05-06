// Requerimos la dependencia de mongoose para poder trabajar con MongoDB
const mongoose = require('mongoose');

//El esquema o tabla del modelo del user:
const userSchema = new mongoose.Schema({
    name: String, 
    email: String,
    passwordHash: String,
    verified: {
        type: Boolean,
        default: false
    },
    contacts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Contact'
    }]
});

// Configuro la respuesta del usuario
userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id; //borrar el "_id" del string para que no salga "id._id"
        delete returnedObject.__v; //borrar el numero de la version
        delete returnedObject.passwordHash; //para que no nos pase la contrase;a incriptada, esa la queremos dejar en el backend
    }
});

//Le damos un nombre:
const User =  mongoose.model('User', userSchema);

module.exports = User;

