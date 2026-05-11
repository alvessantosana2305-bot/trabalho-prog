const textElement = document.getElementById('text');
const optionButtonsElement = document.getElementById('option-buttons');

// Estado do jogador (ex: tem a chave?)
let state = {};

function startGame() {
    state = {};
    showTextNode(1);
}

function showTextNode(textNodeIndex) {
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex);
    textElement.innerText = textNode.text;
    
    // Remove botões antigos
    while (optionButtonsElement.firstChild) {
        optionButtonsElement.removeChild(optionButtonsElement.firstChild);
    }

    // Cria novos botões
    textNode.options.forEach(option => {
        if (showOption(option)) {
            const button = document.createElement('button');
            button.innerText = option.text;
            button.classList.add('btn');
            button.addEventListener('click', () => selectOption(option));
            optionButtonsElement.appendChild(button);
        }
    });
}

function showOption(option) {
    return option.requiredState == null || option.requiredState(state);
}

function selectOption(option) {
    const nextTextNodeId = option.nextText;
    if (nextTextNodeId <= 0) {
        return startGame();
    }
    state = Object.assign(state, option.setState);
    showTextNode(nextTextNodeId);
}

// A História
const textNodes = [
    {
        id: 1,
        text: 'Você acorda em uma floresta escura. Há um caminho à esquerda e um à direita.',
        options: [
            {
                text: 'Ir pela Esquerda',
                setState: { chameEsquerda: true },
                nextText: 2
            },
            {
                text: 'Ir pela Direita',
                nextText: 3
            }
        ]
    },
    {
        id: 2,
        text: 'Você encontra um rio perigoso. Tenta atravessar, mas a correnteza é forte.',
        options: [
            {
                text: 'Tentar de novo',
                nextText: 1
            }
        ]
    },
    {
        id: 3,
        text: 'Você encontra uma cabana abandonada e uma chave brilhante no chão.',
        options: [
            {
                text: 'Pegar a chave',
                setState: { chave: true },
                nextText: 4
            },
            {
                text: 'Ignorar e seguir em frente',
                nextText: 4
            }
        ]
    },
    {
        id: 4,
        text: 'Você chega a um grande portão trancado.',
        options: [
            {
                text: 'Abrir com a chave',
                requiredState: (currentState) => currentState.chave,
                nextText: 5
            },
            {
                text: 'Tentar forçar o portão',
                nextText: 6
            }
        ]
    },
    {
        id: 5,
        text: 'O portão abre! Você venceu e escapou da floresta!',
        options: [
            {
                text: 'Jogar Novamente',
                nextText: -1
            }
        ]
    },
    {
        id: 6,
        text: 'O portão não abre. Você ficou preso na floresta para sempre.',
        options: [
            {
                text: 'Tentar de novo',
                nextText: -1
            }
        ]
    }
];

startGame();
