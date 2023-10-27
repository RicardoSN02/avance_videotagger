let tokenGuardar = "";

window.onload = function() {
  //document.querySelector('button').addEventListener('click', function() {
    chrome.identity.getAuthToken({interactive: true}, function(token) {
      tokenGuardar = token;
    });
  //});
};

document.addEventListener('DOMContentLoaded', function() {
  var boton = document.getElementById('consulta');
  var input = document.getElementById('labelConsultar');

  boton.addEventListener('click', function() {
    var texto = input.value;
    console.log(texto)
    consultarApi();
  });
});

async function consultarApi() {
  //while(true){
    let init = {
      method: 'GET',
      async: true,
      headers: {
        Authorization: 'Bearer ' + tokenGuardar,
        'Content-Type': 'application/json'
      },
      'contentType': 'json'
    };
    fetch(
        'https://www.googleapis.com/drive/v3/files?pageSize=10&fields=files(id,name)',
        init)
        .then((response) => response.json())
        .then(function(data) {
            const arreglo = data.files;

            arreglo.forEach(element => {
              console.log('id: ',element.id, " nombre: ",element.name);
            });
        });
 // }
}