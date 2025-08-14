# Quiz Origem Amorim

Este projeto é um quiz interativo que registra pontuações e exibe um ranking dos participantes.  
Para o funcionamento correto, é necessário configurar o **json-server** para servir os dados das perguntas e registrar os resultados.

---

## 📦 Instalação do json-server

Instale globalmente o **json-server** usando o **npm**:

```bash
npm install -g json-server
```

---

## 🚀 Executando o servidor

Será necessário rodar **duas instâncias** do json-server:

1. **Banco de perguntas** (porta 3000):
```bash
json-server --watch db.json --port 3000
```

2. **Registro dos jogos finalizados** (porta 3001):
```bash
json-server --watch records.json --port 3001
```

---

## 📂 Estrutura esperada dos arquivos JSON

### db.json
```json
[
  {
    "pergunta": "Exemplo de pergunta",
    "opcoes": ["Opção 1", "Opção 2", "Opção 3", "Opção 4"],
    "correta": 1
  }
]
```

### records.json
```json
[
  {
    "nome": "Jogador 1",
    "pontuacao": 80,
    "acertos": 8,
    "erros": 2,
    "semResposta": 0,
    "data": "2025-08-14T20:00:00.000Z"
  }
]
```

---

## 🖥 Uso
1. Abra o arquivo `index.html` no navegador.
2. Digite seu nome e clique em **Iniciar**.
3. Responda as perguntas.
4. Ao final, seu resultado será salvo no `records.json` e poderá ser visualizado no ranking.

---

## 📌 Observação
Certifique-se de que o **json-server** esteja rodando nas portas **3000** e **3001** antes de iniciar o quiz, para evitar erros de carregamento.
