window.addEventListener("load", async function () {
  const buttonForm = document.getElementById("recoverpassword");
  const email = document.getElementById("email");
  buttonForm.addEventListener("click", async (e) => {
    e.preventDefault();

    const getUser = await fetch("/api/sessions/current");
    const user = await getUser.json();

    const fetchResponse = await fetch("/api/sessions/recoverpassword", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email: user.payload.email,
      }),
    });
    const response = await fetchResponse.json();
    console.log(response);
    if (response.status === "success") {
      await Swal.fire({
        position: "bottom-end",
        icon: "success",
        title:
          "A password recovery email has been sent. Please check your inbox and follow the instructions to complete the process.",
        showConfirmButton: false,
        timer: 2500,
      });
    } else {
      await Swal.fire({
        position: "bottom-end",
        icon: "error",
        title: response.error,
        showConfirmButton: false,
        timer: 2500,
      });
    }
  });

  const form = document.getElementById("imageForm");
  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const form = event.currentTarget;
    const url = new URL(form.action);
    const formData = new FormData(form);
    const searchParams = new URLSearchParams(formData);

    const fetchOptions = {
      method: form.method,
    };

    if (form.method.toLowerCase() === "post") {
      if (form.enctype === "multipart/form-data") {
        fetchOptions.body = formData;
      } else {
        fetchOptions.body = searchParams;
      }
    } else {
      url.search = searchParams;
    }

    const responseFetch = await fetch(url, fetchOptions);

    const response = await responseFetch.json();
    console.log(response);
    if (response.status === "success") {
      window.location.href = "/profile";
    }
    if (response.status === "error") {
      Toastify({
        text: response.msg,
        className: "info",
        gravity: "bottom", // `top` or `bottom`
        position: "right",
        style: {
          background: "crimsom",
          color: "white",
        },
      }).showToast();
    }
  });

  const formDocumentation = document.getElementById("formDocumentation");
  formDocumentation.addEventListener("submit", async function (event) {
    event.preventDefault();
    const formDocumentation = event.currentTarget;
    const url = new URL(formDocumentation.action);
    const formData = new FormData(formDocumentation);
    const searchParams = new URLSearchParams(formData);

    const fetchOptions = {
      method: formDocumentation.method,
    };

    if (formDocumentation.method.toLowerCase() === "post") {
      if (formDocumentation.enctype === "multipart/form-data") {
        fetchOptions.body = formData;
      } else {
        fetchOptions.body = searchParams;
      }
    } else {
      url.search = searchParams;
    }

    const responseFetch = await fetch(url, fetchOptions);

    const response = await responseFetch.json();
    console.log(response);
    if (response.status === "success") {
      window.location.href = "/api/sessions/logout";
    }
    if (response.status === "error") {
      Toastify({
        text: response.msg,
        className: "info",
        gravity: "bottom", // `top` or `bottom`
        position: "right",
        style: {
          background: "crimsom",
          color: "white",
        },
      }).showToast();
    }
  });

  loadProducts();
});

async function loadProducts() {
  const fetchCurrentUser = await fetch("/api/sessions/current");
  const dataCurrentUser = await fetchCurrentUser.json();
  const fetchMyproducts = await fetch(
    `/api/users/${dataCurrentUser.payload._id}/products`
  );

  const products = (await fetchMyproducts.json()).payload;
  const tbody = document.getElementById("tbody");
  let nuevotbody = "";
  products.forEach((product) => {
    nuevotbody += `
        <tr>
         <th scope="row">${product.code}</th>
         <td> ${product.title}</td>
         <td> ${product.description}</td>
         <td> ${product.price}</td>
         <td> ${product.status}</td>
         <td> ${product.stock}</td>
         <td> ${product.category}</td>
         <td><button
         onclick="deleteProductAdm('${product._id}')"
         class="btn btn-danger"
       ><i class="bi bi-trash"></i></button></td>
        </tr>
    `;
  });
  tbody.innerHTML = nuevotbody;
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
  loadProducts();
}
