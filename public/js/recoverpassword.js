window.addEventListener("load", function () {
  const buttonForm = document.getElementById("recoverpassword");
  const email = document.getElementById("email");
  buttonForm.addEventListener("click", async (e) => {
    e.preventDefault();
    const fetchResponse = await fetch("/api/sessions/recoverpassword", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email: email.value,
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
      window.location.href = "/";
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
