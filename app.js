    //let titulo = document.querySelector('h1');
    //titulo .innerHTML = 'Jogo do Numero Secreto';

    //let paragrafo = document.querySelector('p');
    //paragrafo.innerHTML = 'Escolha um numero entre 1 e 10';

    let listaDeNumerosSorteados = [];
    let numeroLimite = 15;
    let numeroSecreto = gerarNumeroAleatorio();
    let tentativas = 1;

    function exibirTextoNaTela(tag, texto) {
        let campo = document.querySelector(tag);
        campo.innerHTML = texto;
        responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate: 1.2})
    }

    
    function exibirMensagemInicial(){
        exibirTextoNaTela('h1', 'Jogo do Numero Secreto');
        exibirTextoNaTela('p', 'Tente adivinhar o número secreto de 1 a 15!');
    }

     exibirMensagemInicial();


    function verificarChute() {
        let chute = document.querySelector('input').value;

        if (chute == numeroSecreto) {
            exibirTextoNaTela('h1', 'Acertou!');
            let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
            let mensagemTentativa = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
            exibirTextoNaTela('p', mensagemTentativa);
            document.getElementById('reiniciar').removeAttribute('disabled');
        } else {
            if (chute > numeroSecreto) {
                exibirTextoNaTela('p', 'O número secreto é menor');
            } else {
                exibirTextoNaTela('p', 'O número secreto é maior!');
            }
            tentativas++;
            limparCampo();
        }
    }

    function gerarNumeroAleatorio() {
        let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1); 
        let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

        if (quantidadeDeElementosNaLista == numeroEscolhido){
            listaDeNumerosSorteados = [];
        }

        if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
            return gerarNumeroAleatorio(); // Chama a função recursivamente até gerar um número não sorteado
        } else {
            listaDeNumerosSorteados.push(numeroEscolhido);
            console.log(listaDeNumerosSorteados);
            return numeroEscolhido;
        }
    }

    function limparCampo() {
        let chute = document.querySelector('input');
        chute.value = '';
    }

    function reiniciarJogo() {
        numeroSecreto = gerarNumeroAleatorio();
        limparCampo();
        tentativas =1;
        exibirMensagemInicial();
        document.getElementById('reiniciar').setAttribute('disabled', true);
    }
     