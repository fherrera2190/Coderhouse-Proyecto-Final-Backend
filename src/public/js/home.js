const socket = io();

document.getElementById("addProduct").addEventListener("submit", (e) => {
  e.preventDefault();
  const newProduct = {
    title: document.getElementById("title").value.trim(),
    description: document.getElementById("description").value.trim(),
    code: document.getElementById("code").value.trim(),
    price: document.getElementById("price").value.trim(),
    stock: document.getElementById("stock").value.trim(),
    category: document.getElementById("category").value.trim(),
  };

  socket.emit("nuevoProducto", newProduct);
});

document.getElementById("deleteProduct").addEventListener("submit", (e) => {
  e.preventDefault();
  socket.emit("eliminarProducto", document.getElementById("deleteById").value);
});

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
            </tr>
        `;
  });
  tbody.innerHTML = nuevotbody;
});
