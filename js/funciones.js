var carta;
var strNroOrden;
var maxZoom;
var baseUrl = "http://www.ign.gob.ar";

var datos;
$.getJSON("./data/galeria.json", function(json){
    datos = json;
    galeria();
});

/* Mapa */
var map = L.map('mapa', {
 zoomControl: false,
}).setView([0, 0], 1);
L.control.zoom({position:'topright'}).addTo(map);

var capa;

function agregarCarta(strNroOrden) {
 var tilePath = baseUrl + '/teselas/' + strNroOrden + '/{z}/{x}/{y}.png'
 capa = L.tileLayer(tilePath, {
   maxZoom: maxZoom,
   tms: true,
   noWrap: true,
   attribution: '<a href="http://www.ign.gob.ar" target="_blank">Instituto Geográfico Nacional de la República Argentina</a>'
 }).addTo(map);
 map.setView([0,0],2);
}

/* side bar */
function w3_open() {
  document.getElementById("main").style.marginLeft = "180px";
  document.getElementById("mySidebar").style.width = "180px";
  document.getElementById("mySidebar").style.display = "block";
  document.getElementById("openNav").style.display = 'none';
}
function w3_close() {
  document.getElementById("main").style.marginLeft = "0";
  document.getElementById("mySidebar").style.display = "none";
  document.getElementById("openNav").style.display = "inline-block";
}

/* inicializar galería */
var options = {
  valueNames: [
    'tituloCorto',
    { attr: 'src', name: 'imagen' }
  ],
  page: 9,
  pagination: true,
  item: '<li class="w3-animate-opacity w3-tooltip"><img class="imagen" class="carta-prev"><div class="tituloCorto w3-text w3-tag w3-card" style="position:absolute;z-index:1000 !important"></div></li>'
  // item: '<li class="w3-animate-opacity"><img class="imagen" class="carta-prev"></li>'
};

/* mostrar carta */
function mostrarCarta() {
  $('.imagen').click(function() {
    var urlThumb = this.src;
    strNroOrden = urlThumb.split('/').pop().split('.')[0];
    carta = parseInt(strNroOrden);
    if (typeof capa !== 'undefined' || capa) {
      map.removeLayer(capa);
    }
    verDatos(carta);
    agregarCarta(strNroOrden);
    $('#mapa').css('opacity', '1');
  });
}

/* mostrar datos de la carta */
function verPanelDatos(accion) {
  if (accion == 'no') {
    $('#panel-datos').addClass('w3-hide');
  } else {
    $('#panel-datos').removeClass('w3-hide');
  }
}
function verDatos(carta) {
  for (var i = datos.length - 1; i >= 0; i--) {
    if (datos[i].nroOrden == carta) {
      maxZoom = datos[i].maxZoom;
      $('#nro-orden').text(datos[i].nroOrden);
      $('#notas').text(datos[i].notas);
      $('#escala').text('Escala: ' + datos[i].escala);
      $('#lugar').text(datos[i].lugarEdicion);
      $('#desc-fisica').text(datos[i].descripFisica);
      $('#titulo').text(datos[i].titulo);
      $('#inventario').text(datos[i].nroInventario);
    }
  }
  verPanelDatos();
}

$(document).ready(function() {
});
  
function galeria() {
  /* Saludo por consola del navegador */
  console.atlas = function( msg){
    console.log( "%c %s %s %s ", "font-family: 'Alegreya', serif; font-size: large; color: white; background-color: #0695d6;", "--", msg, "--");
  };
  console.saludo = function( msg){
    console.log( "%c %s ", "color: #0695d6;", msg);
  };
  console.atlas("Atlas de Cartografía Histórica - Instituto Geográfico Nacional");
  console.saludo("Hola! Podés encontrar el código fuente de nuestros desarrollos en nuestra cuenta de GitHub: https://github.com/ign-argentina");
  
  var lista = new List('galeria', options, datos);
  filtrar('cat-p');
  $('.btnProvincias').toggleClass('w3-white');
  
  /* filtrar por categoria */
  function filtro(cat) {
    lista.filter(function(item) {
      if (item.values().categoria == cat) {
        return true;
      } else {
        return false;
      }
    });
  }
  function filtrar(cat) {
    filtro(cat);
    mostrarCarta();
  }
  
  $(".tablink").click(function () {
    $('#buscar').val('');
    $('.tablink').removeClass('w3-white');
    $(this).toggleClass('w3-white');
    var cat = $(this).attr('categ');
    filtrar(cat);
  });
  
  $("#btn-datos").click(function () {
    $('#tabla').toggleClass('w3-hide');
    $('#notas').toggleClass('w3-hide');
    $(this).toggleClass('btnArgentina');
    $(this).toggleClass('btnCiudades');
    if ($(this).text() == "ver notas") {
      $(this).text('ver ficha');
    } else {
      $(this).text('ver notas');
    }
  });
  
  $("#buscar").focus(function () {
    $('.tablink').removeClass('w3-white');
    lista.filter();
  });
  $(".abrirCerrar").click(function () {
    $("ul.pagination").toggleClass("w3-hide");
    $("ul.list").toggleClass("w3-hide");
    $("#panel").toggleClass("panel");
    $("#panel").toggleClass("w3-animate-bottom");
    $("#panel").toggleClass("panel-cerrado");
  });
  $(".cerrar-panel-datos").click(function () {
    $("#panel-datos").toggleClass("w3-hide");
  });
}