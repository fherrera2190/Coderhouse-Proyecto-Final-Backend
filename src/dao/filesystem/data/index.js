const fs = require('fs');

const leerJson = async (path) => {
    try {
        let datos = await fs.promises.readFile(path, 'utf-8');
        return datos;
    } catch (error) {
        console.error('Error al leer el archivo:', error);
        return null;
    }
};

const escribirJson = async (path, productos) => {
    try {
        await fs.promises.writeFile(path, JSON.stringify(productos, null, 5));
        console.log('Archivo escrito con éxito');
    } catch (error) {
        console.error('Error al escribir en el archivo:', error);
    }
};

const existe = (path) => {
    return fs.existsSync(path);
}

module.exports = {
    leerJson,
    escribirJson,
    existe
}