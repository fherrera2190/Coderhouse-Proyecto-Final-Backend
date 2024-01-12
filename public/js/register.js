window.addEventListener("load", function () {
  const form = document.querySelector("form");

  form.addEventListener("submit", async function (event) {
    event.preventDefault();
    const form = event.currentTarget;
    const url = new URL(form.action);
    const formData = new FormData(form);
    const fetchOptions = {
      method: form.method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        first_name: formData.get("first_name"),
        last_name: formData.get("last_name"),
        age: formData.get("age"),
        email: formData.get("email"),
        password: formData.get("password"),
      }),
    };
    try {
      const responseFetch = await fetch(url, fetchOptions);
      const response = await responseFetch.json();
      if (response.status === "success") {
        await Swal.fire({
          position: "center",
          icon: "success",
          title: "User created successfully",
          showConfirmButton: false,
          timer: 3000,
        });
        window.location.href = "/";
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
    } catch (error) {
      console.log(error);
    }
  });
});
