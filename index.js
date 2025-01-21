document.addEventListener("DOMContentLoaded", () => {
const jogosContainer = document.querySelector("#jogos_realizados");
const botaoAdicionaJogo = document.querySelector("#botao_adiciona_jogo");
const botaoVerificarJogos = document.querySelector("#botao_verificar_jogos");
const botaoAddNrsSorteadosDigitadosJuntos = document.querySelector("#button_adiciona_numeros_sorteados_digitados_juntos");
const botaoLimpaNumerosSorteados = document.querySelector("#buttom_limpa_numeros_sorteados");
const botaoAddNrsApostadosDigitadosJuntosJogo1 = document.querySelector("#button_adiciona_numeros_apostados_digitados_juntos_jogo1");
const botaoLimpaNumerosApostadosJogo1 = document.querySelector("#buttom_limpa_numeros_apostados_jogo1")

const adicionarApostaRealizada = () => {
    const totalJogos = jogosContainer.querySelectorAll("[data-jogo]").length;
    const novoId = `jogo${totalJogos + 1}`;
    const novoJogo = document.createElement("div");
    novoJogo.setAttribute("id", novoId);
    novoJogo.setAttribute("data-jogo", "");
    novoJogo.setAttribute("placeholder","Insira os números separados por vígula");
    const h3 = document.createElement("h3");
    h3.textContent = `Jogo ${totalJogos + 1}`;
    novoJogo.appendChild(h3);
    novoJogo.insertAdjacentHTML("beforeend",
        `<div class="input-group mb-3">
            <input type="text" id="input_numeros_apostados_digitados_juntos_jogo${totalJogos + 1}" class="form-control" placeholder="Digite ou cole os números aqui" aria-describedby="button-addon2">
            <button id="button_adiciona_numeros_apostados_digitados_juntos_jogo${totalJogos + 1}" class="btn btn-primary" onClick="adicionaNumerosDigitadosJuntos('input_numeros_apostados_digitados_juntos_jogo${totalJogos + 1}', 'numeros_apostados_jogo${totalJogos + 1}', 'input_numero_apostado')" type="button" id="button-addon2">Adicionar</button>
        </div>`)
    const divComInputNumerosApostados = document.createElement("div");
    divComInputNumerosApostados.setAttribute("id",`numeros_apostados_jogo${totalJogos + 1}`)
    divComInputNumerosApostados.classList.add("numeros_apostados");
    for(let i = 0; i < 20;i++){
        const input = document.createElement('input');
        input.setAttribute("type", "number");
        input.setAttribute("min", "1");
        input.setAttribute("step", "1");
        input.setAttribute("id", `numero_apostado${i + 1}_jogo${totalJogos + 1}`);
        input.classList.add("input_numero_apostado");
        divComInputNumerosApostados.appendChild(input);
    }
    novoJogo.appendChild(divComInputNumerosApostados)
    novoJogo.insertAdjacentHTML("beforeend",
        `<div id="buttom_limpa_numeros_apostados_jogo${totalJogos + 1}" class="d-flex justify-content-end m-3"><button class="btn btn-primary" onClick="limpaNumeros('numeros_apostados_jogo${totalJogos + 1}','input_numero_apostado','input_numeros_apostados_digitados_juntos_jogo${totalJogos + 1}')">Limpar</button></div>`)
    jogosContainer.appendChild(novoJogo);
};

const padronizaNumero = (numero) =>{
    if(numero.length == 1){
        numero = `0${numero}`
    }
    return numero;
}

const obtemApostas = () =>{
    const apostas = [];
    const divsNumerosApostados = document.querySelectorAll(".numeros_apostados");

    divsNumerosApostados.forEach(div => { 
        const inputsNumerosApostados = Array.from(div.querySelectorAll(".input_numero_apostado"));

        const numerosApostados = inputsNumerosApostados
            .map(input => padronizaNumero(input.value))
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

const obtemNumerosDigitadosJuntos = (idInputComNumerosDigitadosJuntos) =>{
    let stringNumerosSorteados = document.querySelector(`#${idInputComNumerosDigitadosJuntos}`).value;
    stringNumerosSorteados = stringNumerosSorteados.replaceAll(" ","");
    let listaDeNumerosSorteados = [];
    if(stringNumerosSorteados.includes(",")){
        listaDeNumerosSorteados = stringNumerosSorteados.split(",");
    }else{
        listaDeNumerosSorteados = dividirEmPares(stringNumerosSorteados);
    }

    return listaDeNumerosSorteados;
        
}

function dividirEmPares(string) {
    const resultado = [];
    for (let i = 0; i < string.length; i += 2) {
        resultado.push(string.slice(i, i + 2));
    }
    return resultado;
}


const adicionaNumerosDigitadosJuntos = (idInputComNumerosDigitadosJuntos, idDivComInputsNumeros, classeInputNumero) =>{
    const listaDeNumeros = obtemNumerosDigitadosJuntos(idInputComNumerosDigitadosJuntos);
    const divComInputsNumeros = document.querySelector(`#${idDivComInputsNumeros}`);
    const inputs = divComInputsNumeros.querySelectorAll(`.${classeInputNumero}`);   
   
    for(let i = 0; i < listaDeNumeros.length;i++){
        inputs[i].value = listaDeNumeros[i]
    }
}

const limpaNumeros = (idDivComInputsNumeros, classeInputNumero, idInputComNumerosDigitadosJuntos) => {
    const numeros = document.querySelector(`#${idDivComInputsNumeros}`);
    console.log(numeros)
    const inputComNumeroDigitadosJuntos = document.querySelector(`#${idInputComNumerosDigitadosJuntos}`)
    const inputs = numeros.querySelectorAll(`.${classeInputNumero}`);

    inputComNumeroDigitadosJuntos.value = ""
   
    for(let i = 0; i < inputs.length;i++){
        inputs[i].value = "";
    }
}

const testar = () =>{
    console.log(adicionaNumerosDigitadosJuntos())
}

botaoAdicionaJogo.addEventListener("click", adicionarApostaRealizada);
botaoVerificarJogos.addEventListener("click", verificaJogosRealizados);
botaoLimpaNumerosSorteados.addEventListener("click", () => {
    limpaNumeros("numeros_sorteados", "input_numero_sorteado","input_numeros_sorteados_digitados_juntos")
})
botaoAddNrsSorteadosDigitadosJuntos.addEventListener("click", () => {
    adicionaNumerosDigitadosJuntos("input_numeros_sorteados_digitados_juntos", "numeros_sorteados", "input_numero_sorteado");
});
botaoAddNrsApostadosDigitadosJuntosJogo1.addEventListener("click", () => {
    adicionaNumerosDigitadosJuntos("input_numeros_apostados_digitados_juntos_jogo1", "numeros_apostados_jogo1", "input_numero_apostado");
});
botaoLimpaNumerosApostadosJogo1.addEventListener("click", () =>{
    limpaNumeros("numeros_apostados_jogo1", "input_numero_apostado","input_numeros_apostados_digitados_juntos_jogo1")
})
})
