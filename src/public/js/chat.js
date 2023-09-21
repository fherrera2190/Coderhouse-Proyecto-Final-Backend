let emailValue = "";
let probandoScroll =document.getElementById('probandoScroll');
const emailInput = document.getElementById("email");
const socket = io();

document.addEventListener("DOMContentLoaded", (event) => {
    console.log("DOM fully loaded and parsed");
    probandoScroll.scrollTop=probandoScroll.scrollHeight;
});

function isValidEmail(email) {
    // Utilizamos una expresión regular para verificar el formato del correo electrónico
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailRegex.test(email);
}


emailInput.addEventListener("input", () => {
    const emailInput = document.getElementById("email");
    const submitButton = document.getElementById("enviarMensaje");
    // console.log(emailInput.value);
    emailValue = emailInput.value;
    if (isValidEmail(emailInput.value)) {
        submitButton.classList.remove("disabled");
    } else {
        submitButton.classList.add("disabled");
    }
});

socket.on('updateMessages', message => {
    const chatContainer = document.getElementById('chatContainer');
    const messageAdd = `<div class=" mb-3 px-3 border-1 rounded-3 " style="background-color: #488450;">
    <small style="font-size: 12px;">${message.email}</small>
    <p class="m-0 py-2">${message.message}</p>
    </div>
    `;
    chatContainer.innerHTML += messageAdd;
    probandoScroll.scrollTop=probandoScroll.scrollHeight;

})

const enviarMensaje = document.getElementById("enviarMensaje");
enviarMensaje.addEventListener("click", (e) => {
    probandoScroll.scrollTop=probandoScroll.scrollHeight;
    const textArea = document.getElementById('textarea').value;
    const newMessage = {
        email: emailValue,
        message: textArea
    }
    socket.emit('newMessage', newMessage)
});
