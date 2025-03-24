// Get references to the input, button, and display area
const textInput = document.getElementById('textInput');
const submitButton = document.getElementById('submitButton');
const displayArea = document.getElementById('displayArea');

let selectedChars = []; // Store selected characters
let draggedChar = null; // Currently dragged character
let draggedIndex = null; // Index of dragged character

// Display the input text as individual characters
submitButton.addEventListener('click', () => {
  const text = textInput.value.trim();
  displayArea.innerHTML = ''; // Clear previous content
  selectedChars = []; // Reset selected characters

  // Create a span for each character
  text.split('').forEach((char, index) => {
    const span = document.createElement('span');
    span.textContent = char;
    span.className = 'char';
    span.draggable = true; // Make characters draggable
    span.setAttribute('data-index', index);
    displayArea.appendChild(span);
  });
});

// Handle selection of characters
displayArea.addEventListener('click', (event) => {
  if (event.target.classList.contains('char')) {
    if (event.ctrlKey) {
      // Ctrl + Click for multi-select
      event.target.classList.toggle('selected');
      const charIndex = event.target.getAttribute('data-index');

      if (event.target.classList.contains('selected')) {
        selectedChars.push(charIndex);
      } else {
        selectedChars = selectedChars.filter(index => index !== charIndex);
      }
    } else {
      // Single click clears other selections
      document.querySelectorAll('.char').forEach(char => char.classList.remove('selected'));
      selectedChars = [];
      event.target.classList.add('selected');
      selectedChars.push(event.target.getAttribute('data-index'));
    }
  }
});

// Handle drag start
displayArea.addEventListener('dragstart', (event) => {
  if (event.target.classList.contains('char')) {
    draggedChar = event.target;
    draggedIndex = draggedChar.getAttribute('data-index');
    event.target.classList.add('dragging'); // Add visual indication
  }
});

// Handle drag end
displayArea.addEventListener('dragend', (event) => {
  if (event.target.classList.contains('char')) {
    event.target.classList.remove('dragging'); // Remove visual indication
    draggedChar = null;
    draggedIndex = null;
  }
});

// Handle drag over
displayArea.addEventListener('dragover', (event) => {
  event.preventDefault(); // Allow drop
  const target = event.target;

  if (target.classList.contains('char') && target !== draggedChar) {
    const targetIndex = target.getAttribute('data-index');

    // Swap the characters' content
    const draggedText = draggedChar.textContent;
    draggedChar.textContent = target.textContent;
    target.textContent = draggedText;

    // Update the data-index attributes
    draggedChar.setAttribute('data-index', targetIndex);
    target.setAttribute('data-index', draggedIndex);
  }
});
