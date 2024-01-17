async function deleteAllUser() {
  try {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const fetchUsers = await fetch(`/api/users/`, {
          method: "delete",
        });
        const response = await fetchUsers.json();
        if (response.status === "success") {
          await Swal.fire({
            title: response.message,
            text: "All users have been successfully deleted.",
            icon: "success",
            timer: 3000,
          });
          window.location.reload();
        } else {
          await Swal.fire({
            title: "Failed to delete the user",
            text: "Error occurred while attempting to delete all users.Your file has been deleted.",
            icon: "error",
            timer: 3000,
          });
          window.location.reload();
        }
      }
    });
  } catch (error) {
    console.log(error);
  }
}

async function deleteUser(uid) {
  try {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const fetchUsers = await fetch(`/api/users/${uid}`, {
          method: "delete",
        });
        const response = await fetchUsers.json();

        if (response.status === "success") {
          await Swal.fire({
            title: response.message,
            text: "Your file has been deleted.",
            icon: "success",
            timer: 3000,
          });
          window.location.reload();
        } else {
          await Swal.fire({
            title: "Failed to delete the user",
            text: "Your file has been deleted.",
            icon: "error",
            timer: 3000,
          });
          window.location.reload();
        }
      }
    });
  } catch (error) {
    console.log(error);
  }
}

async function changeRole(uid) {
  try {
    const fetchUsers = await fetch(`/api/users/premium/${uid}`);
    const response = await fetchUsers.json();
    if (response.status === "success") {
      await Swal.fire({
        title: response.message,
        text: "Role of the user has been successfully lowered by the administrator.",
        icon: "success",
        timer: 3000,
      });
      window.location.reload();
    } else {
      await Swal.fire({
        title: response.message,
        text: "Hubo un error.",
        icon: "error",
        timer: 3000,
      });
      window.location.reload();
    }
  } catch (error) {
    console.log(error);
  }
}
