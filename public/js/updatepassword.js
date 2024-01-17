window.addEventListener("load", async function () {
  const password = document.getElementById("password");
  const password2 = document.getElementById("password2");

  const updatePassword = document.getElementById("updatePassword");

  updatePassword.addEventListener("click", async function (e) {
    e.preventDefault();
    const searchParams = new URLSearchParams(window.location.search);

    const fetchUpdatePassword = await fetch("/api/sessions/updatepassword", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        password: password.value,
        password2: password2.value,
        token: searchParams.get("token"),
      }),
    });


    
    const response = await fetchUpdatePassword.json();
    if (response.status === "success") {
      await Swal.fire({
        position: "bottom-end",
        icon: "success",
        title: response.message,
        showConfirmButton: false,
        timer: 2500,
      });
      window.location.href = "/";
    } else {
      await Swal.fire({
        position: "bottom-end",
        icon: "error",
        title: response.message,
        showConfirmButton: false,
        timer: 2500,
      });
    }
  });
});
