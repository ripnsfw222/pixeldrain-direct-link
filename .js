// ==UserScript==
// @name         PixelDrain Download Link Converter
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Converte links do PixelDrain para links diretos de download
// @author       Você
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Função para procurar links do PixelDrain e convertê-los para links de download direto
    function convertPixelDrainLinks() {
        // Seleciona todos os links que contêm "pixeldrain.com/u/"
        let pixelDrainLinks = document.querySelectorAll('a[href*="pixeldrain.com/u/"]');

        // Verifica se há links do PixelDrain na página
        if (pixelDrainLinks.length === 0) {
            console.log('Nenhum link do PixelDrain encontrado.');
            return;
        }

        // Para cada link encontrado, converte para o link de download direto
        pixelDrainLinks.forEach(link => {
            // Obtém o ID do arquivo a partir do link do PixelDrain
            let fileId = link.href.split('/u/')[1];

            if (fileId) {
                // Cria o link de download direto
                let downloadLink = `https://pixeldrain.com/api/file/${fileId}`;

                // Cria um novo elemento <a> para exibir o link de download direto
                let downloadElement = document.createElement('a');
                downloadElement.href = downloadLink;
                downloadElement.innerText = `Download Direto: ${fileId}`;
                downloadElement.style.display = "block";
                downloadElement.style.marginTop = "10px";
                downloadElement.style.fontSize = "14px";
                downloadElement.style.color = "green";

                // Insere o link de download direto logo após o link original
                link.parentNode.insertBefore(downloadElement, link.nextSibling);
            }
        });
    }

    // Garante que a função é executada após o carregamento completo da página
    window.addEventListener('load', function() {
        convertPixelDrainLinks();
    });

})();
