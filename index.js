const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');
const counter = document.getElementById('counter');

let todos = [];

const ICON_CIRCLE = `<svg class="icon check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/></svg>`;
const ICON_CHECK = `<svg class="icon check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M8 12.5l3 3 5-6"/></svg>`;
const ICON_TRASH = `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h16M10 11v6M14 11v6M6 7l1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12M9 7V4h6v3"/></svg>`;

function render() {
  list.innerHTML = '';

  todos.forEach((todo, index) => {
    const li = document.createElement('li');
    if (todo.done) li.classList.add('done');

    li.innerHTML = todo.done ? ICON_CHECK : ICON_CIRCLE;

    const span = document.createElement('span');
    span.textContent = todo.text;

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.setAttribute('aria-label', 'Видалити');
    deleteBtn.innerHTML = ICON_TRASH;

    // клік по справі: виконано / не виконано
    li.addEventListener('click', () => {
      todos[index].done = !todos[index].done;
      render();
    });

    // клік по смітнику: видалити
    deleteBtn.addEventListener('click', (event) => {
      event.stopPropagation();
      todos.splice(index, 1);
      render();
    });

    li.append(span, deleteBtn);
    list.appendChild(li);
  });

  const left = todos.filter(t => !t.done).length;
  counter.textContent = `Залишилось справ: ${left}`;
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const text = input.value.trim();
  if (!text) return;

  todos.push({ text, done: false });
  input.value = '';
  render();
});

render();