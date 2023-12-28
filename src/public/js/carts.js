window.addEventListener("load", async function () {
  const buttonPurchase = document.getElementById("purchase");
  const btnDeleteCart = document.getElementById("deleteCart");

  btnDeleteCart.addEventListener("click", function (e) {
    clearCart();
  });

  buttonPurchase.addEventListener("click", function (e) {
    purchase();
  });

  try {
    let userCurrent = await fetch("/api/sessions/current");
    userCurrent = await userCurrent.json();
    const { cartId } = userCurrent.payload;
    const response = await fetch(`/api/carts/${cartId}`, { method: "GET" });
    const data = await response.json();
    if (data.payload.products < 1) {
      buttonPurchase.classList.toggle("disabled");
    }
    showTable(data.payload.products);
  } catch (error) {
    console.log(error);
  }
});

function showTable(products) {
  let nuevotbody = "";
  products.forEach((product) => {
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
           <td></td>
          </tr>
      `;
  });
  tbody.innerHTML = nuevotbody;
}

async function purchase() {
  let userCurrent = await fetch("/api/sessions/current");
  userCurrent = await userCurrent.json();
  const { cartId, email } = userCurrent.payload;
  const response2 = await fetch(
    `/api/carts/${cartId}/purchase?email=${email}`,
    {
      method: "get",
    }
  );
  const datos = await response2.json();
  if (!datos.payload.purchasedProducts && datos.payload.sinStock) {
    await Swal.fire({
      position: "center",
      icon: "error",
      title: "No se realizo la compra por que la cantidad excede el stock",
      showConfirmButton: false,
      timer: 2000,
    });
    window.location.reload();
  }

  if (datos.payload.purchasedProducts && datos.payload.sinStock) {
    await Swal.fire({
      position: "center",
      icon: "success",
      title: "La compra se realizo con exito",
      showConfirmButton: false,
      timer: 2000,
    });
    window.location.reload();
  }
}

async function clearCart() {
  let userCurrent = await fetch("/api/sessions/current");
  userCurrent = await userCurrent.json();
  const { cartId } = userCurrent.payload;
  const response2 = await fetch(`/api/carts/${cartId}`, {
    method: "delete",
  });
  const datos = await response2.json();
  if (datos.status === "OK") {
    await Swal.fire({
      position: "center",
      icon: "success",
      title: "Se eliminaron todos los productos",
      showConfirmButton: false,
      timer: 2000,
    });
    window.location.reload();
  }
}
