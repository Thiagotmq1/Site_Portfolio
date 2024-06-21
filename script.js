const GITHUB_API_URL = 'https://api.github.com/users/Thiagotmq1';
const JSON_SERVER_URL = 'http://localhost:3000';

// Função para buscar dados do GitHub
async function fetchGitHubData() {
  const response = await fetch(GITHUB_API_URL);
  const data = await response.json();
  return data;
}

// Função para buscar repositórios do GitHub
async function fetchGitHubRepos() {
  const response = await fetch(`${GITHUB_API_URL}/repos`);
  const data = await response.json();
  return data;
}

// Função para buscar dados do JSON Server
async function fetchJsonServerData(endpoint) {
  const response = await fetch(`${JSON_SERVER_URL}/${endpoint}`);
  const data = await response.json();
  return data;
}

// Exemplo de uso das funções
fetchGitHubData().then(data => {
  console.log('GitHub Data:', data);
});

fetchGitHubRepos().then(data => {
  console.log('GitHub Repos:', data);
});

fetchJsonServerData('albuns').then(data => {
  console.log('Albuns:', data);
});

fetchJsonServerData('colegas').then(data => {
  console.log('Colegas:', data);
});

document.addEventListener("DOMContentLoaded", function() {
    // Função para renderizar perfil do GitHub
    async function renderProfile() {
      const profile = await fetchGitHubData();
      document.getElementById('avatar').src = profile.avatar_url;
      document.getElementById('nome').innerText = profile.name;
      document.getElementById('bio').innerText = profile.bio;
      document.getElementById('local').innerText = profile.location;
      document.getElementById('blog').innerText = profile.blog;
      document.getElementById('blog').href = profile.blog;
    }
  
    // Função para renderizar repositórios do GitHub
    async function renderRepos() {
      const repos = await fetchGitHubRepos();
      const reposContainer = document.getElementById('repositorios');
      repos.forEach(repo => {
        const repoCard = document.createElement('div');
        repoCard.className = 'col-sm-12 col-md-6 col-lg-4 col-xl-3 mb-3 mb-sm-0 py-4';
        repoCard.innerHTML = `
          <div class="card h-100" onclick="window.location='repo.html?id=${repo.id}';" style="cursor:pointer;">
            <div class="card-body d-flex flex-column justify-content-between">
              <div>
                <h5 class="card-title">${repo.name}</h5>
                <p class="card-text">${repo.description}</p>
              </div>
              <div class="d-flex justify-content-between mt-3">
                <div class="d-flex align-items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-star m-3 pb-1" viewBox="0 0 16 16">
                    <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z"></path>
                  </svg>
                  <h1 class="pt-2">${repo.stargazers_count}</h1>
                </div>
                <div class="d-flex align-items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-person m-3 pb-1" viewBox="0 0 16 16">
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"></path>
                  </svg>
                  <h1 class="pt-2">${repo.watchers_count}</h1>
                </div>
              </div>
            </div>
          </div>
        `;
        reposContainer.appendChild(repoCard);
      });
    }
  
    // Função para renderizar conteúdo sugerido do JSON Server
    async function renderSuggestedContent() {
      const content = await fetchJsonServerData('destaques');
      const carouselInner = document.querySelector('#conteudo-sugerido .carousel-inner');
      content.forEach((item, index) => {
        const carouselItem = document.createElement('div');
        carouselItem.className = `carousel-item${index === 0 ? ' active' : ''}`;
        carouselItem.innerHTML = `
          <img src="${item.urlImagem}" class="d-block w-100" alt="${item.titulo}">
          <div class="carousel-caption d-none d-md-block">
            <h5>${item.titulo}</h5>
            <p>${item.descricao}</p>
            <a href="${item.urlConteudo}" target="_blank" class="btn btn-primary">Saiba mais</a>
          </div>
        `;
        carouselInner.appendChild(carouselItem);
      });
    }
  
    // Função para renderizar colegas de trabalho do JSON Server
    async function renderColleagues() {
      const colleagues = await fetchJsonServerData('colegas');
      const colleaguesContainer = document.getElementById('colegas');
      colleagues.forEach(colleague => {
        const colleagueCard = document.createElement('div');
        colleagueCard.className = 'card col-2 d-flex align-items-center justify-content-center';
        colleagueCard.innerHTML = `
          <div class="card-img text-center">
            <a href="${colleague.urlPerfil}" target="_blank">
              <img src="${colleague.urlFoto}" class="card-img-top" alt="${colleague.nome}">
              <p class="card-text">${colleague.nome}</p>
            </a>
          </div>
        `;
        colleaguesContainer.appendChild(colleagueCard);
      });
    }
  
    renderProfile();
    renderRepos();
    renderSuggestedContent();
    renderColleagues();
  });
  
  