const appendChild = (html, place) => {
  const element = document.createRange().createContextualFragment(html);
  document.querySelector(place).appendChild(element);
};

const store = (data, name) => {
  localStorage.setItem(name, JSON.stringify(data));
};

const getFromStorage = (name) => {
  return JSON.parse(localStorage.getItem(name)) || [];
};

const insertTasksIntoDom = (tasks) => {
  tasks.forEach((task) => {
    appendChild(
      `
    <li id="${task.id}" class="task p-1 text-gray border-b-1 flex justify-between items-center" 
    data-index="${task.index}" tabindex="0" draggable="true">
      <div class="w-full">
        <label class="control control-checkbox" for="task-${task.index}">
          <div class="w-full">
            <del>
            <input type="text" data-input-id="${task.id}" 
            class="task-text ${task.complete ? 'del' : ''}" value="${task.description}" disabled />
      </del>
          </div>
          <input type="checkbox" data-check-id="${task.id}" ${task.complete ? 'checked' : ''} />
          <div class="control-indicator"></div>
        </label>
      </div>
      <button data-btn-id="${task.id}" 
      class="flex items-center border-0 bg-inherit" data-status="edit"><span class="icon icon-dots" /></button>
    </li>`,
      '#list'
    );
  });
};

const getTaskFromDom = (id) => {
  const task = document.querySelector(`#${id}`);
  const checkbox = document.querySelector(`[data-check-id="${id}"]`);
  const text = document.querySelector(`[data-input-id="${id}"]`);
  const btn = document.querySelector(`[data-btn-id="${id}"]`);
  const icon = btn.firstChild;
  return {
    task,
    checkbox,
    text,
    btn,
    icon,
  };
};

const taskBlur = (id) => {
  if (id) {
    const { task, text, btn, icon } = getTaskFromDom(id);
    icon.classList.add('icon-dots');
    icon.classList.remove('icon-delete');
    task.classList.remove('bg-light-yellow');
    task.classList.add('bg-white');
    text.setAttribute('disabled', true);
    btn.setAttribute('data-status', 'edit');
    task.blur();
  }
};

const taskFocus = (id) => {
  if (id) {
    const { task, text, btn, icon } = getTaskFromDom(id);
    icon.classList.remove('icon-dots');
    icon.classList.add('icon-delete');
    task.classList.add('bg-light-yellow');
    text.removeAttribute('disabled');
    btn.setAttribute('data-status', 'delete');
    task.focus();
    return task;
  }
  return false;
};

const updateIndex = () => {
  listElement.childNodes.forEach((task) => {
    dragDropSorting(task, list);
  });
};

export { appendChild, store, getFromStorage, insertTasksIntoDom, getTaskFromDom, taskBlur, taskFocus };
