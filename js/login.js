function loguearme(valor){
    switch (valor){
        case 'alumno':
            window.open("./modulo_alumno/inicio/index.html")
            break;
        break;
        case 'padre':
            window.open("./modulo_padre/index.html")
            break;
        case 'profesor':
            window.open('./modulo_profesor/index.html');
        break;
        default:
            break;
    }
}