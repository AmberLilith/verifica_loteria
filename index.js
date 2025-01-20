//document.addEventListener("DOMContentLoaded", () => {
const jogosContainer = document.querySelector("#jogos_realizados");
const botaoAdicionaJogo = document.querySelector("#botao_adiciona_jogo");
const botaoVerificarJogos = document.querySelector("#botao_verificar_jogos");


const adicionarJogo = () => {
    const totalJogos = jogosContainer.querySelectorAll("[data-jogo]").length;
    const novoId = `jogo_${totalJogos + 1}`;
    const novoJogo = document.createElement("div");
    novoJogo.classList.add("mb-3");
    novoJogo.setAttribute("data-jogo", "");
    novoJogo.setAttribute("placeholder","Insira os números separados por vígula")
    novoJogo.innerHTML = `
<label for="${novoId}" class="form-label">Jogo ${totalJogos + 1}</label>
<input type="text" class="form-control" id="${novoId}" jogo-realizado>`;

    jogosContainer.appendChild(novoJogo);
};

const dividirEmPares = (string) => {
    const resultado = [];
    for (let i = 0; i < string.length; i += 2) {
        resultado.push(string.slice(i, i + 2));
    }
    return resultado;
}

const normaliza = (string) => {
    string = string.replaceAll(" ","");
    if (string[0] == ",") {
        string = string.slice(1);
    }
    
    if ((string[string.length - 1]) == ",") {
        string = string.slice(0, -1);
    }

    return string
}

const obtemJogosRealizados = () => {
    const inputsJogosRealizados = jogosContainer.querySelectorAll("[jogo-realizado]");
    let jogosRealizados = [];
    for (const jogo of inputsJogosRealizados) {
        console.log(jogo.value.split(","))
        jogosRealizados.push(jogo.value.split(","));
    }
    return jogosRealizados;
}

const verificaJogosRealizados = () => {
    const jogosVerificados = document.querySelector("#verificacoes");
    jogosVerificados.replaceChildren()
    let resultado = document.querySelector("#resultado").value
    resultado = normaliza(resultado);
    resultado = resultado.includes(",") ? resultado.split(",") : dividirEmPares(resultado);
    const jogosRealizados = obtemJogosRealizados();
    let acertos = []
    let contador = 0
    for (const jogo of jogosRealizados) {
        acertos = []
        contador++
        acertos = resultado.filter(valor => jogo.includes(valor));
        const nomeJogo = `Jogo ${contador}`
        exibeVerificacaoJogo(nomeJogo, resultado, jogo, acertos);
        console.log(acertos.length + " acertos no jogo " + contador + " : " + acertos)
    }

}

const exibeVerificacaoJogo = (nomeJogo, resultado, jogo, acertos) => {
    const jogosVerificados = document.querySelector("#verificacoes");
    const jogoVerificado = document.createElement("div");
    jogoVerificado.classList.add("border", "jogo_verificado");
    const hr = document.createElement("hr");
    jogosVerificados.appendChild(hr);
    const title = document.createElement("h2");
    title.textContent = `${nomeJogo} (${acertos.length} acertos!)`;
    jogosVerificados.appendChild(title);
    for (const numero of resultado) {
        if (acertos.includes(numero)) {
            const numeroAcertado = document.createElement("div");
            numeroAcertado.classList.add("numero_acertado");
            numeroAcertado.textContent = numero;
            jogoVerificado.appendChild(numeroAcertado);
        } else {
            const numeroErrado = document.createElement("div");
            numeroErrado.classList.add("numero_errado");
            numeroErrado.textContent = numero;
            jogoVerificado.appendChild(numeroErrado);
        }
    }
    jogosVerificados.appendChild(jogoVerificado);
}

const ver = () => {
    console.log(normaliza("s45 8 4,"))
}

botaoAdicionaJogo.addEventListener("click", adicionarJogo);
botaoVerificarJogos.addEventListener("click", verificaJogosRealizados);
//});