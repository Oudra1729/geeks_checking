// Ensure JS runs after DOM is ready
document.addEventListener('DOMContentLoaded', () => {

  /* ===== Exercise 1: Select a kind of Music ===== */
  const genresSelect = document.getElementById('genres');
  document.getElementById('showGenre').addEventListener('click', () => {
      alert('Selected Genre: ' + genresSelect.value);
  });

  // Add "Classic" option and select it by default
  const newOption = document.createElement('option');
  newOption.value = 'classic';
  newOption.text = 'Classic';
  newOption.selected = true;
  genresSelect.appendChild(newOption);

  /* ===== Exercise 2: Delete colors ===== */
  function removecolor() {
      const select = document.getElementById('colorSelect');
      const selectedIndex = select.selectedIndex;
      if (selectedIndex >= 0) {
          select.remove(selectedIndex);
      }
  }
  document.getElementById('removeBtn').addEventListener('click', removecolor);

  /* ===== Exercise 3: Shopping List ===== */
  let shoppingList = [];

  const root = document.getElementById('root');

  const form = document.createElement('form');

  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = 'Enter an item';

  const addButton = document.createElement('button');
  addButton.type = 'button';
  addButton.textContent = 'Add Item';

  const clearButton = document.createElement('button');
  clearButton.type = 'button';
  clearButton.textContent = 'Clear All';

  form.appendChild(input);
  form.appendChild(addButton);
  form.appendChild(clearButton);
  root.appendChild(form);

  const ul = document.createElement('ul');
  root.appendChild(ul);

  function addItem() {
      const value = input.value.trim();
      if (value) {
          shoppingList.push(value);
          renderList();
          input.value = '';
      }
  }

  function clearAll() {
      shoppingList = [];
      renderList();
  }

  function renderList() {
      ul.innerHTML = '';
      shoppingList.forEach(item => {
          const li = document.createElement('li');
          li.textContent = item;
          ul.appendChild(li);
      });
  }

  addButton.addEventListener('click', addItem);
  clearButton.addEventListener('click', clearAll);

});
