const moongoose = require('mongoose');

const dbConnection = async () => {

  try {
    // conexión a la base de datos
    await moongoose.connect(process.env.MONGODB_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    });

    console.log('Base de datos Online');


  } catch (error) {
    console.log(error);
    throw new Error('Error a la inicializar la base de datos');
  }

}


module.exports = {
  dbConnection
};