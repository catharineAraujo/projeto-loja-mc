document.addEventListener("DOMContentLoaded", () => {
  const carrinhoContainer = document.getElementById("carrinho-container");
  const totalElement = document.getElementById("total");
  const finalizarBtn = document.querySelector(".finalizar");

  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

  function atualizarCarrinho() {
    carrinhoContainer.innerHTML = "";
    let total = 0;

    carrinho.forEach((item, index) => {
      const subtotal = item.preco * item.quantidade;
      total += subtotal;

      const produtoEl = document.createElement("div");
      produtoEl.classList.add("item-carrinho");
      produtoEl.innerHTML = `
        <img src="${item.imagem}" alt="${item.nome}">
        <div class="info">
          <h4>${item.nome}</h4>
          <p>Tamanho: ${item.tamanho}</p>
          <p>Cor: ${item.cor}</p>
          <p>Preço: R$ ${item.preco.toFixed(2).replace(".", ",")}</p>
          <label>Qtd: </label>
          <input type="number" min="1" value="${item.quantidade}" data-index="${index}">
          <button class="remover" data-index="${index}">Remover</button>
        </div>
      `;
      carrinhoContainer.appendChild(produtoEl);
    });

    totalElement.textContent = `Total: R$ ${total.toFixed(2).replace(".", ",")}`;
  }

  carrinhoContainer.addEventListener("input", (e) => {
    if (e.target.type === "number") {
      const index = e.target.getAttribute("data-index");
      carrinho[index].quantidade = parseInt(e.target.value);
      localStorage.setItem("carrinho", JSON.stringify(carrinho));
      atualizarCarrinho();
    }
  });

  carrinhoContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("remover")) {
      const index = e.target.getAttribute("data-index");
      carrinho.splice(index, 1);
      localStorage.setItem("carrinho", JSON.stringify(carrinho));
      atualizarCarrinho();
    }
  });

  finalizarBtn.addEventListener("click", () => {
    if (carrinho.length === 0) {
      alert("Seu carrinho está vazio!");
      return;
    }

    let metodo = prompt("Escolha o método de pagamento: Pix, Cartão ou Boleto");
    if (!metodo) return;

    alert(`Compra finalizada com sucesso via ${metodo}!`);
    localStorage.removeItem("carrinho");
    carrinho = [];
    atualizarCarrinho();
  });

  atualizarCarrinho();
});
