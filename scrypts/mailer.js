var mailerUrl = "https://joinus.f-digital.online/mailer/canditatura"
var form = document.querySelector("form#curriculum-form");

var form_section = document.querySelector('ul.form-section');
var loader_container = document.querySelector('div.loader-container');
var successful_form = document.querySelector('div.successful-form');
var form_errors = document.querySelector('ul.form-errors-list');

form.addEventListener("submit", (e)=>{
    e.preventDefault();

    loader_container.style.display="block";
    form_section.style.display="none";

    fetch(mailerUrl, {method: 'POST', body: getFormData()})
    .then(response => {
        return response.json();
    }).then(json => {

        if(json.status === 'success'){
            successful_form.style.display="block";
            loader_container.style.display="none";

        } else {
            console.log(json.errors);
            populateErrors(json.errors);

            form_section.style.display="block";
            loader_container.style.display="none";
        }
    }).catch(error => {
        console.log(error);

        form_section.style.display="block";
        loader_container.style.display="none";

    });

})

const getFormData = ()=>{
    let formData = new FormData();

    formData.set('nome', document.getElementById('first_3').value);
    formData.set('cognome', document.getElementById('last_3').value);
    formData.set('nascita_giorno', document.getElementById('input_7_day').value);
    formData.set('nascita_mese', document.getElementById('input_7_month').value);
    formData.set('nascita_anno', document.getElementById('input_7_year').value);
    formData.set('phone_area', document.getElementById('input_6_area').value);
    formData.set('phone_number', document.getElementById('input_6_phone').value);
    formData.set('email', document.getElementById('input_5').value);

    formData.set('curriculum', document.getElementById('input_303').files[0]);

    return formData;
}

const populateErrors = (errors) => {
    form_errors.textContent= "";

    errors.forEach(error => {
        let listElement = document.createElement('li');
        listElement.textContent = error.msg;
        
        form_errors.appendChild(listElement);
    })
}