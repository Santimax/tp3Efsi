document.addEventListener("DOMContentLoaded", function () {
    cargarCategorias();
});

const cargarCategorias = () => {
    // Llamada a la API para obtener las categorías
    fetch("https://dummyjson.com/products/categories")
        .then(response => response.json())
        .then(data => {
            const categorySelector = document.getElementById("categorySelector");

            // Llenar el selector de categorías con las obtenidas de la API
            data.forEach(category => {
                const option = document.createElement("option");
                option.value = category;
                option.textContent = category;
                categorySelector.appendChild(option);
            });
        })
        .catch(error => console.error("Error fetching categories:", error));
};

const filtrarPorCategoria = () => {
    const selectedCategory = document.getElementById("categorySelector").value;
    // Llamar a la función de búsqueda con la categoría seleccionada
    buscarProducto(selectedCategory);
};

const buscarProducto = (categoria = "") => {
    let link = "https://dummyjson.com/products";
    if (categoria) {
        link += `/category/${categoria}`;
    }

    fetch(link)
        .then(res => res.json())
        .then(res => {
            document.getElementById("productosencontrados").innerHTML = "";
            const searchInput = document.getElementById("search-bar").value.toUpperCase();
            
            if (res.products) {
                res.products.forEach(i => {
                    // Verificar si el título incluye el texto de búsqueda o si no hay filtro de búsqueda
                    if (i.title.toUpperCase().includes(searchInput) || searchInput === "") {
                        valores = document.getElementById("productosencontrados").innerHTML += `
                            <div class="card diseñocards" style="width: 18rem;">
                                <img class="card-img-top " src="${i.thumbnail}" alt="Card image cap">
                                <div class="card-body contenido">
                                    <h5 class="card-title">${i.title}</h5>
                                    <p class="card-text"> ${i.description}</p>
                                    <h6 class="card-title">$${i.price}</h6>
                                    <button type="button" class="btn colorbotton text" data-toggle="modal" data-target="#ModalInfo" onclick="verInformacion('${i.title}','${i.thumbnail}','${i.description}','${i.price}')">Ver producto</button>
                                </div>
                            </div>`;
                    }
                });
            }
            else if (res.length === 1) {
                // Verificar si el título incluye el texto de búsqueda o si no hay filtro de búsqueda
                if (res.title.toUpperCase().includes(searchInput) || searchInput === "") {
                    valores = document.getElementById("productosencontrados").innerHTML += `
                        <div class="card diseñocards" style="width: 18rem;">
                            <img class="card-img-top" src="${res.thumbnail}" alt="Card image cap">
                            <div class="card-body">
                                <h5 class="card-title">${res.title}</h5>
                                <p class="card-text"> ${res.description}</p>
                                <h6 class="card-title">$${res.price}</h6>
                                <button type="button" class="btn colorbotton text" data-toggle="modal" data-target="#ModalInfo" onclick="verInformacion('${res.title}','${res.thumbnail}','${res.description}','${res.price}')">Ver producto</button>
                            </div>
                        </div>`;
                }
            }
        })
        .catch(err => console.error(err));
};

const verInformacion = (titulo, imagen, descripcion, precio) => {
    console.log(imagen);
    document.getElementById("titulo").innerHTML = `${titulo}`;
    document.getElementById("imagen").src = `${imagen}`;
    document.getElementById("descripcion").innerHTML = `${descripcion}`;
    document.getElementById("precio").innerHTML = `$${precio}`;
};

const limpiarFiltros = () => {
    document.getElementById("search-bar").value = "";
    document.getElementById("categorySelector").value = "";
    buscarProducto();
};
