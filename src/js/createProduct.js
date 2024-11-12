import { conectApi } from "./conectApi.js";
const form = document.querySelector("[data-form]");

async function createProduct(evento) {
    evento.preventDefault();
    
    const image = document.querySelector("[data-image]").value;
    const name = document.querySelector("[data-product-name]").value;
    const price = document.querySelector("[data-price]").value;
try {
    await conectApi.createProduct(image, name, price);
        form.reset();
} catch (e) {
    alert(e);
    }
}


document.querySelector("[data-price]").addEventListener('input', function(e) {
    let value = e.target.value;
    // Substitui qualquer coisa que não seja número ou vírgula por nada
    value = value.replace(/[^0-9,]/g, '');
    // Substitui vírgula por ponto, para manter o padrão do JavaScript para valores numéricos
    e.target.value = value;
  });

form.addEventListener("submit", evento => createProduct(evento));


