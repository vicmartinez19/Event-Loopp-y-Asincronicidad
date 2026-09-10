## Módulo 3: Event Loop y Asincronía en JavaScript

### 📖 Descripción del Proyecto
Simulación interactiva de una cafetería moderna donde los clientes realizan pedidos que requieren tiempo de preparación. La interfaz visual demuestra el funcionamiento del **Event Loop**, **Web APIs (`setTimeout`)**, **Promises** y sintaxis moderna **`async/await`** sin bloquear la interacción del usuario.

### 🎯 Objetivos Cubiertos
- [x] Recibir nuevos pedidos de clientes con IDs únicos.
- [x] Procesar cada pedido asincrónicamente mediante `setTimeout` y `Promise`.
- [x] Actualizar dinámicamente el estado en la interfaz ('En Proceso' -> 'Completado') usando `async/await`.
- [x] Contadores en tiempo real de pedidos activos y completados.

### 🚀 Cómo Ejecutar
1. Abre el archivo `index.html` directamente en tu navegador (doble clic o usando la extensión Live Server en VS Code).
2. Haz clic varias veces en el botón **"Agregar Pedido"**.
3. Observa cómo cada pedido entra en estado "En Proceso" y tras unos segundos pasa a "Completado", demostrando cómo el navegador maneja múltiples operaciones asincrónicas concurrentes.
