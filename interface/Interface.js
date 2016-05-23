var os = require('os'); //Biblioteca para informações do sistema operacional
var Medidor = require('./Medidor.js');
var KDTree = require('../kdtree/KDTree.js');
var DataParse = require('../dataparser/DataParse.js');

var instrucao = '\n*****\nDigite os pontos no formato: X,Y / X[ESPAÇO]Y ou digite END para encerrar.\n';
var observacao = 'Se o ponto existir, sua URL será impressa na tela, caso contrário, que não foi encontrado.\n';
var marcacao = ' (X,Y) = ';

//Mensagem exibida no terminal
var mensagemTerminal = instrucao + observacao + marcacao;

var Interface = {
    
    getReferencia: getReferencia,
    mensagemTerminal: mensagemTerminal,
    getEncontrado: getEncontrado,
    setEncontrado: setEncontrado,
    setInicio: setInicio,
    
    //Tratamento do valor digitado
    pointFormat: function (pointString) {
        var virgula = pointString.indexOf(',');
        var espaco = pointString.indexOf(' ');
        var divisor = checkDivisor(virgula, espaco);
        var length = pointString.length;
        var strX = pointString.slice(0, divisor);
        var strY = pointString.slice(divisor, length).replace(',', '');
        var x = parseFloat(strX);
        var y = parseFloat(strY);
        
        if (checkInputValues(divisor, x, y)) {
            
            return { x: x, y: y }
        } else {
            console.log('Digite um número no formato especificado!\n****************\n');
            return false;
        }
    },
    
    //Busca na KD-TREE
    busca: function (raiz, point, profundidade) {
        KDTree.busca(raiz, point, profundidade);
    },
    
    //Leitura assíncrona dos dois arquivos
    initDataSources: function (){
        DataParse.readTTL('geo_coordinates_mappingbased_en.ttl');
        DataParse.readTTL('geo_coordinates_mappingbased_de.ttl');
        return true;
    }
};

//Verifica se o usuário separou os pontos por , ou [espaço]
function checkDivisor(virgula, espaco) {
    if (espaco == -1) {
        return virgula;
    }
    return espaco;
}

//Verifica se a entrada é válida
function checkInputValues(virgula, x, y) {
    return ((virgula != -1) && (!isNaN(x)) && !isNaN(y));
}

//Obtém a referência para a raiz da árvore
function getReferencia() {
    return KDTree.raiz;
}

//Obtém o resultado da última busca
function getEncontrado() {
    Medidor.logBuscaInfo();
    return KDTree.encontrado;
}

//Reseta o resultado da busca
function setEncontrado() {
    KDTree.encontrado = null;
    Medidor.inicioBuscaEm = new Date().getTime();
}

//Marca o timestamp de início e a memória inicial em mb
function setInicio() {
    Medidor.inicioEm = new Date().getTime();
    Medidor.memoriaEmUsoInicial = (os.totalmem() - os.freemem()) / 1048576;
}

module.exports = Interface;