async function sendCart(e) {
  const input = document.getElementById("carts");
  try {
    const response = await fetch(
      "/api/carts/" + input.value + "/products/" + e.currentTarget.id,
      {
        method: "POST",
        headers: { "Content-type": "application/json; charset=UTF-8" }
      }
    );
    const data = await response.json();
    Toastify({
      text: data.msg,
      duration: 3000,
      destination: "/products",
      newWindow: false,
      close: true,
      gravity: "bottom", // `top` or `bottom`
      position: "right", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)"
      },
      onClick: function() {} // Callback after click
    }).showToast();
  } catch (error) {
    console.log(error);
  }
}

function actualizarBotonesAgregar() {
  botonesAgregar = document.querySelectorAll(".sendCart");
  botonesAgregar.forEach(boton => {
    boton.addEventListener("click", sendCart);
  });
}

async function llamarFetch(dir) {
  try {
    const response = await fetch(dir, { method: "GET" });
    const data = await response.json();
    const tbody = document.getElementById("tbody");
    const prev = document.getElementById("prev");
    if (!data.prevLink) prev.classList.add("disabled");
    const next = document.getElementById("next");
    if (!data.nextPage) next.classList.add("disabled");
    document.getElementById("nextLink").href = data.nextLink;
    document.getElementById("prevLink").href = data.prevLink;
    let nuevotbody = "";
    data.products.forEach(product => {
      nuevotbody += `
          <tr>
           <th scope="row">${product.code}</th>
           <td> ${product.title}</td>
           <td> ${product.description}</td>
           <td> ${product.price}</td>
           <td> ${product.status}</td>
           <td> ${product.stock}</td>
           <td> ${product.category}</td>
           <td><button id="${product._id}"class="fs-4 bg-black  text-white border-1  rounded-2 p-1 sendCart"><i class="bi bi-cart-plus"></i></button></i></a></td>
          </tr>
      `;
    });
    tbody.innerHTML = nuevotbody;
    actualizarBotonesAgregar();
  } catch (error) {
    console.log(error);
  }
}

document.addEventListener("DOMContentLoaded", event => {
  llamarFetch("/api" + window.location.pathname + window.location.search);
});
