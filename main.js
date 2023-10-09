const enumeradorDasOperacoes = {
  ADICAO: '+',
  SUBTRACAO: '-',
  MULTIPLICACAO: 'x',
  DIVISAO: '/'
};

const operadores = ['+', '-', 'x', '/'];
const operadoresPrioritarios = ['x', '/'];

class Calculadora {
  constructor() {
    this._pilha = [];
  }

  obterPilha() {
    return this._pilha;
  }

  adicionaValor(valor) {
    this._pilha.push(parseFloat(valor.replace(',', '.')));
  }

  adicionaOperacao(operacao) {
    this._pilha.push(operacao);
  }

  calculo() {
    const pilha = this._pilha;
    const valores = [];
    const operacoes = [];

    pilha.forEach((operadorAtual) => {
      if (typeof operadorAtual === 'number') {
        valores.push(operadorAtual);
      } else if (operadores.includes(operadorAtual)) {
        while (operacoes.length > 0 && operadores.indexOf(operacoes[operacoes.length - 1]) >= operadores.indexOf(operadorAtual)) {
          const operacao = operacoes.pop();
          const valor2 = valores.pop();
          const valor1 = valores.pop();
          valores.push(this.aplicarOperacao(valor1, valor2, operacao));
        }
        operacoes.push(operadorAtual);
      }
    });

    while (operacoes.length > 0) {
      const operacao = operacoes.pop();
      const valor2 = valores.pop();
      const valor1 = valores.pop();
      valores.push(this.aplicarOperacao(valor1, valor2, operacao));
    }
    this._pilha = [valores[0].toString()];
    return valores[0].toString();
  }

  aplicarOperacao(valor1, valor2, operacao) {
    switch (operacao) {
      case enumeradorDasOperacoes.ADICAO:
        return valor1 + valor2;
      case enumeradorDasOperacoes.SUBTRACAO:
        return valor1 - valor2;
      case enumeradorDasOperacoes.MULTIPLICACAO:
        return valor1 * valor2;
      case enumeradorDasOperacoes.DIVISAO:
        if (valor2 === 0) {
          campoDeExibicao.innerHTML =  `O número ${valor1} não pode ser dividido por ${valor2}`
          setTimeout(() => {campoDeExibicao.innerHTML = `${valor1 + '  ' + operacao + '  '}`},1400)
        } else {return valor1 / valor2;}
      default:
       console.error('Operação inválida');
    }
  }
}

const calcular = new Calculadora();//minha instancia ---------------------------------------------

const campoDeExibicao = document.querySelector('.display');
const botaoIgual = document.getElementById('igual');
const botaoApagarDigito = document.getElementById('apagar');
const botaoLimpar = document.getElementById('limpar');
const botaoLimparHistoricos = document.getElementById('apagarConsole')
const listaDasOperacoes = document.getElementById('historico-lista');
const botoesOperadores = document.querySelectorAll('.operador');
const botoesNumerados = document.querySelectorAll('.operador_');

botoesNumerados.forEach(botoes => {
  botoes.addEventListener('click', () => {

    if(campoDeExibicao.innerHTML.trim().slice(-1) === ',' && botoes.innerHTML === ',') {
      return
    }
    campoDeExibicao.innerHTML += botoes.innerHTML
  });
});

botoesOperadores.forEach(botoes => {
  botoes.addEventListener('click', () => {
    const conteudoCampo = campoDeExibicao.innerHTML.trim(); 
    const ultimoCaractere = conteudoCampo.slice(-1);
    if (operadores.includes(ultimoCaractere)) {
      campoDeExibicao.innerHTML = conteudoCampo.slice(0, -1) + botoes.innerHTML + '  ' ;
    } else {
      campoDeExibicao.innerHTML += '  ' + botoes.innerHTML + '  ';
    }
  });
});

botaoIgual.addEventListener("click", () => {
  const expressao = campoDeExibicao.innerHTML.replace(',', '.');
  const partes = expressao.split(/(\+|-|x|\/)/).map(item => item.trim()).filter(Boolean);
  calcular.obterPilha();
  partes.forEach((item) => {
    if (operadores.includes(item)) {
      calcular.adicionaOperacao(item);
    } else {
      calcular.adicionaValor(item);
    }
  });
  const resultado = calcular.calculo();

  if (isNaN(resultado) || resultado === Infinity) {
    campoDeExibicao.innerHTML = 'Erro ao fazer a operação';
    setTimeout(() => { campoDeExibicao.innerHTML = ''; }, 1200);
    return;
  } else { 
    const elementoLista = document.createElement('li');
    listaDasOperacoes.innerHTML += elementoLista.innerHTML;
    elementoLista.innerHTML = `${expressao.replace('.', ',')} = ${resultado.replace('.', ',')}`;
    listaDasOperacoes.appendChild(elementoLista);
    console.log('resultado da operação:', expressao.replace('.', ','), '=', resultado.replace('.', ','));
  }
 campoDeExibicao.innerHTML = resultado.toString().replace ('.', ',');
});

botaoApagarDigito.addEventListener("click", () => {
  const expressao = campoDeExibicao.innerHTML;
  campoDeExibicao.innerHTML = expressao.slice(0, -1);
});

botaoLimpar.addEventListener("click", () => {
  campoDeExibicao.innerHTML = '';
});

botaoLimparHistoricos.addEventListener("click", () => {
  console.clear(), listaDasOperacoes.innerHTML = ''
})

//funções para exibir no display quando digito no teclado --------------------------------------------------
document.addEventListener("keydown", (evento) => {
  if (evento.key === "Enter") {
    evento.preventDefault();
    botaoIgual.click();
  }
  const teclas = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', ','];
  if (teclas.includes(evento.key)) {
    const conteudoCampo = campoDeExibicao.innerHTML.trim();
    const ultimoCaractere = conteudoCampo.slice(-1);

    // Verifique se o último caractere é uma vírgula e a tecla pressionada é uma vírgula
    if (ultimoCaractere === ',' && evento.key === ',') {
      return;
    }

    campoDeExibicao.innerHTML += evento.key;
  }
  if (operadores.includes(evento.key)) {
    const conteudoCampo = campoDeExibicao.innerHTML.trim();
    const ultimoCaractere = conteudoCampo.slice(-1);
    if (operadores.includes(ultimoCaractere)) {
      campoDeExibicao.innerHTML = conteudoCampo.slice(0, -1) + evento.key + '  ';
    } else {
      campoDeExibicao.innerHTML += '  ' + evento.key + '  ';
    }    
  }

  if (evento.key === "Backspace") {
    botaoApagarDigito.click();
  }
  if (evento.key === "c" || evento.key === "C") {
    botaoLimpar.click();
  }
  if (evento.key === "Delete") {
    apagarConsole.click();
  }
});

document.addEventListener("keydown", (evento) => {
  if (evento.key === "Delete") {
    botaoLimparHistoricos.click();
  }
});


//exibir historico ---------------------------------------------------------
const menuCheckbox = document.getElementById("menu");
const listaHistorico = document.querySelector(".lista");

menuCheckbox.addEventListener("click", () => {
  if (menuCheckbox.checked) {
    listaHistorico.style.display = "block";
  } else {
    listaHistorico.style.display = "none";
  }
});