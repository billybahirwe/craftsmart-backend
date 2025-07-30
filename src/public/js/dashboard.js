// dash.js

document.addEventListener("DOMContentLoaded", () => {
  feather.replace();

  const userRole = "Employer"; // Simulated role

  const state = {
    role: userRole,
    stats: {
      totalProjects: 56,
      ongoing: 12,
      completed: 44
    },
    messages: [
      { name: "CraftBot", message: "Your report is ready.", color: "blue" },
      { name: "John", message: "Hey, call me when free.", color: "green" }
    ],
    blacklist: [
      { name: "FakeUser1", reason: "Fraudulent invoices" },
      { name: "WorkerX", reason: "No-show on site" }
    ],
    radarData: {
      labels: ['Skill', 'Efficiency', 'Attitude', 'Communication', 'Quality', 'Safety', 'Experience', 'Feedback'],
      craftsmanScores: [80, 75, 85, 70, 90, 88, 75, 82],
      averageScores: [70, 68, 72, 65, 75, 80, 70, 77]
    }
  };

  function updateStats() {
    const statMap = {
      totalProjects: "totalProjects",
      ongoingProjects: "ongoing",
      completedProjects: "completed"
    };
    Object.entries(statMap).forEach(([domKey, stateKey]) => {
      const el = document.querySelector(`[data-type="${domKey}"] p`);
      if (el) el.textContent = state.stats[stateKey];
    });
  }

  function updateMessages() {
    const container = document.querySelector("#messages");
    if (!container) return;
    container.innerHTML = "";
    state.messages.forEach(msg => {
      container.innerHTML += `
        <div class="flex items-start gap-3">
          <div class="w-8 h-8 bg-${msg.color}-500 text-white rounded-full flex items-center justify-center">${msg.name[0]}</div>
          <div>
            <p class="font-semibold">${msg.name}</p>
            <p class="text-sm text-gray-600">${msg.message}</p>
          </div>
        </div>`;
    });
  }

  function updateBlacklist() {
    const list = document.querySelector("#blacklist");
    if (!list) return;
    list.innerHTML = "";
    state.blacklist.forEach(entry => {
      list.innerHTML += `<li><strong>${entry.name}</strong>: ${entry.reason}</li>`;
    });
  }

  function loadRadarChart() {
    const ctx = document.getElementById("radarChart");
    if (!ctx) return;

    new Chart(ctx, {
      type: 'radar',
      data: {
        labels: state.radarData.labels,
        datasets: [
          {
            label: 'Craftsman',
            data: state.radarData.craftsmanScores,
            fill: false,
            borderColor: 'red',
            pointBackgroundColor: 'red',
          },
          {
            label: 'Platform Avg',
            data: state.radarData.averageScores,
            backgroundColor: 'rgba(59,130,246,0.2)',
            borderColor: 'blue',
            pointBackgroundColor: 'blue'
          }
        ]
      },
      options: {
        responsive: true,
        elements: {
          line: {
            tension: 0.2
          }
        },
        plugins: {
          legend: { position: 'top' }
        }
      }
    });
  }

  function toggleDarkMode(checkbox) {
    const html = document.documentElement;
    const body = document.getElementById('body');
    const sidebar = document.getElementById('sidebar');
    const topbar = document.getElementById('topbar');
    const allCards = document.querySelectorAll('.rounded.shadow');

    if (checkbox.checked) {
      html.classList.add('dark');
      body.className = 'bg-gray-900 text-white';
      sidebar.className = 'w-64 bg-gray-800 p-4 border-r border-gray-700 shadow-sm overflow-y-auto';
      topbar.className = 'bg-gray-800 p-4 rounded shadow flex justify-between items-center';
      allCards.forEach(card => {
        card.classList.remove('bg-white');
        card.classList.add('bg-gray-700', 'text-white');
      });
    } else {
      html.classList.remove('dark');
      body.className = 'bg-white text-gray-800';
      sidebar.className = 'w-64 bg-white p-4 border-r border-gray-200 shadow-sm overflow-y-auto';
      topbar.className = 'bg-white p-4 rounded shadow flex justify-between items-center';
      allCards.forEach(card => {
        card.classList.remove('bg-gray-700', 'text-white');
        card.classList.add('bg-white');
      });
    }
  }

  updateStats();
  updateMessages();
  updateBlacklist();
  loadRadarChart();

  window.toggleDarkMode = toggleDarkMode;
});
