let probandoScroll = document.getElementById("probandoScroll");
const socket = io();

document.addEventListener("DOMContentLoaded", (event) => {
  probandoScroll.scrollTop = probandoScroll.scrollHeight;
  document
    .getElementById("textarea")
    .addEventListener("keypress", function (event) {
      // If the user presses the "Enter" key on the keyboard
      if (event.key === "Enter") {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        document.getElementById("enviarMensaje").click();
      }
    });
});

socket.on("updateMessages", (message) => {
  const chatContainer = document.getElementById("chatContainer");
  const messageAdd = `<div class=" mb-3 px-3 border-1 rounded-3 " style="background-color: #488450;">
    <small style="font-size: 12px;">${message.email}</small>
    <p class="m-0 py-2">${message.message}</p>
    </div>
    `;
  chatContainer.innerHTML += messageAdd;
  probandoScroll.scrollTop = probandoScroll.scrollHeight;
});

const enviarMensaje = document.getElementById("enviarMensaje");
enviarMensaje.addEventListener("click", (e) => {
  probandoScroll.scrollTop = probandoScroll.scrollHeight;
  const newMessage = {
    email: document.getElementById("email").value,
    message: document.getElementById("textarea").value,
  };
  document.getElementById("textarea").value = "";
  socket.emit("newMessage", newMessage);
});
