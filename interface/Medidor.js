var os = require('os'); //Biblioteca para informações do sistema operacional
var totalReg = 1037247; //Limite de registros esperados

var Medidor = {
    
    inicioEm: null, //Timestamp setado ao começar a inserção
    inicioBuscaEm: null, //Timestamp setado ao começar uma busca
    memoriaEmUsoInicial: 0, //Registra a memória antes da inserção
    registros: totalReg,
    
    //Imprime informações de memória, tempo e quantidade de registros após a inserção
    logInsercaoInfo: function (n) {
        if (n == totalReg) {
            console.log("\n --------------- ");
            console.log("** %s registros inseridos", totalReg);
            console.log("**A inserção levou %s segundos", (new Date().getTime() - Medidor.inicioEm) * 0.001);
            console.log("** A memória consumida foi de %s megabytes", ((os.totalmem() - os.freemem()) / 1048576) - Medidor.memoriaEmUsoInicial);
            console.log(" --------------- ");
        }
    },
    
    //Imprime tempo de busca
    logBuscaInfo: function () {
        var timestamp = new Date().getTime();
        console.log("\n** A busca levou %s milisegundos", (timestamp - Medidor.inicioBuscaEm));
    }
};
module.exports = Medidor;