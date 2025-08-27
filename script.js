let playersDatabase = [
  {id: 1, name: "btgz.haise", minecraftName: "Zhwae", points: 405, specialization: "LT4", region: "AS", role: "Overseer - Pinuno"},
  {id: 2, name: "btgz.negmaa", minecraftName: "Negmaa", points: 330, specialization: "LT4", region: "AS", role: "Tester - High Venerable"},
  {id: 3, name: "btgz.kob", minecraftName: "KobPxR", points: 260, specialization: "HT4", region: "AS", role: "Tester - High Venerable"},
  {id: 4, name: "btgz.cheewyy", minecraftName: "gogogacaca", points: 226, specialization: "LT4", region: "AS", role: "Tester - High Venerable"},
  {id: 10, name: "btgz.elleinad", minecraftName: "drei", points: 226, specialization: "HT4", region: "AS", role: "High Venerable - Tester"},
  {id: 5, name: "btgz.k4ye", minecraftName: "Cushh", points: 226, specialization: "LT3", region: "AS", role: "High Venerable - Tester"},
  {id: 6, name: "btgz.x", minecraftName: "Oximeter", points: 226, specialization: "HT5", region: "AS", role: "Venerable"},
  {id: 7, name: "btgz.akio", minecraftName: "Akiodaiii", points: 226, specialization: "HT5", region: "AS", role: "Venerable"},
  {id: 7, name: "btgz.akino", minecraftName: "Akino", points: 226, specialization: "LT4", region: "AS", role: "Venerable"},
  {id: 8, name: "btgz.klypse", minecraftName: "Klypse", points: 226, specialization: "HT5", region: "AS", role: "Venerable"},
  {id: 9, name: "btgz.zyx", minecraftName: "Zyx", points: 226, specialization: "HT5", region: "AS", role: "Venerable"},
  {id: 10, name: "btgz.yat", minecraftName: "TightMC", points: 226, specialization: "LT3", region: "AS", role: "Venerable"},
  {id: 11, name: "btgz.sen", minecraftName: "Hanz0o", points: 226, specialization: "LT4", region: "AS", role: "High Venerable - Tester"}, 
  {id: 10, name: "btgz.euiz", minecraftName: "drei", points: 226, specialization: "HT4", region: "AS", role: "High Venerable - Tester"}, 
  {id: 12, name: "btgz.uamh", minecraftName: "uamh", points: 226, specialization: "LT4", region: "AS", role: "Venerable"},
  {id: 13, name: "btgz.sora", minecraftName: "sora", points: 226, specialization: "LT3", region: "AS", role: "High Venerable"},
  {id: 14, name: "btgz.drei", minecraftName: "drei", points: 226, specialization: "HT4", region: "AS", role: "High Venerable"},
  {id: 15, name: "btgz.veylor", minecraftName: "veylor", points: 226, specialization: "HT5", region: "AS", role: "Venerable"},
  {id: 16, name: "btgz.chino", minecraftName: "chino", points: 226, specialization: "HT5", region: "AS", role: "Venerable"},
  {id: 17, name: "btgz.avoo", minecraftName: "avoo", points: 226, specialization: "LT4", region: "AS", role: "Venerable"},



];

const addPlayerBtn = document.getElementById('addPlayerBtn');
const addPlayerModal = document.getElementById('addPlayerModal');
const closeModal = document.getElementById('closeModal');
const playerForm = document.getElementById('playerForm');
const playersContainer = document.getElementById('playersContainer');
const searchInput = document.getElementById('searchInput');

addPlayerBtn.addEventListener('click', () => { addPlayerModal.style.display = 'flex'; });
closeModal.addEventListener('click', () => { addPlayerModal.style.display = 'none'; });
window.addEventListener('click', (e) => { if (e.target === addPlayerModal) addPlayerModal.style.display = 'none'; });

playerForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const newPlayer = {
    id: Date.now(),
    name: document.getElementById('playerName').value,
    minecraftName: document.getElementById('minecraftName').value,
    points: parseInt(document.getElementById('playerPoints').value),
    specialization: document.getElementById('playerSpecialization').value,
    region: document.getElementById('playerRegion').value,
    role: document.getElementById('playerRole').value || "Tester"
  };
  playersDatabase.push(newPlayer);
  playersDatabase.sort((a, b) => b.points - a.points);
  renderPlayers();
  playerForm.reset();
  addPlayerModal.style.display = 'none';
});

searchInput.addEventListener('input', (e) => {
  const searchTerm = e.target.value.toLowerCase();
  if (!searchTerm) { renderPlayers(); return; }
  const filtered = playersDatabase.filter(p => 
    p.name.toLowerCase().includes(searchTerm) || 
    p.minecraftName.toLowerCase().includes(searchTerm) || 
    p.role.toLowerCase().includes(searchTerm) ||
    p.specialization.toLowerCase().includes(searchTerm)
  );
  renderFilteredPlayers(filtered);
});

function renderFilteredPlayers(list) {
  playersContainer.innerHTML = '';
  list.forEach((p, i) => playersContainer.appendChild(createPlayerCard(p, i)));
}

function renderPlayers() {
  playersContainer.innerHTML = '';
  playersDatabase.forEach((p, i) => playersContainer.appendChild(createPlayerCard(p, i)));
}

function createPlayerCard(player, index) {
  const rankColors = [
    'from-white to-gray-300',
    'from-gray-400 to-gray-200',
    'from-gray-500 to-gray-300',
    'from-gray-600 to-gray-400'
  ];
  const rankColor = rankColors[Math.min(index, rankColors.length - 1)];
  const card = document.createElement('div');
  card.className = 'player-card glass rounded-xl p-4 transition-all duration-300 hover:bg-gray-800/50 border border-gray-800 hover:border-red-500/30';
  card.dataset.id = player.id;

  const roleDisplay = document.createElement('span');
  roleDisplay.className = 'role-edit font-bold';
  roleDisplay.textContent = player.role;
  roleDisplay.addEventListener('click', () => {
    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'role-input';
    input.value = player.role;
    input.addEventListener('blur', () => {
      const val = input.value.trim();
      if (val) {
        const idx = playersDatabase.findIndex(p => p.id === player.id);
        if (idx !== -1) {
          playersDatabase[idx].role = val;
        }
        roleDisplay.textContent = val;
        roleDisplay.parentNode.replaceChild(roleDisplay, input);
      }
    });
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') input.blur();
    });
    roleDisplay.parentNode.replaceChild(input, roleDisplay);
    input.focus();
  });

  card.innerHTML = `
    <div class="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
      <!-- Rank -->
      <div class="flex items-center md:col-span-1">
        <span class="w-8 h-8 flex items-center justify-center bg-gradient-to-br ${rankColor} rounded-full text-black font-bold">
          ${index + 1}
        </span>
      </div>

      <!-- Player Info -->
      <div class="flex items-center space-x-3 md:col-span-4">
        <img src="https://minotar.net/helm/${player.minecraftName}/100" alt="${player.name}" class="w-12 h-12 rounded-full border-2 border-red-500 shadow-lg" />
        <div>
          <h2 class="font-bold text-lg">${player.name}</h2>
          <div class="flex items-center gap-2 mt-1">
            <span class="text-xs bg-black px-2 py-0.5 rounded border border-red-500/30">BTG</span>
            <span class="text-xs text-gray-400">${player.role}</span>
          </div>
        </div>
      </div>

      <!-- Region (desktop) -->
      <div class="hidden md:block text-center md:col-span-1">
        <span class="bg-black text-xs px-3 py-1 rounded-full border border-red-500/30">${player.region}</span>
      </div>

      <!-- Specialization -->
      <div class="md:col-span-3">
        <div class="flex flex-wrap gap-2">
          <div class="tier-badge flex items-center space-x-1 bg-black px-3 py-1 rounded-full text-sm font-medium">
            <i class="fas fa-${getSpecializationIcon(player.specialization)} text-red-500"></i>
            <span>${player.specialization}</span>
          </div>
        </div>
      </div>

      <!-- Role (desktop) -->
      <div class="hidden md:block text-center md:col-span-2" id="roleContainer-${player.id}"></div>

      <!-- Points (desktop) -->
      <div class="hidden md:block text-right md:col-span-1">
        <span class="font-bold">${player.points}</span>
      </div>
    </div>

    <!-- Mobile Stats -->
    <div class="grid grid-cols-3 gap-2 mt-3 md:hidden text-center text-sm">
      <div class="bg-black/50 rounded p-2 border border-red-500/30">
        <div class="text-gray-400">Region</div>
        <div class="font-medium">${player.region}</div>
      </div>
      <div class="bg-black/50 rounded p-2 border border-red-500/30">
        <div class="text-gray-400">Role</div>
        <div class="font-medium text-red-500">${player.role}</div>
      </div>
      <div class="bg-black/50 rounded p-2 border border-red-500/30">
        <div class="text-gray-400">Points</div>
        <div class="font-medium">${player.points}</div>
      </div>
    </div>
  `;

  // Add role edit span into desktop role cell
  const roleCell = card.querySelector(`#roleContainer-${player.id}`);
  if (roleCell) roleCell.appendChild(roleDisplay);

  return card;
}

function getSpecializationIcon(spec) {
  if (spec.includes('Sword')) return 'sword';
  if (spec.includes('Archery')) return 'bow-arrow';
  if (spec.includes('Magic')) return 'magic';
  if (spec.includes('Brawler')) return 'fist-raised';
  return 'sword';
}

renderPlayers();