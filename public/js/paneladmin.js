window.addEventListener("load", async function () {
  const users = await getUsers();
  console.log(users);
});

async function getUsers() {
  const fetchUsers = await fetch("/api/users/");
  return (await fetchUsers.json()).users;
}

async function deleteAllUser() {
  try {
    const fetchDeleteUsers = await fetch(`/api/users/`, {
      method: "delete",
    });
  } catch (error) {
    console.log(error);
  }
}

async function deleteUser(uid) {
  try {
    const fetchUsers = await fetch(`/api/users/${uid}`, {
      method: "delete",
    });
    const response = await fetchUsers.json();
    if (response.status === "success") {
      Toastify({
        text: response.message,
        className: "error",
        gravity: "bottom", // `top` or `bottom`
        position: "right",
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
          color: "white",
        },
      }).showToast();
      window.location.reload();
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
      window.location.reload();
    }
  } catch (error) {
    console.log(error);
  }
}

async function changeRole(uid) {
  try {
    const fetchUsers = await fetch(`/api/users/premium/${uid}`);
    const response = await fetchUsers.json();
    console.log(response);
  } catch (error) {
    console.log(error);
  }
}
