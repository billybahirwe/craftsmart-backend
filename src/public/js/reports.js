// public/js/dashboard.js

document.addEventListener('DOMContentLoaded', () => {
  // Feather icons
  if (typeof feather !== 'undefined') {
    feather.replace();
  }

  // Dark Mode Toggle
  const darkToggle = document.getElementById('darkToggle');
  const html = document.documentElement;
  const body = document.getElementById('body');
  const sidebar = document.getElementById('sidebar');
  const topbar = document.getElementById('topbar');
  const main = document.getElementById('main');

  function applyDarkMode(isDark) {
    if (isDark) {
      html.classList.add('dark');
      body.className = 'bg-gray-900 text-white transition-colors duration-300';
      sidebar.className = 'w-64 bg-gray-800 p-4 border-r border-gray-700 shadow-sm overflow-y-auto';
      topbar.className = 'bg-gray-800 p-4 rounded shadow flex justify-between items-center';
    } else {
      html.classList.remove('dark');
      body.className = 'bg-white text-gray-800 transition-colors duration-300';
      sidebar.className = 'w-64 bg-white p-4 border-r border-gray-200 shadow-sm overflow-y-auto';
      topbar.className = 'bg-white p-4 rounded shadow flex justify-between items-center';
    }
  }

  if (darkToggle) {
    // Initialize state
    darkToggle.checked = html.classList.contains('dark');
    // Add event listener
    darkToggle.addEventListener('change', () => {
      applyDarkMode(darkToggle.checked);
    });
  }

  // Handle PDF export (example only - replace with real logic)
  const exportBtn = document.querySelector('button.bg-green-600');
  if (exportBtn) {
    exportBtn.addEventListener('click', () => {
      alert('PDF export triggered (functionality not implemented)');
      // Placeholder - implement actual export logic as needed
    });
  }

  // Handle Edit and Delete buttons
  document.querySelectorAll('button').forEach((btn) => {
    if (btn.textContent.trim() === 'Edit') {
      btn.addEventListener('click', () => {
        alert('Edit action triggered');
        // Implement edit functionality here
      });
    }

    if (btn.textContent.trim() === 'Delete') {
      btn.addEventListener('click', () => {
        if (confirm('Are you sure you want to delete this item?')) {
          // Implement delete logic here
          alert('Item deleted (placeholder)');
        }
      });
    }
  });
});
