/*========== SHOWS AND HIDES MENU ==========*/
const navMenu = document.getElementById('nav-menu'),
		navToggle = document.getElementById('nav-toggle'),
		navClose = document.getElementById('nav-close');

/*=== SHOW MENU ===*/
/*Validate if const exists*/
if(navToggle){
	//Si se clickea en toggle, se agrega la clase show-menu a navMenu y se abre el menu en disp peq
	navToggle.addEventListener('click', () =>{
		navMenu.classList.add('show-menu');
	});
}


/*=== HIDES MENU ===*/
/*Validate if const exists*/
if(navClose){
	//Si se clickea en close, se quita la clase show-menu al navMenu y se cierra el menu en disp peq
	navClose.addEventListener('click', () =>{
		navMenu.classList.remove('show-menu');
	});
}


/*========== REMOVE MENU MOBILE ==========*/
const navLink = document.querySelectorAll('.nav__link');

function linkAction(){
	const navMenu = document.getElementById('nav-menu');
	//cuando se clickea en cada nav__link, se quita la clase show-menu y se cierra el menu en disp peq
	navMenu.classList.remove('show-menu');
}
navLink.forEach(n => n.addEventListener('click', linkAction));




/*=========== OPEN AND CLOSE SKILLS ============*/
const skillsContent = document.getElementsByClassName('skills__content'),
		skillsHeader = document.querySelectorAll('.skills__header');

function toggleSkills(){
	let itemClass = this.parentNode.className;

	for(i = 0; i < skillsContent.length; i++){
		skillsContent[i].className = 'skills__content skills__close';
	}
	if(itemClass === 'skills__content skills__close'){
		this.parentNode.className = 'skills__content skills__open';
	}
}

skillsHeader.forEach((el) => {
	el.addEventListener('click', toggleSkills)
})

/*=========== SERVICES MODAL =============*/
const modalViews = document.querySelectorAll('.services__modal'),
		modalBtns = document.querySelectorAll('.services__button'),
		modalCloses = document.querySelectorAll('.services__modal-close');

let modal = function(modalClick){
	modalViews[modalClick].classList.add('active-modal');
}

modalBtns.forEach((modalBtn, i) =>{
	modalBtn.addEventListener('click', ()=>{
		modal(i);
	})
})

modalCloses.forEach((modalClose) => {
	modalClose.addEventListener('click', ()=>{
		modalViews.forEach((modalView)=>{
			modalView.classList.remove('active-modal');
		})
	})
})


/*=========== PORTFOLIO SWIPER =============*/
let swiper = new Swiper(".portfolio__container", {
  cssMode: true,
  loop: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});


/*=========== SCROLLS SECTIONS ACTIVE LINK ============*/
//en el menu desplegable va pintando la seccion activa de la pagina, cuando se mueve a otra, le saca el color.
const sections = document.querySelectorAll('section[id]');

function scrollActive(){
	const scrollY = window.pageYOffset;

	sections.forEach(current => {
		const sectionHeight = current.offsetHeight;
		const sectionTop = current.offsetTop - 50;
		sectionId = current.getAttribute('id');

		if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
			document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link');
		} else {
			document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link');
		}
	})
}

window.addEventListener('scroll', scrollActive);


/*============ SELECCIONA IDIOMA =============*/
//declaramos las variables esp y eng
const spanishLanguage = document.getElementById("esp");
const englishLanguage = document.getElementById("eng");
const hidden = "display:none;";
const shown = "display:block;";

//declaramos variables para acceder a los elementos con la clase esp/eng
const spanishText = document.getElementsByClassName("esp");
const englishText = document.getElementsByClassName("eng");

//se muestra por defecto el texto en espanol
showSpanishText();

//creo 2 funciones, cada una para cuando se clickee en si misma, se cambie el texto al idioma seleccionado y se oculte el otro
function showSpanishText(){
	for(element in spanishText){
		spanishText[element].style = shown;
	}
	for(element in englishText){
		englishText[element].style = hidden;
	}
}

function showEnglishText(){
	for(element in englishText){
		englishText[element].style = shown;
	}
	for(element in spanishText){
		spanishText[element].style = hidden;
	}
}

//creamos un eventlistener para cuando se clickee, se haga el switch de idiomas
spanishLanguage.addEventListener("click", ()=>{
	spanishLanguage.classList.add("selectedLanguage");
	englishLanguage.classList.remove("selectedLanguage");

	showSpanishText();
	//guardamos el idioma seleccionado en el localStorage
	localStorage.setItem("languageActive", "spanish");
});

englishLanguage.addEventListener("click", ()=>{
	englishLanguage.classList.add("selectedLanguage");
	spanishLanguage.classList.remove("selectedLanguage");

	showEnglishText();
	//guardamos el idioma seleccionado en el localStorage
	localStorage.setItem("languageActive", "english");
});

//LOCAL STORAGE ADDON
switch (localStorage.getItem("languageActive")) {
 
    case "english":
      englishLanguage.classList.add("selectedLanguage");
      showEnglishText();
      break;
 
    case "spanish":
      spanishLanguage.classList.add("selectedLanguage");
      showSpanishText();
      break;
 
    default:
	    //default SPANISH text shown, all others disabled
			//default -> no local storage exists
      spanishLanguage.classList.add("selectedLanguage");
      showSpanishText();
  }

/*========== CHANGE BACKGROUND HEADER ===========*/
function scrollHeader(){
	const nav = document.getElementById('header');
	//cuando el scroll sea mayor a 80 vh, agrega el scroll header class
	if(this.scrollY >= 80){
		nav.classList.add('scroll-header');
	} else {
		nav.classList.remove('scroll-header');
	}
}
window.addEventListener('scroll', scrollHeader);

/*=========== SHOW SCROLL UP ============*/
function scrollUp(){
	const scrollUp = document.getElementById('scroll-up');
	//cuando se scrollea mas que 560vh, se agrega la clase show-scroll al tag con scroll
	if(this.scrollY >= 560){
		scrollUp.classList.add('show-scroll');
	} else {
		scrollUp.classList.remove('show-scroll');
	}
}

window.addEventListener('scroll', scrollUp);

/*=========== DARK/LIGHT THEME ============*/
const themeButton = document.getElementById('theme-button');
const darkTheme = 'dark-theme';
const iconTheme = 'fa-sun';

const selectedTheme = localStorage.getItem('selected-theme');
const selectedIcon = localStorage.getItem('selected-icon');

const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light';
const getCurrentIcon = () => document.body.classList.contains(iconTheme) ? 'fa-moon' : 'fa-sun';

//valida si el usuario eligio un theme
if(selectedTheme){
	//si la validacion se completa, pregunta cual fue el error para saber si activamos
	document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme);
	themeButton.classList[selectedIcon === 'fa-moon' ? 'add' : 'remove'](iconTheme);
};

//activa o desactiva manualmente con el boton
themeButton.addEventListener('click', ()=>{
	//agrega o remueve el icono moon
	document.body.classList.toggle(darkTheme);
	themeButton.classList.toggle(iconTheme);
	//guardamos el theme y el icono que el usuario eligio.
	localStorage.setItem('selected-theme', getCurrentTheme());
	localStorage.setItem('selected-icon', getCurrentIcon());
});



/*============= EMAILJS ==============*/
	let form = document.getElementById('form');
	let nombre = document.getElementById('nombre');
	let email = document.getElementById('email');
	let celular = document.getElementById('celular');
	let proyecto = document.getElementById('proyecto');
	let msg = document.getElementById('mensaje');
	let submit = document.getElementById('submit');

function validate(){
	submit.addEventListener("click", (event)=>{
		event.preventDefault()

//si el usuario quiere enviar el form vacio, le salta el modal inputEmpty
//si el form esta completo, el form se envia y le aparece el modal success
//si pasa otra cosa, el form no se envia y le salta el modal error.
		if(nombre.value == "" || email.value == "" || celular.value == "" || proyecto.value == "" || msg.value == ""){
			inputEmpty();
		} else if (!(nombre.value == "" || email.value == "" || celular.value == "" || proyecto.value == "" || msg.value == "")){
			sendEmail();
			form.reset(); //una vez enviado, borra el contenido enviado de los campos.
			success();
			console.log("Formulario enviado con exito!")
		} else {
			error();
			console.log("Hubo un error al enviar el formulario, vuelva a intentar.")
		}
	})
}
validate();

function sendEmail(){
	emailjs.send("service_6he0gvw","template_cqjn98v",{
		from_name: nombre.value,
		from_email: email.value,
		from_phone: celular.value,
		subject: proyecto.value,
		message: msg.value,
	});
}
