const socket = io();

socket.on('nuevoProducto', data => {
    console.log(data.message);
    socket.emit('identificacion', nombre);
})

document.getElementById("addProduct").addEventListener('submit', (e) => {
    e.preventDefault();
    const newProduct = {
        title: document.getElementById('title').value.trim(),
        description: document.getElementById('description').value.trim(),
        code: document.getElementById('code').value.trim(),
        price: document.getElementById('price').value.trim(),
        stock: document.getElementById('stock').value.trim(),
        category: document.getElementById('category').value.trim(),
    }

    socket.emit('nuevoProducto', newProduct);
});

document.getElementById("deleteProduct").addEventListener('submit', (e) => {
    e.preventDefault();
    socket.emit('eliminarProducto', +document.getElementById('deleteById').value);
});


socket.on('actualizarProductos', productos => {
    const tbody = document.getElementById('tbody');
    let nuevotbody = '';
    productos.forEach(item => {
        nuevotbody += `
            <tr>
             <th scope="row">${item.id}</th>
             <td> ${item.product.title}</td>
             <td> ${item.product.description}</td>
             <td> ${item.product.code}</td>
             <td> ${item.product.price}</td>
             <td> ${item.product.status}</td>
             <td> ${item.product.stock}</td>
             <td> ${item.product.category}</td>
            </tr>
        `
    });
    tbody.innerHTML = nuevotbody;
})