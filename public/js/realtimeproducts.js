let cartId = "";

async function deleteProductAdm(pid) {
  console.log(pid);
  const deleteProduct = await fetch(`/api/products/${pid}`, {
    method: "DELETE",
  });

  const response = await deleteProduct.json();
  console.log(response)
}
