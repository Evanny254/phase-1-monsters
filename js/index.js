document.addEventListener('DOMContentLoaded', () => {
    const monsterContainer = document.getElementById('monster-container');
    const createMonsterDiv = document.getElementById('create-monster');
    const backButton = document.getElementById('back');
    const forwardButton = document.getElementById('forward');
  
    const baseUrl = 'http://localhost:3000/monsters';
    let page = 1;
    const monstersPerPage = 50;
  
    function loadMonsters() {
      const limit = monstersPerPage;
      const offset = (page - 1) * monstersPerPage;
      const url = `${baseUrl}?_limit=${limit}&_page=${page}`;
  
      fetch(url)
        .then(response => response.json())
        .then(monsters => displayMonsters(monsters));
    }
  
    function displayMonsters(monsters) {
        monsterContainer.innerHTML = '';
        monsters.forEach(monster => {
          const monsterDiv = document.createElement('div');
          monsterDiv.innerHTML = `
            <h2>Name: ${monster.name}</h2>
            <p>Age: ${monster.age}</p>
            <p>Description: ${monster.description}</p>
          `;
          monsterContainer.appendChild(monsterDiv);
        });
      }
  
    function createMonster(name, age, description) {
      const monster = {
        name: name,
        age: age,
        description: description
      };
  
      fetch(baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(monster)
      })
      .then(response => response.json())
      .then(() => {
        loadMonsters();
      });
    }
  
    createMonsterDiv.innerHTML = `
      <h3>Create a monster:</h3>
      <input type="text" id="name" placeholder="Name">
      <input type="number" id="age" placeholder="Age">
      <input type="text" id="description" placeholder="Description">
      <button id="create-monster-btn">Create Monster</button>
    `;
  
    const createMonsterButton = document.getElementById('create-monster-btn');
    createMonsterButton.addEventListener('click', () => {
      const name = document.getElementById('name').value;
      const age = document.getElementById('age').value;
      const description = document.getElementById('description').value;
      createMonster(name, age, description);
    });
  
    forwardButton.addEventListener('click', () => {
      page++;
      loadMonsters();
    });
  
    backButton.addEventListener('click', () => {
      if (page > 1) {
        page--;
        loadMonsters();
      }
    });
  
    loadMonsters();
  });
  