document.addEventListener('DOMContentLoaded', () => {
  // Handle Recover buttons
  document.querySelectorAll('button').forEach(button => {
    const label = button.textContent.trim().toLowerCase();

    button.addEventListener('click', () => {
      const row = button.closest('tr');

      if (label === 'recover' && row) {
        const name = row.children[1].textContent.trim();
        alert(`Recovered ${name} from blacklist.`);
        // TODO: Send recovery request to backend
        // fetch('/recover-user', { method: 'POST', body: JSON.stringify({ name }) })
      }

      if (label === 'delete' && row) {
        const name = row.children[1].textContent.trim();
        const confirmDelete = confirm(`Are you sure you want to delete ${name} permanently?`);
        if (confirmDelete) {
          row.remove(); // Just removes from the DOM
          alert(`${name} deleted from blacklist.`);
          // TODO: Send deletion request to backend
          // fetch('/delete-user', { method: 'DELETE', body: JSON.stringify({ name }) })
        }
      }

      if (label === 'add to black list') {
        alert('Open modal or form to add a user to blacklist.');
        // TODO: Trigger modal or redirect to add page
      }

      if (label === 'export to pdf') {
        alert('Exporting blacklist table to PDF...');
        // TODO: Implement PDF export logic
      }
    });
  });
});
