let amigos = [];

function adicionarAmigo() {
    const input = document.getElementById("amigo");
    const nome = input.value.trim();
    const feedbackContainer = document.getElementById("feedback-container");
    feedbackContainer.innerHTML = ""; //limpa mensagens anteriores

    if (nome === "") {
        const erro = document.createElement("div");
        erro.textContent = "Por favor, digite um nome válido.";
        erro.classList.add("feedback-message", "feedback-error"); //adicione uma classe de erro
        feedbackContainer.appendChild(erro);
        setTimeout(() => erro.remove(), 2000);
        return;
    }

    if (amigos.includes(nome)) {
        const erro = document.createElement("div");
        erro.textContent = "Este nome já foi adicionado!";
        erro.classList.add("feedback-message", "feedback-error");
        feedbackContainer.appendChild(erro);
        setTimeout(() => erro.remove(), 2000);
        return;
    }

    amigos.push(nome);
    atualizarLista();
    input.value = "";

    //adicionando feedback visual de sucesso
    const sucesso = document.createElement("div");
    sucesso.textContent = `${nome} adicionado!`;
    sucesso.classList.add("feedback-message");
    feedbackContainer.appendChild(sucesso);
    setTimeout(() => sucesso.remove(), 2000);
}

function atualizarLista() {
    const lista = document.getElementById("listaAmigos");
    lista.innerHTML = "";

    amigos.forEach((nome, index) => {
        const item = document.createElement("li");
        item.classList.add("lista-item");
        item.textContent = nome;

        const botaoRemover = document.createElement("button");
        botaoRemover.textContent = "✖";
        botaoRemover.classList.add("delete-button");
        botaoRemover.onclick = () => removerAmigo(index);

        item.appendChild(botaoRemover);
        lista.appendChild(item);
    });
}

function removerAmigo(index) {
    amigos.splice(index, 1);
    atualizarLista();
}

function sortearAmigo() {
    if (amigos.length < 2) {
        const feedbackContainer = document.getElementById("feedback-container");
        feedbackContainer.innerHTML = "";
        const erro = document.createElement("div");
        erro.textContent = "Adicione pelo menos dois participantes para sortear.";
        erro.classList.add("feedback-message", "feedback-error");
        feedbackContainer.appendChild(erro);
        setTimeout(() => erro.remove(), 2000);
        return;
    }

    const indiceSorteado = Math.floor(Math.random() * amigos.length);
    const sorteado = amigos[indiceSorteado];
    exibirResultado(sorteado);
}

function exibirResultado(nomeSorteado) {
    const listaResultado = document.getElementById("resultado");
    listaResultado.innerHTML = `<li>Nome sorteado: <strong>${nomeSorteado}</strong></li>`;
}

function novoSorteio() {
    amigos = [];
    document.getElementById("listaAmigos").innerHTML = "";
    document.getElementById("resultado").innerHTML = "";
    const feedbackContainer = document.getElementById("feedback-container");
    feedbackContainer.innerHTML = ""; //limpa qualquer feedback restante
}

document.getElementById("button-add").addEventListener("click", adicionarAmigo); 
document.getElementById("amigo").addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        adicionarAmigo();
    }
});