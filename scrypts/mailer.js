var mailerUrl = "http://localhost:3000/mailer/canditatura"
var form = document.querySelector("form#curriculum-form");

form.addEventListener("submit", (e)=>{
    e.preventDefault();
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

    fetch(mailerUrl, {method: 'POST', body: formData})
    .then(response => {
        return response.json();
    }).then(json => {

        if(json.status === 'success'){
            window.location.replace('congratulation.html');
        } else {
            window.location.reload();
        }
    }).catch(error => {
        console.log(error);
    });

})

var referer = document.getElementById("referer-parameter");
referer.value = window.location.toString();