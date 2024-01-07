window.addEventListener("load", async function () {
  const users = await getUsers();
  console.log(users);
});

async function getUsers() {
  const fetchUsers = await fetch("/api/users/");
  return (await fetchUsers.json()).users;
}

async function showUsers(){
    
}
