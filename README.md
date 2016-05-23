# Node-KDTree
- Aluno: Luiz Fernando da Silva
- Programa de Pós Graduação em Ciência da Computação - Universidade Federal de Juiz de Fora
- Turma: 2016/1
- Data: 23/05/2016
- Repositório: https://github.com/lfernando-silva/node-kdtree
-------------------------
Implementação de KDTree com NodeJS

- Observações

- Como o NodeJS se comporta de maneira não-bloqueante, as operações de inserção dos pontos e leitura do arquivo
ocorrem de forma "quase-paralela", o que implica que o sistema não fica travado enquanto os nós são inseridos.

- Com isso, a plataforma garante um maior gerenciamento dos recursos computacionais.

- Entretanto, no pequeno intervalo em que isso acontece, um nó pesquisado pode não ser encontrado, já que ainda
não foi inserido. Recomenda-se aguardar alguns segundos até que seja finalizado o processo de inserção (em torno
de 15 segundos).

- Os arquivos .ttl devem ser colocados na pasta .[pastadoprojeto]/dataparser/datasets/.

- Executar o projeto: $ node server.js na pasta onde está o script "server.js"

-------------------------
Entidades

- KDTree.js -> Objeto (singleton) manipulador das operações da kd-tree
- No.js -> Objeto que representa a estrutura nó da árvore
- DataParser.js -> Objeto (singleton) que faz a validação e a conversão dos dados de entrada
- Interface.js -> Objeto (singleton) que realiza operações de terminal e encapsula as mensagens entre o server.js e
a KDTree ou o DataParser
- package.json -> Descritor, arquivo de metadados e que mapeia dependências. No projeto, não tem importância.
- server.js -> Script de inicialização do sistema.
- Medidor.js -> Objeto (singleton) responsável pelas medições de tempo e memória das operações.