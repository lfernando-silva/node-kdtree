var No = require('./No.js');

var KDTree = {
    
    raiz: null,
    n: 0,
    encontrado: null,
    insere: function (raiz, url, point, profundidade) {
        if (!raiz) return new No(url, point);
        
        var dimensao = profundidade % 2; //Sempre duas dimensões
        
        if (point[dimensao] < raiz.point[dimensao]) {
            raiz.left = KDTree.insere(raiz.left, url, point, profundidade + 1);
        } else {
            raiz.right = KDTree.insere(raiz.right, url, point, profundidade + 1);
        }
        return raiz;
    },
    
    busca: function (raiz, point, profundidade) {
        
        if (!raiz) return null;
        if ((raiz.point[0] == point[0]) && (raiz.point[1] == point[1])) {
            KDTree.encontrado = 'URL: ' + raiz.url;
            return raiz;
        }
        var dimensao = profundidade % 2; //Sempre duas dimensões
        if (point[dimensao] < raiz.point[dimensao]) {
            return KDTree.busca(raiz.left, point, profundidade + 1);
        }
        return KDTree.busca(raiz.right, point, profundidade + 1);
    }

};

module.exports = KDTree;