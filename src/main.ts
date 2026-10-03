/**
 * TYPESCRIPT WITH HTML: LESSON NOTES
 *
 * Browsers only understand JavaScript, so this file must be compiled first:
 *   npm run build         compiles src/main.ts to src/dist/main.js (once)
 *   npm run watch         recompiles every time you save
 * Then open src/index.html in your browser and refresh after each change.
 *
 * Lines marked ERROR are commented out because they cause an error.
 * Uncomment them one at a time to see what TypeScript says, then comment them again.
 *
 * CONTENTS
 *   1. Getting elements from the page (and why they might be null)
 *   2. Specific element types (HTMLInputElement, HTMLButtonElement, ...)
 *   3. A reusable, type-safe helper
 *   4. Events: a counter
 *   5. Forms and input values: a greeting
 *   6. Typed data and rendering: a to-do list
 */

// ============================================================
// 1. GETTING ELEMENTS FROM THE PAGE
// ============================================================
/**
 * document.getElementById can return null: the id might be misspelled,
 * or the element might not exist. TypeScript makes you handle that.
 *
 *   document.getElementById("count")   type: HTMLElement | null
 */

const countDisplay = document.getElementById("count");

// ERROR: countDisplay.textContent = "0"; // Error: 'countDisplay' is possibly 'null'

// Option 1: check first (narrowing, like in types.ts section 10)
if (countDisplay !== null) {
  countDisplay.textContent = "0";
}

// Option 2: optional chaining. Does nothing if the element is missing.
countDisplay?.setAttribute("title", "The current count");

// ============================================================
// 2. SPECIFIC ELEMENT TYPES
// ============================================================
/**
 * Every HTML tag has its own type with its own properties:
 *   <input>    HTMLInputElement     .value, .checked, .valueAsNumber
 *   <button>   HTMLButtonElement    .disabled
 *   <form>     HTMLFormElement      .reset()
 *   <select>   HTMLSelectElement    .value
 *   <ul>       HTMLUListElement
 *
 * getElementById only knows it's "some HTMLElement", so .value doesn't exist on it.
 */

const nameInputGeneric = document.getElementById("name-input");
// ERROR: console.log(nameInputGeneric?.value); // Error: Property 'value' does not exist on type 'HTMLElement'

// querySelector with a TAG name knows the exact type:
const firstForm = document.querySelector("form"); // HTMLFormElement | null

// With an id or class it can't know, so you tell it with a generic <...>:
const nameInputTyped = document.querySelector<HTMLInputElement>("#name-input"); // HTMLInputElement | null
console.log(
  "Placeholder:",
  nameInputTyped?.placeholder,
  "| First form id:",
  firstForm?.id,
);

/**
 * You may also see "as":   document.getElementById("name-input") as HTMLInputElement
 * That removes null and trusts you completely. If the id is wrong, the program crashes later.
 * The helper below is safer.
 */

// ============================================================
// 3. A REUSABLE, TYPE-SAFE HELPER
// ============================================================
/**
 * Checking for null every time gets repetitive. This helper:
 *   - is generic, so you choose the element type:   getElement<HTMLInputElement>("#name-input")
 *   - uses a constraint (T extends HTMLElement) so only element types are allowed
 *   - throws a clear error if the element is missing, so it never returns null
 */

function getElement<T extends HTMLElement>(selector: string): T {
  const element = document.querySelector<T>(selector);
  if (element === null) {
    throw new Error(`No element matches "${selector}". Check your HTML.`);
  }
  return element;
}

// ERROR: getElement<string>("#count"); // Error: string does not satisfy the constraint HTMLElement

// ============================================================
// 4. EVENTS: A COUNTER
// ============================================================
/**
 * addEventListener knows which event type each event name gives you:
 *   "click"    MouseEvent
 *   "submit"   SubmitEvent
 *   "input"    Event
 *   "keydown"  KeyboardEvent
 */

const countElement = getElement<HTMLElement>("#count");
const incrementButton = getElement<HTMLButtonElement>("#increment");
const decrementButton = getElement<HTMLButtonElement>("#decrement");
const resetButton = getElement<HTMLButtonElement>("#reset");

let count: number = 0;

function updateCount(newCount: number): void {
  count = newCount;
  // textContent is a string, so the number must be converted
  countElement.textContent = count.toString();
  // ERROR: countElement.textContent = count; // Error: Type 'number' is not assignable to type 'string'

  decrementButton.disabled = count <= 0; // disabled is a boolean
}

incrementButton.addEventListener("click", () => updateCount(count + 1));
decrementButton.addEventListener("click", () => updateCount(count - 1));

// The event parameter is typed automatically. Hover over "event" to see MouseEvent.
resetButton.addEventListener("click", (event) => {
  console.log(`Reset clicked at x=${event.clientX}, y=${event.clientY}`);
  updateCount(0);
});

updateCount(0);

// ============================================================
// 5. FORMS AND INPUT VALUES: A GREETING
// ============================================================
/**
 * An input's .value is ALWAYS a string, even for <input type="number">.
 * Convert it yourself, and check the result: Number("abc") is NaN.
 * (.valueAsNumber gives a number directly, or NaN if the box is empty.)
 */

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
  event.preventDefault(); // stop the page from reloading

  const name: string = nameInput.value.trim();
  const age: number = Number(ageInput.value);
  // ERROR: const wrongAge: number = ageInput.value; // Error: Type 'string' is not assignable to type 'number'

  if (name === "") {
    showMessage(greetingElement, "Please enter your name.", true);
    return;
  }
  if (Number.isNaN(age) || age <= 0) {
    showMessage(greetingElement, "Please enter a valid age.", true);
    return;
  }

  showMessage(
    greetingElement,
    `Hello ${name}! Next year you will be ${age + 1}.`,
  );
  // If age were still a string, age + 1 would give "201" instead of 21.
  greetForm.reset();
});

// ============================================================
// 6. TYPED DATA AND RENDERING: A TO-DO LIST
// ============================================================
/**
 * A common pattern:
 *   1. describe your data with an interface
 *   2. keep the data in a typed array (the "state")
 *   3. write one render() function that rebuilds the HTML from the data
 *   4. when something changes, update the data, then call render()
 */

interface Todo {
  id: number;
  text: string;
  done: boolean;
}

// A literal type: the filter can only be one of these three values
type Filter = "all" | "active" | "done";

const todoForm = getElement<HTMLFormElement>("#todo-form");
const todoInput = getElement<HTMLInputElement>("#todo-input");
const todoFilter = getElement<HTMLSelectElement>("#todo-filter");
const todoList = getElement<HTMLUListElement>("#todo-list");
const todoSummary = getElement<HTMLParagraphElement>("#todo-summary");

let todos: Todo[] = [
  { id: 1, text: "Learn TypeScript types", done: true },
  { id: 2, text: "Use TypeScript with HTML", done: false },
];

let currentFilter: Filter = "all";
let nextId: number = 3;

// ERROR: todos.push({ id: 4, text: "Missing done" }); // Error: Property 'done' is missing
// ERROR: currentFilter = "finished"; // Error: "finished" is not a Filter

function addTodo(text: string): void {
  todos.push({ id: nextId, text: text, done: false });
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

function getVisibleTodos(list: Todo[], filter: Filter): Todo[] {
  if (filter === "active") return list.filter((todo) => !todo.done);
  if (filter === "done") return list.filter((todo) => todo.done);
  return list;
}

// Returns a new <li> element for one to-do
function createTodoItem(todo: Todo): HTMLLIElement {
  const item = document.createElement("li"); // TypeScript knows this is HTMLLIElement

  const checkbox = document.createElement("input"); // HTMLInputElement
  checkbox.type = "checkbox";
  checkbox.checked = todo.done;
  checkbox.addEventListener("change", () => toggleTodo(todo.id));

  const label = document.createElement("span");
  label.textContent = ` ${todo.text} `;
  if (todo.done) {
    label.classList.add("done");
  }

  const deleteButton = document.createElement("button"); // HTMLButtonElement
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", () => deleteTodo(todo.id));

  item.append(checkbox, label, deleteButton);
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
  // .value is a plain string, but we know it's one of our <option> values.
  // "as" tells TypeScript to trust us (see section 2 for the risk).
  currentFilter = todoFilter.value as Filter;
  render();
});

render();

// ============================================================
// EXERCISES
// ============================================================
/**
 * 1. Add a "+5" button to the counter. What changes in the HTML, and what in the TypeScript?
 *
 * 2. Stop the counter going above 10: disable the +1 button when count is 10.
 *
 * 3. In the greeting form, show a different message for people under 18.
 *
 * 4. Add a "Clear done" button that removes every finished to-do.
 *
 * 5. Add a "priority" property to Todo that can only be "low", "medium" or "high".
 *    Fix every error TypeScript shows you, then display the priority next to each task.
 *
 * 6. Rename an id in index.html (for example "count" to "counter") WITHOUT changing main.ts.
 *    Does TypeScript notice? What happens in the browser? (Open the browser console with F12.)
 */
