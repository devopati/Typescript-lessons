/**
 * TYPESCRIPT WITH HTML: SOLUTIONS FOR EXERCISES
 */

// ============================================================
// TYPE DEFINITIONS & HELPERS
// ============================================================

// Exercise 5: Priority literal type
type Priority = "low" | "medium" | "high";

interface Todo {
  id: number;
  text: string;
  done: boolean;
  priority: Priority; // Exercise 5
}

type Filter = "all" | "active" | "done";

function getElement<T extends HTMLElement>(selector: string): T {
  const element = document.querySelector<T>(selector);
  if (element === null) {
    throw new Error(`No element matches "${selector}". Check your HTML.`);
  }
  return element;
}

// ============================================================
// 4. EVENTS: A COUNTER (EXERCISES 1 & 2)
// ============================================================

const countElement = getElement<HTMLElement>("#count");
const incrementButton = document.querySelector<HTMLButtonElement>("#increment")!;
const increment5Button = getElement<HTMLButtonElement>("#increment-5"); // Exercise 1: +5 button selector
const decrementButton = getElement<HTMLButtonElement>("#decrement");
const resetButton = getElement<HTMLButtonElement>("#reset");

let count: number = 0;

function updateCount(newCount: number): void {
  count = newCount;
  countElement.textContent = count.toString();

  // Exercise 2: Stop the counter going above 10 by disabling buttons appropriately
  incrementButton.disabled = count >= 10;
  increment5Button.disabled = count > 5; // If count is > 5, adding 5 exceeds 10
  decrementButton.disabled = count <= 0;
}

incrementButton.addEventListener("click", () => updateCount(count + 1));
increment5Button.addEventListener("click", () => updateCount(count + 5)); // Exercise 1: +5 functionality
decrementButton.addEventListener("click", () => updateCount(count - 1));

resetButton.addEventListener("click", (event) => {
  console.log(`Reset clicked at x=${event.clientX}, y=${event.clientY}`);
  updateCount(0);
});

updateCount(0);

// ============================================================
// 5. FORMS AND INPUT VALUES: A GREETING (EXERCISE 3)
// ============================================================

const greetForm = getElement<HTMLFormElement>("#greet-form");
const nameInput = getElement<HTMLInputElement>("#name-input");
const ageInput = getElement<HTMLInputElement>("#age-input");
const greetingElement = getElement<HTMLParagraphElement>("#greeting");

function showMessage(
  element: HTMLElement,
  message: string,
  isError: boolean = false,
): void {
  element.textContent = message;
  element.classList.toggle("error", isError);
}

greetForm.addEventListener("submit", (event: SubmitEvent) => {
  event.preventDefault();

  const name: string = nameInput.value.trim();
  const age: number = Number(ageInput.value);

  if (name === "") {
    showMessage(greetingElement, "Please enter your name.", true);
    return;
  }
  if (Number.isNaN(age) || age <= 0) {
    showMessage(greetingElement, "Please enter a valid age.", true);
    return;
  }

  // Exercise 3: Show a different message for people under 18
  if (age < 18) {
    showMessage(
      greetingElement,
      `Hi ${name}! You are a minor (${age} years old). Next year you will be ${age + 1}.`,
    );
  } else {
    showMessage(
      greetingElement,
      `Hello ${name}! Next year you will be ${age + 1}.`,
    );
  }

  greetForm.reset();
});

// ============================================================
// 6. TYPED DATA AND RENDERING: A TO-DO LIST (EXERCISES 4 & 5)
// ============================================================

const todoForm = getElement<HTMLFormElement>("#todo-form");
const todoInput = getElement<HTMLInputElement>("#todo-input");
const todoFilter = getElement<HTMLSelectElement>("#todo-filter");
const todoList = getElement<HTMLUListElement>("#todo-list");
const todoSummary = getElement<HTMLParagraphElement>("#todo-summary");
const clearDoneButton = getElement<HTMLButtonElement>("#clear-done"); // Exercise 4: Clear done button

// Exercise 5: Updated initial data with priority property
let todos: Todo[] = [
  { id: 1, text: "Learn TypeScript types", done: true, priority: "high" },
  { id: 2, text: "Use TypeScript with HTML", done: false, priority: "medium" },
];

let currentFilter: Filter = "all";
let nextId: number = 3;

function addTodo(text: string): void {
  // Exercise 5: Provide a default priority ("medium") when adding new todos
  todos.push({ id: nextId, text: text, done: false, priority: "medium" });
  nextId++;
  render();
}

function toggleTodo(id: number): void {
  todos = todos.map((todo) =>
    todo.id === id ? { ...todo, done: !todo.done } : todo,
  );
  render();
}

function deleteTodo(id: number): void {
  todos = todos.filter((todo) => todo.id !== id);
  render();
}

// Exercise 4: Function to remove every finished task
function clearDoneTodos(): void {
  todos = todos.filter((todo) => !todo.done);
  render();
}

clearDoneButton.addEventListener("click", clearDoneTodos);

function getVisibleTodos(list: Todo[], filter: Filter): Todo[] {
  if (filter === "active") return list.filter((todo) => !todo.done);
  if (filter === "done") return list.filter((todo) => todo.done);
  return list;
}

function createTodoItem(todo: Todo): HTMLLIElement {
  const item = document.createElement("li");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = todo.done;
  checkbox.addEventListener("change", () => toggleTodo(todo.id));

  const label = document.createElement("span");
  label.textContent = ` ${todo.text} `;
  if (todo.done) {
    label.classList.add("done");
  }

  // Exercise 5: Display priority next to each task
  const priorityBadge = document.createElement("span");
  priorityBadge.textContent = `[${todo.priority.toUpperCase()}]`;
  priorityBadge.style.fontSize = "0.75rem";
  priorityBadge.style.marginLeft = "8px";
  priorityBadge.style.padding = "2px 6px";
  priorityBadge.style.borderRadius = "4px";
  priorityBadge.style.fontWeight = "bold";

  if (todo.priority === "high") {
    priorityBadge.style.backgroundColor = "#ffebee";
    priorityBadge.style.color = "#c62828";
  } else if (todo.priority === "medium") {
    priorityBadge.style.backgroundColor = "#fff8e1";
    priorityBadge.style.color = "#f57f17";
  } else {
    priorityBadge.style.backgroundColor = "#e8f5e9";
    priorityBadge.style.color = "#2e7d32";
  }

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", () => deleteTodo(todo.id));

  item.append(checkbox, label, priorityBadge, deleteButton);
  return item;
}

function render(): void {
  todoList.innerHTML = "";

  for (const todo of getVisibleTodos(todos, currentFilter)) {
    todoList.append(createTodoItem(todo));
  }

  const remaining = todos.filter((todo) => !todo.done).length;
  todoSummary.textContent = `${remaining} of ${todos.length} tasks left`;
}

todoForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = todoInput.value.trim();
  if (text === "") return;
  addTodo(text);
  todoInput.value = "";
  todoInput.focus();
});

todoFilter.addEventListener("change", () => {
  currentFilter = todoFilter.value as Filter;
  render();
});

render();

// ============================================================
// EXERCISE 6: RENAME AN ID IN INDEX.HTML (CONCEPTUAL NOTES)
// ============================================================
/**
 * Q: Does TypeScript notice if you rename an id in index.html (e.g., "count" to "counter") without changing main.ts?
 * A: No. TypeScript treats query selector arguments as plain strings (`string`), so it compiles successfully without errors.
 * 
 * Q: What happens in the browser?
 * A: Because `getElement` verifies element existence and throws an explicit error when it receives `null`, 
 *    the browser console (F12) will throw:
 *    "Uncaught Error: No element matches "#count". Check your HTML."
 *    This will halt execution of the script entirely.
 */