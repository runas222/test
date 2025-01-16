// Хранилище клиентов
let clients = [];

// Базовый URL API
const API_URL = '/todos';

// Загрузка данных
async function loadFromFile() {
  try {
    const response = await fetch(API_URL, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}`);
    }
    clients = await response.json();
  } catch (error) {
    console.error('Ошибка загрузки:', error);
    throw error;
  }
}

// Сохранение данных
async function saveToFile() {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        id: Date.now()
      })
    });
    
    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Ошибка сохранения:', error);
    throw error;
  }
}

// Элементы DOM
const form = document.getElementById('clientForm');
const tableBody = document.querySelector('#clientsTable tbody');

// Отображение клиентов
function renderClients() {
  tableBody.innerHTML = '';
  clients.forEach((client, index) => {
    const row = document.createElement('tr');
    
    row.innerHTML = `
      <td>${client.name}</td>
      <td>${client.email}</td>
      <td>${client.phone || ''}</td>
      <td class="actions">
        <button class="edit" onclick="editClient(${index})">✏️</button>
        <button class="delete" onclick="deleteClient(${index})">🗑️</button>
      </td>
    `;
    
    tableBody.appendChild(row);
  });
}

// Добавление клиента
form.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const client = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    phone: document.getElementById('phone').value
  };
  
  clients.push(client);
  saveToFile().catch(error => console.error(error));
  renderClients();
  form.reset();
});

// Удаление клиента
async function deleteClient(index) {
  if (confirm('Вы уверены, что хотите удалить клиента?')) {
    const clientId = clients[index].id;
    
    try {
      const response = await fetch(`${API_URL}/${clientId}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error(`Ошибка HTTP: ${response.status}`);
      }
      
      clients.splice(index, 1);
      renderClients();
    } catch (error) {
      console.error('Ошибка удаления:', error);
    }
  }
}

// Первоначальная загрузка клиентов
loadFromFile()
  .then(() => renderClients())
  .catch(error => console.error(error));
