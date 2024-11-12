import { conectApi } from "./conectApi.js";
import createCard from "./showProducts.js";

async function searchProduct(evento) {
    evento.preventDefault();

    const searchData = document.querySelector("[data-search]").value;
    const search = await conectApi.searchProduct(searchData);

    const list = document.querySelector("[data-list]");

    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }

    search.forEach(elemento => list.appendChild(
        createCard(elemento.image, elemento.name, elemento.price)))
    
    if (search.length == 0) {
        list.innerHTML = `<h2 class="mensagem__titulo">Não existem produtos com esse termo</h2>`;
    }

}

async function listAllProducts() {
    const list = document.querySelector("[data-list]");
    
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }
    
    const products = await conectApi.listProducts();
    products.forEach(elemento => list.appendChild(
        createCard(elemento.image, elemento.name, elemento.price)));
}

const searchButton = document.querySelector("[data-search-button]");
searchButton.addEventListener("click", evento => searchProduct(evento));

const showAllButton = document.querySelector("[data-show-all]");
showAllButton.addEventListener("click", () => {
    document.querySelector("[data-search]").value = " ";
    listAllProducts();
});