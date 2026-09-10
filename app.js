// Elementos del DOM
const orderList = document.getElementById('orderList');
const addOrderBtn = document.getElementById('addOrderBtn');
const activeCountElem = document.getElementById('activeCount');
const completedCountElem = document.getElementById('completedCount');

// Catálogo de bebidas para hacer más realista la simulación
const bebidas = [
  'Café Espresso',
  'Capuchino de Vainilla',
  'Latte Caramelo',
  'Mocha Blanco',
  'Americano Intenso',
  'Té Chai Latte',
  'Flat White Especial'
];

let orderId = 1;
let pedidosActivos = 0;
let pedidosCompletados = 0;

// Actualizar contadores en la interfaz
function updateStats() {
  activeCountElem.textContent = pedidosActivos;
  completedCountElem.textContent = pedidosCompletados;
}

// Evento al presionar el botón "Agregar Pedido"
addOrderBtn.addEventListener('click', () => {
  const bebidaAleatoria = bebidas[Math.floor(Math.random() * bebidas.length)];
  // Tiempo de preparación simulado entre 2 y 5 segundos
  const tiempoEstimado = Math.floor(Math.random() * 3000) + 2000;

  const order = {
    id: orderId++,
    producto: bebidaAleatoria,
    status: 'En Proceso',
    tiempoEstimado: tiempoEstimado
  };

  pedidosActivos++;
  updateStats();

  addOrder(order);
  processOrder(order);
});

// Función para renderizar el pedido inicial en la interfaz
function addOrder(order) {
  const listItem = document.createElement('li');
  listItem.id = `order-${order.id}`;
  listItem.className = 'order-item en-proceso';

  listItem.innerHTML = `
    <div class="order-info">
      <span class="order-title">Pedido #${order.id}: ${order.producto}</span>
      <span class="order-detail" id="detail-${order.id}">Preparando... (~${(order.tiempoEstimado / 1000).toFixed(1)}s)</span>
    </div>
    <span class="badge en-proceso" id="badge-${order.id}">En Proceso</span>
  `;

  orderList.prepend(listItem);
}

// Función que simula la preparación del pedido mediante una Promesa y setTimeout
function prepararPedido(order) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`¡${order.producto} listo para entregar!`);
    }, order.tiempoEstimado);
  });
}

// Función para actualizar el estado del pedido en la interfaz
function updateOrderStatus(order, status, mensajeExito) {
  const listItem = document.getElementById(`order-${order.id}`);
  const badge = document.getElementById(`badge-${order.id}`);
  const detail = document.getElementById(`detail-${order.id}`);

  if (listItem && badge && detail) {
    listItem.className = 'order-item completado';
    badge.className = 'badge completado';
    badge.textContent = status;
    detail.textContent = `${mensajeExito} (Finalizado)`;
  }
}

// Función asincrónica principal para procesar el pedido con async/await
async function processOrder(order) {
  try {
    // Esperamos a que la promesa de preparación se resuelva (simulando el Event Loop y Web APIs)
    const mensaje = await prepararPedido(order);
    
    // Una vez resuelta, actualizamos la vista
    updateOrderStatus(order, 'Completado', mensaje);

    pedidosActivos--;
    pedidosCompletados++;
    updateStats();
  } catch (error) {
    console.error(`Error procesando el pedido #${order.id}:`, error);
  }
}