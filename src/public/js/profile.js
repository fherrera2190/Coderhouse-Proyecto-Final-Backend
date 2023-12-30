window.addEventListener("load", function () {
  console.clear();
  console.log("termino de cargar la pagina");
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
});
