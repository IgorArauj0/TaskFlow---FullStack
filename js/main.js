/* ==========================================================
   1️⃣  ESTADO GLOBAL DA APLICAÇÃO
   ========================================================== */

// Recupera dados salvos no navegador (ou inicia vazio)
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let history = JSON.parse(localStorage.getItem("history")) || [];

// Controla se estamos editando uma tarefa
let editingIndex = null;


/* ==========================================================
   2️⃣  ELEMENTOS DO DOM
   ========================================================== */

const tasksContainer = document.getElementById("tasksContainer");
const historyContainer = document.getElementById("historyContainer");


/* ==========================================================
   3️⃣  FUNÇÃO DE PERSISTÊNCIA (SALVAR NO LOCALSTORAGE)
   ========================================================== */

function saveToStorage() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("history", JSON.stringify(history));
}


/* ==========================================================
   4️⃣  RENDERIZAÇÃO DAS TAREFAS
   ========================================================== */

function renderTasks() {

    tasksContainer.innerHTML = "";

    let pending = 0;
    let completed = 0;

    tasks.forEach((task, index) => {

        // Contadores para os cards
        if (task.status === "pending") pending++;
        if (task.status === "completed") completed++;

        // Criação do elemento visual
        const div = document.createElement("div");
        div.classList.add("task-item");

        div.innerHTML = `
            <span>${task.title} (${task.status})</span>
            <div>
                <button onclick="toggleTask(${index})">Status</button>
                <button onclick="editTask(${index})">Editar</button>
                <button onclick="deleteTask(${index})">Excluir</button>
            </div>
        `;

        tasksContainer.appendChild(div);
    });

    // Atualiza os cards superiores
    document.getElementById("totalTasks").textContent = tasks.length;
    document.getElementById("pendingTasks").textContent = pending;
    document.getElementById("completedTasks").textContent = completed;

    // Atualiza os gráficos
    updateCharts(pending, completed);

    // Atualiza histórico
    renderHistory();
}


/* ==========================================================
   5️⃣  RENDERIZAÇÃO DO HISTÓRICO
   ========================================================== */

function renderHistory() {

    historyContainer.innerHTML = "";

    history.forEach(item => {
        const div = document.createElement("div");
        div.textContent = item;
        historyContainer.appendChild(div);
    });
}


/* ==========================================================
   6️⃣  MODAL (ABRIR / FECHAR)
   ========================================================== */

function openModal() {
    editingIndex = null;
    document.getElementById("taskTitle").value = "";
    document.getElementById("modalTitle").textContent = "Nova Tarefa";
    document.getElementById("taskModal").style.display = "flex";
}

function closeModal() {
    document.getElementById("taskModal").style.display = "none";
}


/* ==========================================================
   7️⃣  CRUD DAS TAREFAS
   ========================================================== */

// Criar ou Atualizar
function saveTask() {

    const title = document.getElementById("taskTitle").value;

    if (!title) {
        alert("Digite um título");
        return;
    }

    // Se estiver editando
    if (editingIndex !== null) {
        tasks[editingIndex].title = title;
        history.push(`Tarefa editada: ${title}`);
    } 
    // Se for nova tarefa
    else {
        tasks.push({ title, status: "pending" });
        history.push(`Tarefa criada: ${title}`);
    }

    saveToStorage();
    closeModal();
    renderTasks();
}


// Editar
function editTask(index) {
    editingIndex = index;
    document.getElementById("taskTitle").value = tasks[index].title;
    document.getElementById("modalTitle").textContent = "Editar Tarefa";
    document.getElementById("taskModal").style.display = "flex";
}


// Excluir
function deleteTask(index) {
    history.push(`Tarefa removida: ${tasks[index].title}`);
    tasks.splice(index, 1);

    saveToStorage();
    renderTasks();
}


// Alterar Status
function toggleTask(index) {

    tasks[index].status =
        tasks[index].status === "pending"
            ? "completed"
            : "pending";

    history.push(
        `Status alterado: ${tasks[index].title} → ${tasks[index].status}`
    );

    saveToStorage();
    renderTasks();
}


/* ==========================================================
   8️⃣  LIMPAR HISTÓRICO
   ========================================================== */

function clearHistory() {

    const confirmClear = confirm(
        "Deseja realmente limpar todo o histórico?"
    );

    if (!confirmClear) return;

    history = [];

    saveToStorage();
    renderHistory();
}


/* ==========================================================
   9️⃣  GRÁFICOS (DONUT CHART CSS)
   ========================================================== */

function updateCharts(pending, completed) {

    const total = pending + completed;

    const chartTotal = document.getElementById("chartTotal");
    const chartPending = document.getElementById("chartPending");
    const chartCompleted = document.getElementById("chartCompleted");

    // Se não houver tarefas
    if (total === 0) {
        chartTotal.style.background = "#444";
        chartPending.style.background = "#444";
        chartCompleted.style.background = "#444";
        return;
    }

    const pendingPercent = (pending / total) * 100;
    const completedPercent = (completed / total) * 100;

    // Total
    chartTotal.style.background = `
        conic-gradient(
            #00c6ff 0% ${pendingPercent}%,
            #28a745 ${pendingPercent}% 100%
        )
    `;

    // Pendentes
    chartPending.style.background = `
        conic-gradient(
            #00c6ff 0% ${pendingPercent}%,
            #333 ${pendingPercent}% 100%
        )
    `;

    // Concluídas
    chartCompleted.style.background = `
        conic-gradient(
            #28a745 0% ${completedPercent}%,
            #333 ${completedPercent}% 100%
        )
    `;
}


/* ==========================================================
   🔟  CONTROLE DE SEÇÕES (SIDEBAR)
   ========================================================== */

function showSection(sectionId) {

    document.querySelectorAll(".section").forEach(sec => {
        sec.classList.remove("active");
    });

    document.getElementById(sectionId).classList.add("active");
}


// Logout (simulado)
function logout() {
    alert("Logout (simulado)");
    window.location.href = "login.html";
}


/* ==========================================================
   🚀 INICIALIZAÇÃO DA APLICAÇÃO
   ========================================================== */

if (tasksContainer) {
    renderTasks();
}
