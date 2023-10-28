// Desplazamiento suave (scrolling)
$(document).ready(function() {
  // Agrega el desplazamiento suave al hacer clic en los enlaces de navegación
  $('a').on('click', function(e) {
    if (this.hash !== '') {
      e.preventDefault();

      const hash = this.hash;
      const targetOffset = $(hash).offset().top;
      const navbarHeight = $('.navbar').outerHeight();

      $('html, body').animate({
        scrollTop: targetOffset - navbarHeight
      }, 700);
    }
  });
});

// Cambiar color de navbar y el dsiplay del scroll top
$(window).scroll(function() {
  var scroll = $(window).scrollTop();
  if (scroll >= 50) {
    $(".navbar").addClass("scroll");
    $(".nav").addClass("scroll");
    $(".divTop").css("display","flex");
  } else {
    $(".navbar").removeClass("scroll");
    $(".nav").removeClass("scroll");
    $(".divTop").css("display","none");
  }
});

// Enviar correo
(function() {
  emailjs.init('dEsShv_WuFfHTrXL8');
})();

function enviarCorreo() {
  // crear variables
  var nombre = document.getElementById('nombre').value;
  var mensaje = document.getElementById('mensaje').value;
  var correo = document.getElementById('correo').value;
  var template_params = { from_name: nombre, message: mensaje, email: correo}
  
  var emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
  var nameTest = /^[A-Za-z]+$/;

  if ((nombre == "") || (mensaje == "") || (correo == "")) {
    swal({
      icon: "error",
      title: "Campos vacíos",
      text: "Debes rellenar todos los campos",
      timer: 3000,
      buttons: false
    });
  } else if (!nameTest.test(nombre)) {
    swal({
      icon: "error",
      title: "Nombre incorrecto",
      text: "El Nombre solo puede contener letras",
      timer: 2000,
      buttons: false
    });
  } else{
    if (emailRegex.test(correo)){
      //enviar email
      emailjs.send("service_mrv97a5", "template_vs06xjq", template_params 
      ).then(function(response) {
        swal({
          icon: "success",
          title: "Enviado",
          text: "El correo ha sido enviado correctamente.",
          timer: 2000,
          buttons: false
        });
        // limpiar campos
        document.getElementById('nombre').value = ""
        document.getElementById('mensaje').value = ""
        document.getElementById('correo').value = ""
        }, function(error) {
          swal({
            icon: "error",
            title: "Error",
            text: "El correo no se pudo enviar correctamente.",
            timer: 2000,
            buttons: false
          });
        });
    } else {
      swal({
        icon: "error",
        title: "Correo incorrecto",
        text: "El correo es incorrecto",
        timer: 2000,
        buttons: false
      });
      document.getElementById('correo').value = ""  
    }
  }
}

//fondo blanco al navbar cuando se expande
function toggleNavbar() {
  var navbar = document.querySelector('.navbar');
  navbar.classList.toggle('navbar-expanded');
}

//cerrar navbar cuando se haga click en una seccion
function cerrarNavbar() {
  var nav = document.getElementById("nav");
  var menu = document.getElementById("navbar-toggler");
  
  nav.classList.remove("navbar-expanded");
  menu.classList.remove("show");
}