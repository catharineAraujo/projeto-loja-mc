document.addEventListener("DOMContentLoaded", () => {
  console.log("Script principal carregado!");

  const cards = document.querySelectorAll(".card");

  // cria o modal (uma única vez)
  const modal = document.createElement("div");
  modal.className = "modal-overlay";
  modal.innerHTML = `
    <div class="modal-content">
      <h3>Selecione as opções</h3>
      <label>Tamanho:</label>
      <select id="tamanho">
        <option value="P">P</option>
        <option value="M">M</option>
        <option value="G">G</option>
      </select>

      <label>Cor:</label>
      <select id="cor">
        <option value="Preto">Preto</option>
        <option value="Branco">Branco</option>
        <option value="Cinza">Cinza</option>
        <option value="Marrom">Marrom</option>
      </select>

      <label>Quantidade:</label>
      <input type="number" id="quantidade" min="1" value="1"/>

      <div class="modal-buttons">
        <button id="addCarrinho">Adicionar</button>
        <button id="fecharModal">Cancelar</button>
      </div>
    </div>`;
  document.body.appendChild(modal);
  modal.style.display = "none";

  let produtoAtual = null;

  // clique em cada card
  cards.forEach(card => {
    card.addEventListener("click", () => {
      produtoAtual = {
        nome: card.querySelector("h3").textContent,
        preco: parseFloat(card.querySelector("p").textContent.replace("R$", "").replace(",", ".").trim()),
        imagem: card.querySelector("img").src
      };
      console.log("Produto clicado:", produtoAtual.nome);
      modal.style.display = "flex";
    });
  });

  // fecha modal
  modal.addEventListener("click", e => {
    if (e.target.id === "fecharModal" || e.target === modal) {
      modal.style.display = "none";
    }
  });

  // adiciona ao carrinho
  modal.querySelector("#addCarrinho").addEventListener("click", () => {
    if (!produtoAtual) return;
    const tamanho = document.getElementById("tamanho").value;
    const cor = document.getElementById("cor").value;
    const quantidade = parseInt(document.getElementById("quantidade").value);

    const item = { ...produtoAtual, tamanho, cor, quantidade };
    const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    carrinho.push(item);
    localStorage.setItem("carrinho", JSON.stringify(carrinho));

    alert("Produto adicionado ao carrinho!");
    modal.style.display = "none";
  });
});

// estilo do modal
const style = document.createElement("style");
style.textContent = `
.modal-overlay {
  position: fixed;
  top:0; left:0; width:100%; height:100%;
  background:rgba(0,0,0,0.5);
  display:flex; justify-content:center; align-items:center;
  z-index:2000;
}
.modal-content {
  background:#fff; padding:20px; border-radius:10px; width:300px; text-align:center;
}
.modal-content select, .modal-content input {
  width:100%; margin-bottom:10px; padding:5px;
}
.modal-buttons {
  display:flex; justify-content:space-around; margin-top:10px;
}
.modal-buttons button {
  background:#6800bd; color:#fff; border:none; padding:8px 15px;
  border-radius:5px; cursor:pointer; font-weight:bold;
}
.modal-buttons button:hover { background:#36004b; }
`;
document.head.appendChild(style);