const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');
const counter = document.getElementById('counter');

let todos = [];

function render() {
  list.innerHTML = '';

  todos.forEach((todo, index) => {
    const li = document.createElement('li');
    if (todo.done) li.classList.add('done');

    const span = document.createElement('span');
    span.textContent = todo.text;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Видалити';

    // клік по справі: виконано / не виконано
    li.addEventListener('click', () => {
      todos[index].done = !todos[index].done;
      render();
    });

    // клік по кнопці: видалити
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