//Inicialização do Terminal
var readline = require('readline');

//Objeto que interage com a QuadTree/KD-Tree
var Interface = require('./interface/Interface.js');

//Inicalização do Terminal e da Interface
var rl = readline.createInterface(process.stdin, process.stdout);
Interface.setInicio();
rl.setPrompt(Interface.mensagemTerminal);
rl.prompt();

//Insere os nós vindos dos arquivos .ttl "en" e "de" com as devidas validações
Interface.initDataSources(); 

//Terminal reativo a eventos. 'line' recebe o que é digitado no terminal até o pressionamento do enter
rl.on('line', function (line) {
    if (line === "END" || line === 'end') rl.close();
    process.stdout.write('\u001B[2J\u001B[0;0f'); //Limpar tela
    var point = Interface.pointFormat(line);
    Interface.setEncontrado();
    var raiz = Interface.getReferencia();
    Interface.busca(raiz, [point.x, point.y], 0);
    checkWasFound(Interface.getEncontrado());
    rl.prompt();
});

rl.on('close', function () {
    process.exit(0);
});

//Verifica resultado da busca
function checkWasFound(encontrado){
    if (encontrado === null) {
        console.log("Não encontrado");
    } else {
        console.log(encontrado);
    }
}