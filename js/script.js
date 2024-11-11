function baixarApk() {
    const apkUrl = 'link_para_o_apk_seu'; // Substitua com o link real do APK
    window.location.href = apkUrl;
}

function gerarResumo() {
    var checkboxes = document.querySelectorAll('tbody input[type="checkbox"]');
    var summaryItems = '';
    checkboxes.forEach(function(checkbox) {
        if (checkbox.checked) {
            var row = checkbox.closest('tr');
            var produto = row.cells[1].textContent;
            var pedido = row.cells[2].querySelector('input').value;
            var estoque = row.cells[3].querySelector('input').value;
            summaryItems += produto + ' - Pedido: ' + pedido + ', Em Estoque: ' + estoque + '<br>';
        }
    });

    var observacao = document.getElementById('observacao').value;

    document.getElementById('summaryItems').innerHTML = summaryItems;
    document.getElementById('summaryObservation').textContent = observacao;

    document.getElementById('summaryModal').style.display = 'block';
}

function closeSummary() {
    document.getElementById('summaryModal').style.display = 'none';
}

function enviarPedido() {
    var checkboxes = document.querySelectorAll('tbody input[type="checkbox"]');
    var summaryItems = '';
    checkboxes.forEach(function(checkbox) {
        if (checkbox.checked) {
            var row = checkbox.closest('tr');
            var produto = row.cells[1].textContent;
            var pedido = row.cells[2].querySelector('input').value;
            summaryItems += produto + ' - Pedido: ' + pedido + '\n'; // Excluir a quantidade em estoque
        }
    });

    var observacao = document.getElementById('observacao').value;
    var texto = summaryItems + '\nObservação: ' + observacao;

    var numeroWhatsApp = "5522997407901"; // numero do telefone para envio do pedido
    var link = "https://api.whatsapp.com/send?phone=" + numeroWhatsApp + "&text=" + encodeURIComponent(texto);
    window.open(link, '_blank');
}

function gerarPDF() {
    var { jsPDF } = window.jspdf;
    var doc = new jsPDF();

    var titulo = "Resumo do Pedido";
    var checkboxes = document.querySelectorAll('tbody input[type="checkbox"]');
    var summaryItems = '';
    checkboxes.forEach(function(checkbox) {
        if (checkbox.checked) {
            var row = checkbox.closest('tr');
            var produto = row.cells[1].textContent;
            var pedido = row.cells[2].querySelector('input').value;
            summaryItems += produto + ' - Pedido: ' + pedido + '\n'; // Excluir a quantidade em estoque
        }
    });

    var observacao = document.getElementById("summaryObservation").textContent;

    // Adicionando conteúdo ao PDF
    doc.setFontSize(18);
    doc.text(titulo, 10, 10);

    doc.setFontSize(12);
    doc.text("Itens selecionados:", 10, 20);
    doc.text(summaryItems, 10, 30);

    doc.text("Observação:", 10, 60);
    doc.text(observacao, 10, 70);

    // Gerar a data atual
    var dataAtual = new Date();
    var dia = String(dataAtual.getDate()).padStart(2, '0');
    var mes = String(dataAtual.getMonth() + 1).padStart(2, '0'); // Janeiro é 0!
    var ano = dataAtual.getFullYear();
    var dataFormatada = dia + '-' + mes + '-' + ano;

    // Nome do arquivo com a data incluída
    var nomeArquivo = "resumo_pedido_" + dataFormatada + ".pdf";

    // Baixar o PDF
    doc.save(nomeArquivo);
}