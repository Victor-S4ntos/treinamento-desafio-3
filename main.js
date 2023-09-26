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

  //metodos para armazenar e atualizar os valores ------------------------------------------------
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
      default: throw new Error ('FAÇA UMA OPERAÇÃO');
    }
  }
}

const campoDeExibicao = document.querySelector('.display');//campo do display da calculadora -----------------------
const botoesOperadores = document.querySelectorAll('.operator');//botões de operação como: +, -, x e / --------------------------
const botoesNumeradosEVirgula = document.querySelectorAll('.operator_');//botões de numeros do 0 ao 9 e a virgula(,) ---------------------------
const botaoIgual = document.getElementById('igual');//botão para exibir o resultado de toda a operação, o igual(=) ------------------------------------

//exbir no campo ------------------------------------------------------
botoesOperadores.forEach((botao) => {
  botao.addEventListener("click", () => {
    if (campoDeExibicao.innerHTML.slice(-1) === " " && botao.innerHTML !== " " && botao.innerHTML !== operacoes) {
      return;
    }
    campoDeExibicao.innerHTML += '  ' + botao.innerHTML + '  ';
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

//fazer o calculo e exibir resultado da conta ----------------------------------------------
const resultado = new Calculadora();

botaoIgual.addEventListener("click", () => {
  const operadores = ['+', '-', 'x', '/'];
  const operacao = campoDeExibicao.innerHTML.split('').find(operar => operadores.includes(operar));
  const [valorA, valorB] = campoDeExibicao.innerHTML.split(operacao).map(item => item.replace(',', '.'));
  resultado.valorA = parseFloat(valorA);
  resultado.operacao = operacao;
  resultado.valorB = parseFloat(valorB);
  if(isNaN(resultado.conta())){
    console.log('erro ao fazer a operação (operação não suportada).');
    campoDeExibicao.innerHTML = `erro ao fazer a operação.`
    setTimeout(()=> {campoDeExibicao.innerHTML = ''}, 1200);
    return
  }else { console.log("Operação da conta:", valorA, operacao, valorB, "=", resultado.conta()); }
  campoDeExibicao.innerHTML = resultado.conta().toString().replace('.', ',');
});