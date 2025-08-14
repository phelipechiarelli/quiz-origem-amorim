*Quiz Origem Amorim

Para o funcionamento correto do quiz, é necessário instalar o json-server com npm

npm install -g json-server

Após a instalação, será necessário levantar duas instancias do json-server:

json-server --watch db.json --port 3000 

para o banco de perguntas e

json-server --watch records.json --port 3001

para o registro dos jogos finalizados
