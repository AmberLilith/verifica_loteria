//document.addEventListener("DOMContentLoaded", () => {
const jogosContainer = document.querySelector("#jogos_realizados");
const botaoAdicionaJogo = document.querySelector("#botao_adiciona_jogo");
const botaoVerificarJogos = document.querySelector("#botao_verificar_jogos");

const adicionarApostaRealizada = () => {
    const totalJogos = jogosContainer.querySelectorAll("[data-jogo]").length;
    const novoId = `jogo_${totalJogos + 1}`;
    const novoJogo = document.createElement("div");
    novoJogo.setAttribute("id", novoId);
    novoJogo.setAttribute("data-jogo", "");
    novoJogo.setAttribute("placeholder","Insira os números separados por vígula");
    const h3 = document.createElement("h3");
    h3.textContent = `Jogo ${totalJogos + 1}`;
    novoJogo.appendChild(h3);
    const divNumerosApostados = document.createElement("div");
    divNumerosApostados.classList.add("numeros_apostados");
    for(let i = 0; i < 20;i++){
        const input = document.createElement('input');
        input.setAttribute("type", "number");
        input.setAttribute("min", "1");
        input.setAttribute("step", "1");
        input.setAttribute("id", `numero_apostado${i + 1}_jogo${totalJogos + 1}`);
        input.classList.add("input_numero_apostado");
        divNumerosApostados.appendChild(input);
    }
    novoJogo.appendChild(divNumerosApostados)
    jogosContainer.appendChild(novoJogo);
};

const obtemApostas = () =>{
    const apostas = [];
    const divsNumerosApostados = document.querySelectorAll(".numeros_apostados");

    divsNumerosApostados.forEach(div => { 
        const inputsNumerosApostados = Array.from(div.querySelectorAll(".input_numero_apostado"));

        const numerosApostados = inputsNumerosApostados
            .map(input => input.value)
            .filter(valor => valor !== "");

        if (numerosApostados.length > 0) { 
            apostas.push(numerosApostados); 
        }
    });
    
    return apostas
}

const obtemNumerosSorteados = () =>{
    const divNumerosSorteados = document.querySelector("#numeros_sorteados");
    const inputsNumerosSorteados = divNumerosSorteados.querySelectorAll("[data-numero-resultado]");
    return Array.from(inputsNumerosSorteados).map(input => input.value).filter(valor => valor != "");
}

const verificaJogosRealizados = () => {
    const jogosVerificados = document.querySelector("#verificacoes");
    jogosVerificados.replaceChildren()
    let resultado = obtemNumerosSorteados()
    const jogosRealizados = obtemApostas();
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
    console.log(obtemApostas())
}

botaoAdicionaJogo.addEventListener("click", adicionarApostaRealizada);
botaoVerificarJogos.addEventListener("click", verificaJogosRealizados);
//});