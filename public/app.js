// Инициализация Firestore
if (!window.db) {
  window.db = firebase.firestore();
}
const clientsCollection = window.db.collection('clients');

// Элементы DOM
const form = document.getElementById('clientForm');
const tableBody = document.querySelector('#clientsTable tbody');

// Отображение клиентов
function renderClients(clients) {
  tableBody.innerHTML = '';
  clients.forEach((client, index) => {
    const row = document.createElement('tr');
    
    row.innerHTML = `
      <td>${client.name}</td>
      <td>${client.email}</td>
      <td>${client.phone || ''}</td>
      <td class="actions">
        <button class="edit" onclick="editClient('${client.id}')">✏️</button>
        <button class="delete" onclick="deleteClient('${client.id}')">🗑️</button>
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
    phone: document.getElementById('phone').value,
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  };
  
  clientsCollection.add(client)
    .then(() => {
      form.reset();
    })
    .catch(error => console.error('Ошибка добавления:', error));
});

// Удаление клиента
function deleteClient(id) {
  if (confirm('Вы уверены, что хотите удалить клиента?')) {
    clientsCollection.doc(id).delete()
      .catch(error => console.error('Ошибка удаления:', error));
  }
}

// Редактирование клиента
function editClient(id) {
  const newName = prompt('Введите новое имя:');
  if (newName) {
    clientsCollection.doc(id).update({ name: newName })
      .catch(error => console.error('Ошибка редактирования:', error));
  }
}

// Реальное обновление данных
clientsCollection.orderBy('createdAt').onSnapshot(snapshot => {
  const clients = [];
  snapshot.forEach(doc => {
    clients.push({ id: doc.id, ...doc.data() });
  });
  renderClients(clients);
});
