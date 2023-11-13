window.addEventListener("load", async function() {
  const buttonPurchase = document.getElementById("purchase");

  buttonPurchase.addEventListener("click", function(e) {
    purchase();
  });

  const input = document.getElementById("carts");
  try {
    let userCurrent = await fetch("/api/sessions/current");
    userCurrent = await userCurrent.json();
    // console.log(userCurrent);
    const { cartId } = userCurrent.payload;

    const response = await fetch(`/api/carts/${cartId}`, { method: "GET" });
    const data = await response.json();
    // console.log(data);
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
    console.log(error);
  }
});

async function purchase() {
  let userCurrent = await fetch("/api/sessions/current");
  userCurrent = await userCurrent.json();
  const { cartId,email } = userCurrent.payload;
  const response2 = await fetch(`/api/carts/${cartId}/purchase?email=${email}`, {
    method: "get"
  });
  const datos = await response2.json();
  alert(datos);
  console.log(datos);
}
