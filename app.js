const orderList = document.getElementById('orderList');
const addOrderBtn = document.getElementById('addOrderBtn');
const activeCountElem = document.getElementById('activeCount');
const completedCountElem = document.getElementById('completedCount');

let orderId = 1;
let pedidosActivos = 0;
let pedidosCompletados = 0;

function updateStats() {
  if (activeCountElem) activeCountElem.textContent = pedidosActivos;
  if (completedCountElem) completedCountElem.textContent = pedidosCompletados;
}

addOrderBtn.addEventListener('click', () => {
  const order = { 
    id: orderId++, 
    status: 'En Proceso',
    tiempoPreparacion: Math.floor(Math.random() * 2000) + 2000 // 2 a 4 segundos
  };
  pedidosActivos++;
  updateStats();

  addOrder(order);
  processOrder(order);
});

function addOrder(order) {
  const listItem = document.createElement('li');
  listItem.id = `order-${order.id}`;
  listItem.textContent = `Pedido #${order.id}: ${order.status} (Preparando...)`;
  orderList.appendChild(listItem);
}

function updateOrderStatus(order, status) {
  const listItem = document.getElementById(`order-${order.id}`);
  if (listItem) {
    listItem.textContent = `Pedido #${order.id}: ${status}`;
  }
}

// Función que crea una promesa simulando la preparación con setTimeout
function prepararPedido(order) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Pedido #${order.id} preparado con éxito.`);
    }, order.tiempoPreparacion);
  });
}

async function processOrder(order) {
  prepararPedido(order).then((mensaje) => {
    console.log(mensaje);
    updateOrderStatus(order, 'Completado');
    pedidosActivos--;
    pedidosCompletados++;
    updateStats();
  });
}