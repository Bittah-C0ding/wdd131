// Made by Adrian Hernandez

/* Data */
let tasks = [];
let nextId = 1;

const sampleTasks = [
  {
    id: 1,
    title: '📚 Welcome to Study Planner!',
    course: 'Demo',
    dueDate: getDateString(3),
    priority: 'medium',
    notes: 'This is your dashboard. You can see your total tasks, completed items, overdue tasks, and average priority at a glance.',
    completed: false,
  },
  {
    id: 2,
    title: '📅 Check Your Due Dates',
    course: 'Demo',
    dueDate: getDateString(5),
    priority: 'high',
    notes: 'Use the calendar tab to view all your upcoming deadlines. Click any day with tasks to jump back to your dashboard.',
    completed: false,
  },
  {
    id: 3,
    title: '📝 Add Notes to Your Tasks',
    course: 'Demo',
    dueDate: getDateString(7),
    priority: 'low',
    notes: 'You can add notes to any task for extra details. Click the "Add Task" tab to create your own tasks with notes!',
    completed: false,
  },
  {
    id: 4,
    title: '🗑️ Delete This Demo Task',
    course: 'Demo',
    dueDate: getDateString(2),
    priority: 'medium',
    notes: 'You can delete any task by clicking the red ✕ button. These demo tasks are here to help you get started – feel free to delete them and create your own!',
    completed: false,
  },
];

function getDateString(daysFromNow) {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  return date.toISOString().split('T')[0];
}

/* Local Storage */
function loadTasks() {
  const stored = localStorage.getItem('studyPlannerTasks');
  if (stored) {
    tasks = JSON.parse(stored);
    nextId = tasks.reduce((max, task) => Math.max(max, task.id), 0) + 1;
  } else {
    tasks = sampleTasks;
    nextId = sampleTasks.reduce((max, task) => Math.max(max, task.id), 0) + 1;
    saveTasks();
  }
}

function saveTasks() {
  localStorage.setItem('studyPlannerTasks', JSON.stringify(tasks));
}

function loadUserName() {
  const name = localStorage.getItem('studyPlannerName');
  if (name) {
    document.getElementById('userNameInput').value = name;
    document.getElementById('footerName').textContent = name;
  }
}

function saveUserName(name) {
  localStorage.setItem('studyPlannerName', name);
  document.getElementById('footerName').textContent = name || 'Adrian Hernandez';
}

function loadTheme() {
  const theme = localStorage.getItem('studyPlannerTheme') || 'light';
  document.getElementById('themeSelect').value = theme;
  document.body.classList.toggle('dark', theme === 'dark');
}

function saveTheme(theme) {
  localStorage.setItem('studyPlannerTheme', theme);
  document.body.classList.toggle('dark', theme === 'dark');
}

/* DOM References */
const tabs = document.querySelectorAll('.tab');
const pages = {
  dashboard: document.getElementById('dashboard'),
  add: document.getElementById('add'),
  calendar: document.getElementById('calendar'),
};

const taskListEl = document.getElementById('taskList');
const totalTasksEl = document.getElementById('totalTasks');
const completedTasksEl = document.getElementById('completedTasks');
const overdueTasksEl = document.getElementById('overdueTasks');
const avgPriorityEl = document.getElementById('avgPriority');

const filterStatus = document.getElementById('filterStatus');
const filterPriority = document.getElementById('filterPriority');
const filterCourse = document.getElementById('filterCourse');
const sortBy = document.getElementById('sortBy');

const taskForm = document.getElementById('taskForm');
const addTaskBtn = document.getElementById('addTaskBtn');
const cancelAddBtn = document.getElementById('cancelAdd');

const userNameInput = document.getElementById('userNameInput');
const themeSelect = document.getElementById('themeSelect');

/* Tab Navigation */
tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    tabs.forEach((t) => t.classList.remove('active'));
    tab.classList.add('active');

    const pageId = tab.dataset.tab;
    Object.keys(pages).forEach((key) => {
      pages[key].classList.toggle('active', key === pageId);
    });
  });
});

addTaskBtn.addEventListener('click', () => {
  tabs.forEach((t) => t.classList.remove('active'));
  document.querySelector('.tab[data-tab="add"]').classList.add('active');

  Object.keys(pages).forEach((key) => {
    pages[key].classList.toggle('active', key === 'add');
  });
});

cancelAddBtn.addEventListener('click', () => {
  tabs.forEach((t) => t.classList.remove('active'));
  document.querySelector('.tab[data-tab="dashboard"]').classList.add('active');

  Object.keys(pages).forEach((key) => {
    pages[key].classList.toggle('active', key === 'dashboard');
  });

  taskForm.reset();
});

/* Render Functions */
function renderTaskCard(task) {
  const priorityClass = `priority-${task.priority}`;
  const completedClass = task.completed ? 'completed' : '';

  const dueDate = new Date(task.dueDate + 'T00:00:00');
  const today = new Date();
  const isOverdue = (
    !task.completed &&
    dueDate < today &&
    dueDate.toDateString() !== today.toDateString()
  );

  return `
    <div class="task-card ${priorityClass} ${completedClass}" data-id="${task.id}">
      <div class="task-info">
        <div class="task-title">${task.title}</div>
        <div class="task-meta">
          <span>📅 ${formatDate(task.dueDate)}</span>
          ${task.course ? `<span class="course-tag">${task.course}</span>` : ''}
          <span>⚡ ${task.priority}</span>
          ${isOverdue ? '<span style="color:var(--red);font-weight:600;">⚠️ Overdue</span>' : ''}
          ${task.completed ? '✅ Done' : ''}
        </div>
        ${task.notes ? `<div style="font-size:0.78rem;color:var(--text-secondary);margin-top:0.15rem;">📝 ${task.notes}</div>` : ''}
      </div>
      <div class="task-actions">
        <button class="btn success toggle-complete" data-id="${task.id}">
          ${task.completed ? '↩️ Undo' : '✅ Done'}
        </button>
        <button class="btn danger delete-task" data-id="${task.id}">✕</button>
      </div>
    </div>
  `;
}

function renderTasks() {
  const statusFilterValue = filterStatus.value;
  const priorityFilterValue = filterPriority.value;
  const courseFilterValue = filterCourse.value;
  const sortCriteria = sortBy.value;

  let filtered = tasks.filter((task) => {
    const statusMatch =
      statusFilterValue === 'all' ||
      (statusFilterValue === 'completed' && task.completed) ||
      (statusFilterValue === 'active' && !task.completed);

    const priorityMatch =
      priorityFilterValue === 'all' || task.priority === priorityFilterValue;

    const courseMatch =
      courseFilterValue === 'all' || task.course === courseFilterValue;

    return statusMatch && priorityMatch && courseMatch;
  });

  filtered.sort((a, b) => {
    switch (sortCriteria) {
      case 'dueDate':
        return new Date(a.dueDate) - new Date(b.dueDate);
      case 'priority': {
        const order = { high: 0, medium: 1, low: 2 };
        return order[a.priority] - order[b.priority];
      }
      case 'title':
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  if (filtered.length === 0) {
    taskListEl.innerHTML = `
      <p style="text-align:center;padding:1.5rem;color:var(--text-muted);">
        No tasks match your filters. Add a new task!
      </p>
    `;
  } else {
    taskListEl.innerHTML = filtered.map((task) => renderTaskCard(task)).join('');
  }

  updateStats();
  populateCourseFilter();
  attachTaskEvents();
}

/* Stats */
function updateStats() {
  const total = tasks.length;
  const completed = tasks.filter((task) => task.completed).length;

  const now = new Date();
  now.setHours(0, 0, 0, 0);

  const overdue = tasks.filter(
    (task) => !task.completed && new Date(task.dueDate + 'T00:00:00') < now
  ).length;

  const priorityValues = { high: 3, medium: 2, low: 1 };
  const avg = tasks.length > 0
    ? tasks.reduce((sum, task) => sum + priorityValues[task.priority], 0) / tasks.length
    : 0;

  totalTasksEl.textContent = total;
  completedTasksEl.textContent = completed;
  overdueTasksEl.textContent = overdue;
  avgPriorityEl.textContent = avg.toFixed(1);
}

function populateCourseFilter() {
  const courses = [...new Set(tasks.map((task) => task.course).filter(Boolean))];
  const currentValue = filterCourse.value;

  filterCourse.innerHTML =
    '<option value="all">All</option>' +
    courses.map((course) => `<option value="${course}">${course}</option>`).join('');

  filterCourse.value = currentValue;
}

function formatDate(dateStr) {
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

/* Task Operations */
function addTask(taskData) {
  const newTask = {
    id: nextId++,
    title: taskData.title,
    course: taskData.course || '',
    dueDate: taskData.dueDate,
    priority: taskData.priority || 'medium',
    notes: taskData.notes || '',
    completed: false,
  };

  tasks.push(newTask);
  saveTasks();
  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);
  saveTasks();
  renderTasks();
}

function toggleComplete(id) {
  const task = tasks.find((task) => task.id === id);
  if (task) {
    task.completed = !task.completed;
    saveTasks();
    renderTasks();
  }
}

function attachTaskEvents() {
  document.querySelectorAll('.delete-task').forEach((btn) => {
    btn.addEventListener('click', (event) => {
      const id = parseInt(event.target.dataset.id);
      if (confirm('Delete this task?')) {
        deleteTask(id);
      }
    });
  });

  document.querySelectorAll('.toggle-complete').forEach((btn) => {
    btn.addEventListener('click', (event) => {
      const id = parseInt(event.target.dataset.id);
      toggleComplete(id);
    });
  });
}

/* Form Submission */
taskForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const title = document.getElementById('taskTitle').value.trim();
  const course = document.getElementById('taskCourse').value.trim();
  const dueDate = document.getElementById('taskDueDate').value;
  const priority = document.getElementById('taskPriority').value;
  const notes = document.getElementById('taskNotes').value.trim();

  if (!title) {
    alert('Please enter a task title.');
    return;
  }

  if (!dueDate) {
    alert('Please select a due date.');
    return;
  }

  addTask({ title, course, dueDate, priority, notes });
  taskForm.reset();

  tabs.forEach((t) => t.classList.remove('active'));
  document.querySelector('.tab[data-tab="dashboard"]').classList.add('active');

  Object.keys(pages).forEach((key) => {
    pages[key].classList.toggle('active', key === 'dashboard');
  });
});

/* Calendar */
function renderCalendar() {
  const grid = document.getElementById('calendarGrid');
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();

  const firstDay = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startDay = firstDay.getDay();

  let html = '';
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  dayNames.forEach((name) => {
    html += `
      <div style="font-weight:600;text-align:center;color:var(--text-secondary);font-size:0.7rem;text-transform:uppercase;letter-spacing:0.05em;">
        ${name}
      </div>
    `;
  });

  for (let i = 0; i < startDay; i++) {
    html += `<div class="calendar-day empty"></div>`;
  }

  const todayStr = new Date().toISOString().split('T')[0];

  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const tasksOnDay = tasks.filter(
      (task) => task.dueDate === dateStr && !task.completed
    );
    const isToday = dateStr === todayStr;

    html += `
      <div class="calendar-day ${tasksOnDay.length > 0 ? 'has-task' : ''}" 
           style="${isToday ? 'border:2px solid var(--gold);' : ''}">
        <span class="day-number">${day}</span>
        ${tasksOnDay.length > 0
          ? `<span class="task-indicator">${tasksOnDay.length} task${tasksOnDay.length > 1 ? 's' : ''}</span>`
          : ''
        }
      </div>
    `;
  }

  grid.innerHTML = html;

  document.querySelectorAll('.calendar-day.has-task').forEach((el) => {
    el.addEventListener('click', () => {
      tabs.forEach((t) => t.classList.remove('active'));
      document.querySelector('.tab[data-tab="dashboard"]').classList.add('active');

      Object.keys(pages).forEach((key) => {
        pages[key].classList.toggle('active', key === 'dashboard');
      });
    });
  });
}

/* Event Listeners */
filterStatus.addEventListener('change', renderTasks);
filterPriority.addEventListener('change', renderTasks);
filterCourse.addEventListener('change', renderTasks);
sortBy.addEventListener('change', renderTasks);

userNameInput.addEventListener('change', function () {
  const name = this.value.trim();
  saveUserName(name);
});

themeSelect.addEventListener('change', function () {
  saveTheme(this.value);
});

/* Initialization */
loadTasks();
loadUserName();
loadTheme();
renderTasks();
renderCalendar();