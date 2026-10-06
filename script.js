const vendas = [];

const formulario = document.getElementById("form-venda");
const listaVendas = document.getElementById("lista-vendas");
const valorTotal = document.getElementById("valor-total");
const mediaVendas = document.getElementById("media-vendas");
const maiorVenda = document.getElementById("maior-venda");
const menorVenda = document.getElementById("menor-venda");
const produtoMaisVendido = document.getElementById("produto-mais-vendido");
const produtoMenosVendido = document.getElementById("produto-menos-vendido");
const categoriaMaisVendida = document.getElementById("categoria-mais-vendida");


function atualizarPagina() {

    listaVendas.innerHTML = "";

    vendas.forEach(function(venda, index) {

        listaVendas.innerHTML += `
            <p>
                ${venda.produto} | ${venda.categoria} |
                Quantidade: ${venda.quantidade} |
                Total: R$ ${venda.total.toFixed(2)}

                <button
                    class="botao-excluir"
                    data-index="${index}">
                    🗑️
                </button>
            </p>
        `;

    });

    const botoesExcluir = document.querySelectorAll(".botao-excluir");

    botoesExcluir.forEach(function(botao) {

        botao.addEventListener("click", function() {

            const index = Number(botao.dataset.index);

            vendas.splice(index, 1);

            atualizarPagina();
            atualizarEstatistica();

        });

    });

}


function atualizarEstatistica() {

    if (vendas.length === 0) {

        valorTotal.textContent = "0.00";
        mediaVendas.textContent = "0.00";

        maiorVenda.textContent = "-------";
        menorVenda.textContent = "-------";

        produtoMaisVendido.textContent = "-------";
        produtoMenosVendido.textContent = "-------";
        categoriaMaisVendida.textContent = "-------";

        return;
    }


    // VALOR TOTAL

    let soma = 0;

    for (let venda of vendas) {
        soma += venda.total;
    }

    valorTotal.textContent = soma.toFixed(2);


    // MÉDIA DAS VENDAS

    const media = soma / vendas.length;

    mediaVendas.textContent = media.toFixed(2);


    // MAIOR VENDA

    let maior = vendas[0];

    for (let venda of vendas) {

        if (venda.total > maior.total) {
            maior = venda;
        }

    }

    maiorVenda.textContent =
        maior.produto + " - R$ " + maior.total.toFixed(2);


    // MENOR VENDA

    let menor = vendas[0];

    for (let venda of vendas) {

        if (venda.total < menor.total) {
            menor = venda;
        }

    }

    menorVenda.textContent =
        menor.produto + " - R$ " + menor.total.toFixed(2);


    // QUANTIDADE VENDIDA DE CADA PRODUTO

    let quantidadeProdutos = {};

    for (let venda of vendas) {

        let produto = venda.produto;

        if (quantidadeProdutos[produto]) {

            quantidadeProdutos[produto] += venda.quantidade;

        } else {

            quantidadeProdutos[produto] = venda.quantidade;

        }

    }


    // PRODUTO MAIS VENDIDO

    let maisVendido = "";
    let maiorQuantidade = 0;

    for (let produto in quantidadeProdutos) {

        if (quantidadeProdutos[produto] > maiorQuantidade) {

            maiorQuantidade = quantidadeProdutos[produto];
            maisVendido = produto;

        }

    }

    produtoMaisVendido.textContent =
        maisVendido + " " + maiorQuantidade + " unidades";


    // PRODUTO MENOS VENDIDO

    let menosVendido = "";
    let menorQuantidade = Infinity;

    for (let produto in quantidadeProdutos) {

        if (quantidadeProdutos[produto] < menorQuantidade) {

            menorQuantidade = quantidadeProdutos[produto];
            menosVendido = produto;

        }

    }

    produtoMenosVendido.textContent =
        menosVendido + " " + menorQuantidade + " unidades";


    // QUANTIDADE VENDIDA POR CATEGORIA

    let quantidadeCategorias = {};

    for (let venda of vendas) {

        let categoria = venda.categoria;

        if (quantidadeCategorias[categoria]) {

            quantidadeCategorias[categoria] += venda.quantidade;

        } else {

            quantidadeCategorias[categoria] = venda.quantidade;

        }

    }


    // CATEGORIA MAIS VENDIDA

    let categoriaCampea = "";
    let maiorQuantidadeCategoria = 0;

    for (let categoria in quantidadeCategorias) {

        if (quantidadeCategorias[categoria] > maiorQuantidadeCategoria) {

            maiorQuantidadeCategoria = quantidadeCategorias[categoria];
            categoriaCampea = categoria;

        }

    }

    categoriaMaisVendida.textContent =
        categoriaCampea + " " + maiorQuantidadeCategoria + " unidades";

}


// CADASTRAR VENDA

formulario.addEventListener("submit", function(event) {

    event.preventDefault();

    const produto = document.getElementById("produto").value;
    const categoria = document.getElementById("categoria").value;
    const quantidade = Number(document.getElementById("quantidade").value);
    const preco = Number(document.getElementById("preco").value);

    const total = quantidade * preco;

    const venda = {
        produto: produto,
        categoria: categoria,
        quantidade: quantidade,
        preco: preco,
        total: total
    };

    vendas.push(venda);

    atualizarPagina();
    atualizarEstatistica();

    // LIMPA O FORMULÁRIO APÓS O CADASTRO
    formulario.reset();

});