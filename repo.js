document.addEventListener("DOMContentLoaded", async function() {
    const urlParams = new URLSearchParams(window.location.search);
    const repoId = urlParams.get('id');
  
    if (!repoId) {
      alert('Repositório não especificado');
      return;
    }
  
    const GITHUB_API_REPO_URL = `https://api.github.com/repositories/${repoId}`;
  
    const fetchRepoData = async () => {
      const response = await fetch(GITHUB_API_REPO_URL);
      const data = await response.json();
      return data;
    }
  
    const repo = await fetchRepoData();
    
    document.getElementById('descricao').innerText = repo.description;
    document.getElementById('dataCriacao').innerText = new Date(repo.created_at).toLocaleDateString();
    document.getElementById('stars').innerHTML = `${repo.stargazers_count} <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-star" viewBox="0 0 16 16">
      <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z"></path>
    </svg>`;
    document.getElementById('watchers').innerHTML = `${repo.watchers_count} <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
      <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"></path>
    </svg>`;
    document.getElementById('linguagem').innerText = repo.language;
    document.getElementById('linkAcesso').innerText = repo.html_url;
    document.getElementById('linkAcesso').href = repo.html_url;
  
    const topicosContainer = document.getElementById('topicos');
    repo.topics.forEach(topic => {
      const topicButton = document.createElement('button');
      topicButton.className = 'btn btn-primary';
      topicButton.innerText = topic;
      topicosContainer.appendChild(topicButton);
    });
  });
  