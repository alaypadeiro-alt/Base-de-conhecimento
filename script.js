let cardContainer = document.querySelector("#cardContainer");
let campoBusca = document.querySelector("#campoBusca"); 
let dados = [];

async function carregarDadosIniciais() {
  try {
    let resposta = await fetch("data.json");
    dados = await resposta.json();
    filtrarErenderizar();
  } catch (error) {
    console.error("Erro ao carregar dados.json:", error);
    cardContainer.innerHTML = '<p class="aviso">Erro ao carregar a base de dados. Verifique o console.</p>';
  }
}

function iniciarBusca() {
    filtrarErenderizar();
}


function filtrarErenderizar() {
  const termoBusca = campoBusca.value.toLowerCase().trim();
  
  const dadosFiltrados = dados.filter(dado => {
    const nomeMatch = dado.nome.toLowerCase().includes(termoBusca);
    const tagsMatch = dado.tags.some(tag => tag.toLowerCase().includes(termoBusca));
    
    return nomeMatch || tagsMatch;
  });
  
  renderizarCards(dadosFiltrados);
}


function renderizarCards(dadosParaRenderizar) {
  cardContainer.innerHTML = ''; 
  
  if (dadosParaRenderizar.length === 0) {
    cardContainer.innerHTML = '<p class="aviso">Nenhum projeto encontrado para o termo de busca.</p>';
    return;
  }
  
  for (let dado of dadosParaRenderizar) {
    let article = document.createElement("article"); 
    article.classList.add("card");
    
    article.innerHTML = `
    <h2>${dado.nome}</h2>
    <p>${dado.descricao}</p>
    <p>Tags: ${dado.tags.join(', ')}</p>
    <a href="${dado.link}" target="_blank">Saiba Mais</a>
    `
    cardContainer.appendChild(article);
  }
}

window.onload = carregarDadosIniciais;
