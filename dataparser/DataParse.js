//Core de NodeJS
var fs = require('fs');
var readline = require('readline');

//Modulos criados
var Medidor = require('../interface/Medidor.js');
var KDTree = require('../kdtree/KDTree.js');

//Variáveis
var datasourceDirectory = './dataparser/datasets/';
var raiz = null;

var DataParse = {
    readTTL: function (file){
        var read = readline.createInterface({
            input: fs.createReadStream(datasourceDirectory + file),
        });
        read.on('line', function (line) {
            var a = read;
            if (line) parse(line);
        });
    }
};

//Insere os dados relevantes da linha na árvore
function parse(line){
    var line = line.toString();
    if (contains(line, 'point')) {
        var data = split(line);
        var point = [data.x, data.y];
        if (!raiz) {
            raiz = KDTree.insere(null, data.url, point, 0);
            KDTree.raiz = raiz;
            KDTree.n = KDTree.n + 1;
        } else {
            setEncontrado();
            KDTree.busca(raiz, point, 0);
            var encontrado = getEncontrado();
            if (encontrado === null) { //Se ele não encontrou, então insere na KDTree
                KDTree.insere(raiz, data.url, point, 0);
                KDTree.n = KDTree.n + 1;
                Medidor.logInsercaoInfo(KDTree.n);
            } 
        }
    }
}

//Verifica se a linha contém a string "point"
function contains(line,point){
    return line.indexOf(point) != -1; 
}

//Quebra uma linha em: URL, x e y
function split(line){
    line = line.replace(' <http://www.georss.org/georss/point> ','').replace('"','');
    var length = line.length;
    var posURL = [1, line.indexOf('>')];
    var posPoint = [line.indexOf('>')+1, length-2];
   
    var url = line.slice(posURL[0], posURL[1]);
    var point = line.slice(posPoint[0], posPoint[1]);
    point = point.split(' ');
    
    var x = parseFloat(point[0]);
    var y = parseFloat(point[1]);
    
    return {
        url: url,
        x: x,
        y: y
    };
}

//Retorna o último ponto encontrado
function getEncontrado() {
    return KDTree.encontrado;
}

//Inicializa o último ponto encontrado = null, sendo que null é quando o nó não foi encontrado.
function setEncontrado() {
    KDTree.encontrado = null;
}

module.exports = DataParse;