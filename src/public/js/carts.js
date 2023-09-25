const input = document.getElementById("carts");
document.getElementById("buttonIr").addEventListener("click", e => {
  llamarFetch("/api/carts/" + input.value);
});

async function llamarFetch(dir) {
  try {
    const response = await fetch(dir, { method: "GET" });
    const data = await response.json();
    let nuevotbody = "";
    data.payload.products.forEach(product => {
      nuevotbody += `
            <tr>
             <th scope="row">${product.product.code}</th>
             <td> ${product.product.title}</td>
             <td> ${product.product.description}</td>
             <td> ${product.product.price}</td>
             <td> ${product.product.status}</td>
             <td> ${product.product.stock}</td>
             <td> ${product.product.category}</td>
             <td> ${product.quantity}</td>
            </tr>
        `;
    });
    tbody.innerHTML = nuevotbody;
  } catch (error) {
    // console.log(error);
  }
}
