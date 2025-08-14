async function fetchRanking() {
    try {
        // Busca os dados do arquivo records.json
        const response = await fetch('http://localhost:3001/registros');
        const data = await response.json();
        const records = Array.isArray(data) ? data : [];
        
        // Ordena os registros por pontuação (decrescente)
        records.sort((a, b) => b.pontuacao - a.pontuacao);
        
        const tbody = document.getElementById('ranking-body');
        
        if (records.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="7" class="no-records">Nenhum registro encontrado</td>
                </tr>
            `;
            return;
        }

        tbody.innerHTML = records.map((record, index) => {
            const position = index + 1;
            const positionClass = position <= 3 ? `position-${position}` : '';
            const date = new Date(record.data).toLocaleString('pt-BR');
            
            return `
                <tr class="${positionClass}">
                    <td>${position}º</td>
                    <td>${record.nome}</td>
                    <td>${record.pontuacao}</td>
                    <td>${record.acertos}</td>
                    <td>${record.erros}</td>
                    <td>${record.semResposta}</td>
                    <td>${date}</td>
                </tr>
            `;
        }).join('');
        
    } catch (error) {
        console.error('Erro ao carregar o ranking:', error);
        document.getElementById('ranking-body').innerHTML = `
            <tr>
                <td colspan="7" class="no-records">Erro ao carregar os registros</td>
            </tr>
        `;
    }
}

// Carrega o ranking quando a página é aberta
document.addEventListener('DOMContentLoaded', fetchRanking);
