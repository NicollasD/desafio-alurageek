import { conectApi } from "./conectApi.js";

const list = document.querySelector("[data-list]");
const listContainer = document.getElementById("products");

export default function createCard(image, name, price, productId) {
    const product = document.createElement("li");
    product.className = "product__card";
    product.innerHTML = `<img class="product__image" src="${image}" alt="${name}">
    <div class="product__info">
        <h2 class="product__name">${name}</h2>
        <h2 class="product__price">R$ ${price}</h2>
    </div>
    <div class="card__buttons">
        <button class="buy__product__btn">Comprar</button>
        <button class="delete__product__btn">
        <svg alt="delete" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 36">
            <g>
                <path fill="currentColor" class="cls-1" d="m5.05,36c-.83,0-1.53-.29-2.12-.88-.59-.59-.88-1.29-.88-2.12V4.5H0V1.5h9.4V0h13.2v1.5h9.4v3h-2.05v28.5c0,.8-.3,1.5-.9,2.1s-1.3.9-2.1.9H5.05ZM26.95,4.5H5.05v28.5h21.9V4.5ZM10.35,28.7h3V8.75h-3v19.95Zm8.3,0h3V8.75h-3v19.95ZM5.05,4.5v28.5V4.5Z" />
            </g>
        </svg>
        </button>
    </div>`;

    const deleteButton = product.querySelector(".delete__product__btn");

    // Adicionar evento de clique para excluir o produto
    deleteButton.addEventListener("click", async () => {
        try {
            // Chama a função de exclusão passando o id do produto
            await conectApi.deleteProduct(productId);
            product.remove(); // Remove o card da página após excluir o produto
        } catch (error) {
            alert("Erro ao excluir o produto: " + error.message);
        }
    });

    return product;
}


async function listProducts() {
    try {
        const listApi = await conectApi.listProducts();
        listApi.forEach(elemento => list.appendChild(createCard(elemento.image, elemento.name, elemento.price, elemento.id)))
    } catch {
        listContainer.innerHTML = `<h2 class="mensagem__titulo">Não foi possível carregar a lista de produtos.</h2>`;
    }
}

listProducts();