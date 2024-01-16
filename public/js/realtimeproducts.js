const socket = io();
let cartId = "";
let methodForm = "";
window.addEventListener("load", function () {
  const newPButton = document.getElementById("newProduct");

  newPButton.addEventListener("click", function (e) {
    e.preventDefault();
    methodForm = "";
    const form = document.getElementById("form");
    form.reset();
    form.action = "/api/products";
    form.method = "post";
    const code = document.getElementById("code");
    code.disabled = false;
    const buttonSubmit = form.querySelector("#buttonSubmit");
    buttonSubmit.innerHTML = "Add Product";
  });

  document
    .getElementById("form")
    .addEventListener("submit", async function (event) {
      event.preventDefault();
      const formDocumentation = event.currentTarget;
      const url = new URL(formDocumentation.action);
      const formData = new FormData(formDocumentation);
      let fetchOptions;
      if (methodForm === "PUT") {
        fetchOptions = {
          method: methodForm,
          body: formData,
        };
      } else {
        fetchOptions = {
          method: formDocumentation.method,
          body: formData,
        };
      }
      const responseFetch = await fetch(url, fetchOptions);

      const response = await responseFetch.json();
      document.getElementById("cancel").click();
      if (response.status === "success") {
        Toastify({
          text: "Product has been added successfully",
          className: "error",
          gravity: "bottom", // `top` or `bottom`
          position: "right",
          style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
            color: "white",
          },
        }).showToast();
      } else {
        Toastify({
          text: response.error,
          className: "error",
          gravity: "bottom", // `top` or `bottom`
          position: "right",
          style: {
            background: "#dc143c",
            color: "white",
          },
        }).showToast();
      }
    });
});

async function editProduct(id) {
  const form = document.getElementById("form");
  const title = document.getElementById("title");
  const code = document.getElementById("code");
  const price = document.getElementById("price");
  const stock = document.getElementById("stock");
  const category = document.getElementById("category");
  const description = document.getElementById("description");
  form.reset();
  form.action = "/api/products/" + id;
  methodForm = "PUT";
  const productFetch = await fetch("/api/products/" + id);
  const product = (await productFetch.json()).payload;

  title.value = product.title;
  code.value = product.code;
  price.value = product.price;
  stock.value = product.stock;
  code.disabled = true;
  category.value = product.category;
  description.value = product.description;

  const buttonSubmit = form.querySelector("#buttonSubmit");
  buttonSubmit.innerHTML = "Update Product";
}

async function deleteProductAdm(pid) {
  const deleteProduct = await fetch(`/api/products/${pid}`, {
    method: "DELETE",
  });

  const response = await deleteProduct.json();
  Toastify({
    text: response.message,
    className: "error",
    gravity: "bottom", // `top` or `bottom`
    position: "right",
    style: {
      background: "#dc143c",
      color: "white",
    },
  }).showToast();
}

socket.on("actualizarProductos", (productos) => {
  const tbody = document.getElementById("tbody");
  let nuevotbody = "";
  productos.forEach((product) => {
    nuevotbody += `
            <tr>
             <th scope="row">${product.code}</th>
             <td> ${product.title}</td>
             <td> ${product.description}</td>
             <td> ${product.price}</td>
             <td> ${product.status}</td>
             <td> ${product.stock}</td>
             <td> ${product.category}</td>
             <td>
             <div
                class="d-flex align-items-center justify-content-center gap-3 h-100"
              >
                <button
                  id="${product._id}"
                  onclick="editProduct('${product._id}')"
                  class="btn btn-info"
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdrop"
                >
                  <i class="bi bi-pencil-square"></i>
                </button>
                <button
                  onclick="deleteProductAdm('${product._id}')"
                  class="btn btn-danger"
                ><i class="bi bi-trash"></i></button>
              </div>
           </td>
            </tr>
        `;
  });
  tbody.innerHTML = nuevotbody;
});
