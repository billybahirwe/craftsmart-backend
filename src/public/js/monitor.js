document.addEventListener('DOMContentLoaded', () => {
  // Feather icons already replaced via feather.replace()

  // Export to PDF
  const exportBtn = document.getElementById('exportPDF');
  if (exportBtn) {
    exportBtn.addEventListener('click', () => {
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF();
      doc.text('Job Monitor Report', 10, 10);
      doc.save('jobs-report.pdf');
    });
  }

  // Search functionality (example)
  const searchInput = document.getElementById('searchInput');
  const tableRows = document.querySelectorAll('#jobsTable tbody tr');

  if (searchInput && tableRows.length) {
    searchInput.addEventListener('input', () => {
      const val = searchInput.value.toLowerCase();
      tableRows.forEach(row => {
        const match = row.textContent.toLowerCase().includes(val);
        row.style.display = match ? '' : 'none';
      });
    });
  }

  // Mode switch toggle (dark/light mode placeholder)
  const modeSwitch = document.getElementById('modeSwitch');
  if (modeSwitch) {
    modeSwitch.addEventListener('change', () => {
      document.body.classList.toggle('bg-gray-900');
      document.body.classList.toggle('text-white');
    });
  }
});
