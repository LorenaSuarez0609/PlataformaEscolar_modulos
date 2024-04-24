parametros =  new URLSearchParams(window.location.search);
id = parametros.get('id');

id = 1

peticion = new XMLHttpRequest()
peticion.open('GET','padreInformacion.json')

peticion.onload = function(){

    if( peticion.status == 200 ){
    
        datos = JSON.parse(peticion.response);  

        data = datos.padres.find( function(element){
            return element.id == id
        })

        //Imagen para la cabecera
        imagenPadre = document.querySelector(".padre")
        imagen = document.createElement('img')
        imagen.src = data.img
        imagen.classList.add('img-padre')
        imagen.alt = data.altImg
        imagenPadre.appendChild(imagen)

        strongElement = document.createElement('strong')
        strongText = document.createTextNode(data.name + " " + data.surname)
        strongElement.style.fontSize = "20px"
        strongElement.style.paddingLeft = "20px"
        strongElement.appendChild(strongText)
        imagenPadre.appendChild(strongElement)

        


        //Mensaje de bienvenida
        bienvenida = document.querySelector(".bienvenida")
        bienvenidaText = document.createTextNode(data.bienvenida)
        bienvenida.appendChild(bienvenidaText)
        
        //Titulos de las notas pendientes del padre
        notas = document.querySelector(".notas")
        notasText = document.createTextNode("Mis notas pendientes")
        notas.appendChild(notasText)

    }
    else
        console.log("Error al cargar el JSON")
}
peticion.send()