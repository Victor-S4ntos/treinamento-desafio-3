const operacoes = {
  ADICAO: '+',
  SUBTRACAO: '-',
  MULTIPLICACAO: 'x',
  DIVISAO: '/'
};

const operadores = ['+', '-', 'x', '/'];

class Calculadora {
  constructor() {
    this._pilha = [];
  }

  get pilha() {
    return this._pilha;
  }

  adicionaValor(valor) {
    this._pilha.push(valor);
  }

  adicionaOperacao(operacao) {
    this._pilha.push(operacao);
  }

  calculo() {
    const pilha = this._pilha;
    const valores = [];
    const operacoes = [];
  
    for (const item of pilha) {
      if (operadores.includes(item)) {
        while (operacoes.length > 0 && this.prioridade(operacoes[operacoes.length - 1]) >= this.prioridade(item)) {
          const operacao = operacoes.pop();
          const valor2 = valores.pop();
          const valor1 = valores.pop();
          const resultado = this.aplicarOperacao(valor1, valor2, operacao);
          valores.push(resultado);
        }
        operacoes.push(item);
      } else {
        valores.push(parseFloat(item));
      }
    }
  
    while (operacoes.length > 0) {
      const valor1 = valores.pop();
      const operacao = operacoes.pop();
      const valor2 = valores.pop();
      valores.push( this.aplicarOperacao(valor1, valor2, operacao));
    }
    console.log(pilha)
  
    if (valores.length !== 1 || operacoes.length !== 0) {
      throw new Error('Erro na expressão');
    }
  
    this._pilha = [valores[0].toString()];
    return valores[0].toString();
  }

  prioridade(operacao) {
    if (operacao === '+' || operacao === '-') return 1;
    if (operacao === 'x' || operacao === '/') return 2;
    return 0;
  }

  aplicarOperacao(valor1, valor2, operacao) {
    switch (operacao) {
      case '+':
        return valor1 + valor2;
      case '-':
        return valor1 - valor2;
      case 'x':
        return valor1 * valor2;
      case '/':
        if (valor2 === 0) {
          campoDeExibicao.innerHTML = `O número ${valor1} não pode ser dividio por ${valor2}`
          setTimeout(() => {campoDeExibicao.innerHTML = `${valor1 += '  ' +operacao+ '  '}`}, 1400)
        }
        return valor1 / valor2;
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
    campoDeExibicao.innerHTML += botoes.innerHTML
  })
})

botoesOperadores.forEach(botoes => {
  botoes.addEventListener('click', () => {
    const conteudoCampo = campoDeExibicao.innerHTML.trim(); 
    const ultimoCaractere = conteudoCampo.slice(-1);
    if (operadores.includes(ultimoCaractere) && operadores.includes(botoes.innerHTML)) {
      campoDeExibicao.innerHTML = conteudoCampo.slice(0, -1) + botoes.innerHTML + '  ' ;
    } else {
      campoDeExibicao.innerHTML += '  ' + botoes.innerHTML + '  ';
    }
  })
})

botaoIgual.addEventListener("click", () => {

    const expressao = campoDeExibicao.innerHTML.replace(',', '.');
    const partes = expressao.split(/(\+|-|x|\/)/).map(item => item.trim()).filter(Boolean);

    calcular.pilha.length = 0;

    for (const item of partes) {
      if (operadores.includes(item)) {
        calcular.adicionaOperacao(item);
      } else {
        calcular.adicionaValor(item);
      }
    }

    const resultado = calcular.calculo();

    if(isNaN(resultado) || resultado === Infinity) {
      campoDeExibicao.innerHTML = 'Erro ao fazer a operação'
      setTimeout(()=> {campoDeExibicao.innerHTML = ''}, 1200)
    }else { 
      // const elementoLista = document.createElement('li');
      // listaDasOperacoes.innerHTML += elementoLista.innerHTML
      // elementoLista.innerHTML = `${expressao} = ${resultado}`;
      // listaDasOperacoes.appendChild(elementoLista);
      // console.log('resultado da operação:', expressao, '=', resultado)
    }
});

botaoApagarDigito.addEventListener("click", () => {
  const expressao = campoDeExibicao.innerHTML;
  campoDeExibicao.innerHTML = expressao.slice(0, -1);
});

botaoLimpar.addEventListener("click", () => {
  campoDeExibicao.innerHTML = "";
});

botaoLimparHistoricos.addEventListener("click", () => {
  console.clear(), listaDasOperacoes.innerHTML = ''
})

//funções para exibir no display quando digito no teclado --------------------------------------------------
document.addEventListener("keydown", (evento) => {
  if (evento.key === "Enter") {
    botaoIgual.click();
  }
  const teclas = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', ','];
  if (teclas.includes(evento.key)) {
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

document.addEventListener("keydown", (evento)=> {
  if(evento.key === "Delete") {
    botaoLimparHistoricos.click()
  }
})

//exibir historico ---------------------------------------------------------
const menuCheckbox = document.getElementById("menu");
const listaHistorico = document.querySelector(".lista");

menuCheckbox.addEventListener("change", function() {
  if (menuCheckbox.checked) {
    listaHistorico.style.display = "block";
  } else {
    listaHistorico.style.display = "none";
  }
});