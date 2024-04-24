function funcionImprimir(){
    window.print();
    /*swal({title: "Imprimiendo", 
    text: "Clickea en el boton!", 
    icon: "success"});
    return false;*/
};

var contenido = document.querySelector('#contenido');

function traer(){
    fetch('./json/evaluaciones.json')
        .then( res => res.json())
        .then( datos => {
            tabla(datos)
        })
};

function tabla(datos) {
    contenido.innerHTML='';
    for(let valor of datos){
        contenido.innerHTML= `
        <tr>
            <th scope="row">${valor.id}</th>
            <td>${valor.first_name}</td>
            <td>${valor.last_name}</td>
            <td>${valor.id}</td>
            <td>${valor.id}</td>
            <td>${valor.id}</td>
            <td>${valor.id}</td>
            <td>${valor.id}</td>
            <td>${valor.id}</td>
            <td>${valor.id}</td>
            <td>${valor.id}</td>
            <td>${valor.id}</td>
            <td>${valor.id}</td>
            <td>${valor.id}</td>
            <td>${valor.id}</td>
        </tr>
        `
    }
}