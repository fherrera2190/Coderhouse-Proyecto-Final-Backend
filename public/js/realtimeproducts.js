const socket = io();
let cartId = "";

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

async function addProduct() {}

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
             <td class="d-flex gap-3 align-items-center h-100">
             <button
              class="btn btn-info" >
               <i class="bi bi-pencil-square"></i>
             </button>
             <button
               onclick="deleteProductAdm('${product._id}')"
               class="btn btn-danger"
             ><i class="bi bi-trash"></i></button>
           </td>
            </tr>
        `;
  });
  tbody.innerHTML = nuevotbody;
});
