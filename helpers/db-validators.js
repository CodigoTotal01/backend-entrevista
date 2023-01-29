
const coleccionesPermitidas = ( coleccion = '', colecciones = []) => {
    const incluida = colecciones.includes( coleccion );
    if ( !incluida ) {
        throw new Error(`La colección ${ coleccion } no es permitida, ${ colecciones }`);
    }
    return true; //implicito en cada uno de estos metodos
}

module.exports ={
    coleccionesPermitidas
}
