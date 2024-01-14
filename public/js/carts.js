window.addEventListener("load", async function () {
  const buttonPurchase = document.getElementById("purchase");
  const btnDeleteCart = document.getElementById("deleteCart");

  btnDeleteCart.addEventListener("click", async function (e) {
    Swal.fire({
      title: "Are you sure you want to remove all products from your cart?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        clearCart();
        await Swal.fire({
          title: "Deleted!",
          text: "Your cart has been deleted.",
          icon: "success",
          timer: 2000,
        });
        window.location.reload();
      }
    });
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
           <td><button
           onclick="deleteProductFromCart('${product.product._id}')"
           class="btn btn-danger"
         ><i class="bi bi-trash"></i></button></td>
          </tr>
      `;
  });
  tbody.innerHTML = nuevotbody;
}

async function purchase() {
  try {
    let userCurrent = await fetch("/api/sessions/current");
    userCurrent = await userCurrent.json();
    const { cartId, email } = userCurrent.payload;
    const response2 = await fetch(
      `/api/carts/${cartId}/purchase?email=${email}`
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
  } catch (error) {
    console.log(error);
  }
}

async function clearCart() {
  try {
    let userCurrent = await fetch("/api/sessions/current");
    userCurrent = await userCurrent.json();
    const { cartId } = userCurrent.payload;
    const response2 = await fetch(`/api/carts/${cartId}`, {
      method: "delete",
    });
  } catch (error) {
    console.log(error);
  }
}

async function deleteProductFromCart(pid) {
  try {
    const buttonPurchase = document.getElementById("purchase");
    let userCurrent = await fetch("/api/sessions/current");
    userCurrent = await userCurrent.json();
    const { cartId } = userCurrent.payload;
    const response2 = await fetch(`/api/carts/${cartId}/products/${pid}`, {
      method: "delete",
    });
    const response = await fetch(`/api/carts/${cartId}`);
    const data = await response.json();
    if (data.payload.products < 1) {
      buttonPurchase.classList.toggle("disabled");
    }
    showTable(data.payload.products);
  } catch (error) {
    console.log(error);
  }
}
