(function () {
	"use strict";

	var regalo = document.getElementById('regalo');

	document.addEventListener('DOMContentLoaded', function () {

		// var map = L.map('mapa').setView([18.3483,-99.5280], 16);

		// L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		// 	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
		// }).addTo(map);

		// L.marker([18.3483,-99.5280]).addTo(map)
		// 	.bindPopup('Lunadepapel.<br> Digitalizando ideas.')
		// 	.openPopup();

		// Campos Datos usuarios

		var nombre = document.getElementById('nombre');
		var apellido = document.getElementById('apellido');
		var email = document.getElementById('email');

		// Campos pases

		var pase_dia = document.getElementById('pase_dia');
		var pase_dosdias = document.getElementById('pase_dosdias');
		var pase_completo = document.getElementById('pase_completo');

		// Botones y divs

		var calcular = document.getElementById('calcular');
		var errorDiv = document.getElementById('error');
		var botonRegistro = document.getElementById('btnRegistro');
		var lista_productos = document.getElementById('lista-productos');
		var suma_total = document.getElementById('suma-total');

		// Extras

		var etiquetas = document.getElementById('etiquetas');
		var camisas = document.getElementById('camisa_evento');


		// EventListeners

		calcular.addEventListener('click', calcularMontos);

		pase_dia.addEventListener('change', mostrarDias);
		pase_dosdias.addEventListener('change', mostrarDias);
		pase_completo.addEventListener('change', mostrarDias);

		nombre.addEventListener('blur', validarCampos);
		apellido.addEventListener('blur', validarCampos);
		email.addEventListener('blur', validarCampos);
		email.addEventListener('blur', validarMail);


		// Functions

		function validarCampos() {
			if (nombre.value == '' || apellido.value == '' || email.value == '') {
				errorDiv.style.display = 'block';
				errorDiv.innerHTML = "Completa los campos obligatorios";
			} else {
				errorDiv.style.display = 'none';
			}
		}
		function validarMail() {
			if (this.value.indexOf("@") > -1) {
				errorDiv.style.display = 'none';
			} else {
				errorDiv.style.display = 'block';
				errorDiv.innerHTML = "Ingresa un correo válido";
			}
		}

		function calcularMontos(event) {
			event.preventDefault();
			if (regalo.value === '') {
				alert("Debes elegir un regalo");
				regalo.focus();
			} else {
				var boletosDia = parseInt(pase_dia.value, 10) || 0,
					boletos2Dias = parseInt(pase_dosdias.value, 10) || 0,
					boletoCompleto = parseInt(pase_completo.value, 10) || 0,
					cantCamisas = parseInt(camisas.value, 10) || 0,
					cantEtiquetas = parseInt(etiquetas.value, 10) || 0;

				var totalPagar = (boletoCompleto * 50) + (boletos2Dias * 45) + (boletosDia * 30) + ((cantCamisas * 10) * .93) + (cantEtiquetas * 2);
				console.log(totalPagar);

				var listadoProductos = [];
				if (boletosDia >= 1) {
					listadoProductos.push(boletosDia + ' pase(s) por día');
				}
				if (boletos2Dias >= 1) {
					listadoProductos.push(boletos2Dias + ' pase(s) por 2 días');
				}
				if (boletoCompleto >= 1) {
					listadoProductos.push(boletoCompleto + ' pase(s) completo(s)');
				}
				if (cantCamisas >= 1) {
					listadoProductos.push(cantCamisas + ' camisa(s)');
				}
				if (cantEtiquetas >= 1) {
					listadoProductos.push(cantEtiquetas + ' etiquetas');
				}

				lista_productos.style.display = "block";
				lista_productos.innerHTML = '';
				for (var i = 0; i < listadoProductos.length; i++) {
					lista_productos.innerHTML += '<i class="fas fa-check"></i>' + listadoProductos[i] + '<br/>';

				}
				suma_total.innerHTML = '';
				suma_total.innerHTML += "$ " + totalPagar.toFixed(2);
			}
		}

		function mostrarDias() {

			document.getElementById('viernes').style.display = 'none';
			document.getElementById('sabado').style.display = 'none';
			document.getElementById('domingo').style.display = 'none';

			var boletosDia = parseInt(pase_dia.value, 10) || 0,
				boletos2Dias = parseInt(pase_dosdias.value, 10) || 0,
				boletoCompleto = parseInt(pase_completo.value, 10) || 0;

			var diasElegidos = [];


			if (boletosDia > 0) {
				diasElegidos.push('viernes');

			}
			if (boletos2Dias > 0) {
				diasElegidos.push('viernes', 'sabado');

			}
			if (boletoCompleto > 0) {
				diasElegidos.push('viernes', 'sabado', 'domingo');

			}

			for (var i = 0; i < diasElegidos.length; i++) {

				document.getElementById(diasElegidos[i]).style.display = 'block';
			}

		}

	}); //DOM CONTENT LOADED
})();