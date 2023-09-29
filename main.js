const operacoes = {
  ADICAO: '+',
  SUBTRACAO: '-',
  MULTIPLICACAO: 'x',
  DIVISAO: '/'
}

// Classe Calculadora ---------------------------------------------------------------------------
class Calculadora {
  constructor(valorA, operacao, valorB) {
    this._valorA = valorA;
    this._operacao = operacao;
    this._valorB = valorB;
  }
  
//metodos para armazenar e atualizar os valores -------------------------------------------------
  get valorA() {
    return this._valorA;
  }

  set valorA(valor) {
    this._valorA = valor;
  }

  get operacao() {
    return this._operacao;
  }

  set operacao(operacao) {
    this._operacao = operacao;
  }

  get valorB() {
    return this._valorB;
  }

  set valorB(valor) {
    this._valorB = valor;
  }

  conta() {
    switch(this._operacao) {
      case operacoes.ADICAO: return this._valorA + this._valorB
      case operacoes.SUBTRACAO: return this._valorA - this._valorB
      case operacoes.MULTIPLICACAO: return this._valorA * this._valorB
      case operacoes.DIVISAO: if(this._valorB === 0) {
        campoDeExibicao.innerHTML = `O número ${this._valorA} não pode ser divido por ${this._valorB}`
        setTimeout(() => {campoDeExibicao.innerHTML = `${this._valorA += '  ' + this._operacao+ '  '}`}, 1400);
      }else { return this._valorA / this._valorB }
      default: throw new Error('Faça uma operação');
    }
  }
}

const campoDeExibicao = document.querySelector('.display');//campo do display da calculadora -----------------------
const botoesOperadores = document.querySelectorAll('.operador');//botões de operação como: +, -, x e / --------------------------
const botoesNumeradosEVirgula = document.querySelectorAll('.operador_');//botões de numeros do 0 ao 9 e a virgula(,) ---------------------------
const botaoIgual = document.getElementById('igual');//botão para exibir o resultado de toda a operação, o igual(=) ------------------------------------
const span = document.getElementById('historico-span')
const listaDasOperacoes = document.getElementById('historico-lista')

//exbir no campo ------------------------------------------------------
const operadores = ['+', '-', 'x', '/'];
botoesOperadores.forEach((botao) => {
  botao.addEventListener("click", () => {
    const conteudoCampo = campoDeExibicao.innerHTML.trim(); 
    const ultimoCaractere = conteudoCampo.slice(-1);
    if (operadores.includes(ultimoCaractere) && operadores.includes(botao.innerHTML)) {
      campoDeExibicao.innerHTML = conteudoCampo.slice(0, -1) + botao.innerHTML + '  ' ;
    } else {
      campoDeExibicao.innerHTML += '  ' + botao.innerHTML + '  ';
    }
  });
});

botoesNumeradosEVirgula.forEach((botao) => {
  botao.addEventListener("click", () => {
    campoDeExibicao.innerHTML += botao.innerHTML;
  });
});

//apagar digito --------------------------------------------------------
const botaoApagarDigito = document.getElementById('apagar');
botaoApagarDigito.addEventListener("click", () => {
  if (campoDeExibicao.innerHTML.length > 0) {
    campoDeExibicao.innerHTML = campoDeExibicao.innerHTML.slice(0, -1);
  }
});

//limpar campo ----------------------------------------------------------
const botaoLimpar = document.getElementById('limpar');
botaoLimpar.addEventListener("click", () => {campoDeExibicao.innerHTML = ""});

//limpar console --------------------------------------------------------
const apagarConsole = document.getElementById('apagarConsole');
apagarConsole.addEventListener("click", () => {
  console.clear()
  listaDasOperacoes.innerHTML = ''
});

//fazer o calculo e exibir resultado da conta e exibir no historico ----------------------------------------------
const calcular = new Calculadora();


botaoIgual.addEventListener("click", () => {
  const operacao = campoDeExibicao.innerHTML.split('').find(operar => operadores.includes(operar));
  const [valorA, valorB] = campoDeExibicao.innerHTML.split(operacao).map(item => item.replace(',', '.'));

calcular.valorA = parseFloat(valorA);
calcular.operacao = operacao;
calcular.valorB = parseFloat(valorB);

  if(isNaN(calcular.conta())){
    console.log('erro ao fazer a operação (operação não suportada).');
    campoDeExibicao.innerHTML = `erro ao fazer a operação.`
    setTimeout(() => {campoDeExibicao.innerHTML = ''}, 1200);
    return
  }else { console.log("Operação da conta:", valorA, operacao, valorB, "=", calcular.conta()); 
  const elementoLista = document.createElement('li')
  listaDasOperacoes.innerHTML += elementoLista.innerHTML
  elementoLista.innerHTML = `${valorA}  ${operacao}  ${valorB} = ${calcular.conta()}`
  listaDasOperacoes.appendChild(elementoLista)}

  campoDeExibicao.innerHTML = calcular.conta().toString().replace('.', ',');
});

// funções para exibir as teclas no display quando digito no teclado --------------------------------------------------
function teclaParaOBotaoDeIgual (evento) {
  evento.preventDefault()
  if(evento.key === "Enter") {
    botaoIgual.click()
  }
}
document.addEventListener("keydown", teclaParaOBotaoDeIgual);

function adicionarNumeroNoDisplayQuandoClicoEmUmaTeclaDoTeclado(evento) {
  const teclas = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', ',']

  if(teclas.includes(evento.key)) {
    campoDeExibicao.innerHTML += evento.key
  }
}
document.addEventListener("keydown", adicionarNumeroNoDisplayQuandoClicoEmUmaTeclaDoTeclado);

function adicionarOperadorNoDisplayQuandoClicoEmUmaTeclaDoTeclado(evento) {
  if (operadores.includes(evento.key)) {
    const conteudoCampo = campoDeExibicao.innerHTML.trim();
    const ultimoCaractere = conteudoCampo.slice(-1);
    if (operadores.includes(ultimoCaractere)) {
      campoDeExibicao.innerHTML = conteudoCampo.slice(0, -1) + evento.key + '  ';
    } else {
      campoDeExibicao.innerHTML += '  ' + evento.key + '  ';
    }
  }
}
document.addEventListener("keydown", adicionarOperadorNoDisplayQuandoClicoEmUmaTeclaDoTeclado);

function apagarDigitoQuandoClicoEmBackspace (evento) {
  evento.preventDefault()
  if(evento.key === "Backspace") {
    botaoApagarDigito.click()
  }
}
document.addEventListener("keydown", apagarDigitoQuandoClicoEmBackspace);

function limparCampoQuandoClicoNoBotaoC (evento) {
  evento.preventDefault()
  if(evento.key === "c" || evento.key === "C") {
    botaoLimpar.click()
  }
}
document.addEventListener("keydown", limparCampoQuandoClicoNoBotaoC);

function limparConsoleQuandoClicoNoBotao (evento) {
  evento.preventDefault()
  if(evento.key === "Delete") {
    apagarConsole.click()
  }
}
document.addEventListener("keydown", limparConsoleQuandoClicoNoBotao);