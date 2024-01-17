let methodForm = "";

window.addEventListener("load", async function () {
  loadProducts();
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
      await Swal.fire({
        position: "center",
        icon: "success",
        title:
          "Congratulation!! now you are a user premium. Please login again.",
        showConfirmButton: false,
        timer: 3000,
      });
      window.location.href = "/api/sessions/logout";
    }
    if (response.status === "error") {
      Toastify({
        text: response.msg,
        className: "error",
        gravity: "center", // `top` or `bottom`
        position: "right",
        style: {
          background: "crimsom",
          color: "white",
        },
      }).showToast();
    }
  });

  const newPButton = document.getElementById("newProduct");

  newPButton.addEventListener("click", function (e) {
    e.preventDefault();
    methodForm = "";
    const form = document.getElementById("formNewProduct");
    form.reset();
    form.action = "/api/products";
    form.method = "post";
    const code = document.getElementById("code");
    code.disabled = false;
    const buttonSubmit = form.querySelector("#buttonSubmit");
    buttonSubmit.innerHTML = "Add Product";
  });

  document
    .getElementById("formNewProduct")
    .addEventListener("submit", async function (event) {
      event.preventDefault();
      console.log(methodForm);
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
        loadProducts();
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
  const form = document.getElementById("formNewProduct");
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

async function loadProducts() {
  const fetchCurrentUser = await fetch("/api/sessions/current");
  const dataCurrentUser = await fetchCurrentUser.json();
  console.log(dataCurrentUser)
  const fetchMyproducts = await fetch(
    `/api/users/${dataCurrentUser.payload.id}/products`
  );

  const products = (await fetchMyproducts.json()).payload;

  const tbody = document.getElementById("table");
  if (products.length > 0) {
    let nuevotbody = `<thead>
    <tr>
      <th scope="col">Code</th>
      <th scope="col">Title</th>
      <th scope="col">Description</th>
      <th scope="col">Price</th>
      <th scope="col">Status</th>
      <th scope="col">Stock</th>
      <th scope="col">Category</th>
      <th scope="col">Options</th>
    </tr>
  </thead>`;
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
         <td>
            <div  class="d-flex align-items-center justify-content-center gap-3 h-100">

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
  } else {
    tbody.innerHTML = `<h3 class="mt-3">No tienes productos</h3>`;
  }
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

async function resetPassword() {
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
}
