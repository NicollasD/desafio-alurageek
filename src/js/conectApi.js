async function listProducts() {
    const conexao = await fetch("http://localhost:3000/products");
    const conexaoConvertida = await conexao.json();

    return conexaoConvertida;
}

async function createProduct(image, name, price) {
    const conexao = await fetch("http://localhost:3000/products", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            image: image,
            name: name,
            price: price            
        })
    });
    if (!conexao.ok) {
        throw new Error("Não foi possível adicionar o produto");
    }
    const conexaoConvertida = conexao.json();

    return conexaoConvertida;
}

async function searchProduct(termoDeBusca) {
    const conexao = await fetch(`http://localhost:3000/products?q=${termoDeBusca}`);
    const conexaoConvertida = await conexao.json();
    console.log(conexaoConvertida);
    return conexaoConvertida;
}

async function deleteProduct(productId) {
    const conexao = await fetch(`http://localhost:3000/products/${productId}`, {
        method: "DELETE",
    });

    if (!conexao.ok) {
        throw new Error("Não foi possível excluir o produto");
    }
    
    return conexao.json();
}

export const conectApi = {
    listProducts,
    createProduct,
    searchProduct,
    deleteProduct
}

