# EcoCarona & RotaVerde

## Sobre o projeto

O EcoCarona & RotaVerde é uma aplicação web criada com o objetivo de incentivar práticas de mobilidade sustentável no ambiente escolar. A proposta é mostrar que pequenas escolhas do dia a dia, como caminhar, utilizar bicicleta ou compartilhar caronas, podem contribuir para a redução da emissão de gases poluentes.

O sistema permite que os estudantes registrem seus deslocamentos diários, acompanhem a quantidade estimada de CO₂ evitada e acumulem pontos que contribuem para o desempenho de sua turma em um ranking escolar.

Além de promover a conscientização ambiental, o projeto utiliza elementos de gamificação para tornar a participação mais motivadora e envolvente.

---

## Objetivo

Desenvolver uma solução simples e acessível que incentive hábitos de transporte mais sustentáveis, contribuindo para a redução das emissões de carbono e fortalecendo ações alinhadas ao Objetivo de Desenvolvimento Sustentável 13 (ODS 13), que trata do combate às mudanças climáticas.

---

## Funcionalidades

### Login

O usuário realiza o acesso por meio de um formulário simples. O estado da sessão permanece salvo localmente no navegador.

### Dashboard

Após o login, o sistema exibe:

* Total de CO₂ evitado.
* Quantidade de EcoPontos acumulados.
* Área para registro de novos trajetos.

### Registro de trajetos

O usuário pode escolher uma das modalidades disponíveis:

* A pé
* Bicicleta
* Carona

Em seguida, informa a distância percorrida em quilômetros para que o sistema realize os cálculos automaticamente.

### Sistema de pontuação

A pontuação é calculada de acordo com a modalidade escolhida:

| Modalidade | Pontos por km |
| ---------- | ------------- |
| A pé       | 120           |
| Bicicleta  | 100           |
| Carona     | 60            |

### Cálculo de CO₂ evitado

O sistema também estima a redução de emissões de carbono com base na distância percorrida:

| Modalidade | CO₂ evitado por km |
| ---------- | ------------------ |
| A pé       | 0,9 kg             |
| Bicicleta  | 0,5 kg             |
| Carona     | 0,3 kg             |

### Ranking

Os pontos acumulados pelos usuários são somados à pontuação da turma, permitindo acompanhar o desempenho coletivo dentro do desafio proposto.

### Armazenamento local

Todos os dados são armazenados utilizando LocalStorage, sem necessidade de banco de dados ou servidor.

---

## Tecnologias utilizadas

* HTML5
* CSS3
* JavaScript
* Tailwind CSS
* Lucide Icons
* LocalStorage

---

## Estrutura do projeto

```text
EcoCarona-RotaVerde/
│
├── index.html
├── style.css
├── script.js
└── README.md
```

---

## Como funciona

1. O usuário realiza o login.
2. O dashboard é carregado.
3. Uma modalidade de transporte é selecionada.
4. A distância percorrida é informada.
5. O sistema valida os dados inseridos.
6. Os pontos são calculados.
7. O CO₂ evitado é calculado.
8. As informações são atualizadas na interface.
9. Os dados são salvos localmente.
10. O usuário pode registrar novos trajetos.

---

## Considerações finais

O EcoCarona & RotaVerde foi desenvolvido como uma proposta educacional para demonstrar como a tecnologia pode ser utilizada para incentivar atitudes sustentáveis. Por meio de uma interface simples e de fácil utilização, o projeto busca aproximar os estudantes das discussões sobre mobilidade urbana e mudanças climáticas, mostrando de forma prática o impacto positivo que pequenas ações podem gerar para o meio ambiente.
