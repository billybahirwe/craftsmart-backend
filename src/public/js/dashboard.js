// routes/dashboard.routes.js
const express = require('express');
const router = express.Router();

// GET /dashboard
router.get('/', (req, res) => {
  // Check if user is logged in via session
  if (!req.session?.isLoggedIn) {
    return res.redirect('/admin-login');
  }

  // Render the dashboard view with necessary data
  res.render('dashboard', {
    adminUser: req.session.adminUser || 'Admin',
    sidebarItems: [
      'home', 'folder', 'briefcase', 'users', 'user', 'slash', 'eye',
      'message-circle', 'file-text', 'user-x', 'bar-chart-2', 'settings',
      'help-circle', 'mail'
    ],
    stats: [
      { icon: 'folder', label: 'Projects', value: 3 },
      { icon: 'briefcase', label: 'Jobs', value: 3456 },
      { icon: 'users', label: 'Employers', value: 56 },
      { icon: 'user', label: 'Craftmen', value: 256 },
      { icon: 'slash', label: 'Blacklisted', value: 256 },
      { icon: 'eye', label: 'Monitor', value: 256 }
    ],
    calendarDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    calendarDates: [
      '26','27','28','29','30','31','01','02','03','04','05','06','07','08','09',
      '10','11','12','13','14','15','16','17','18','19','20','21','22','23','24',
      '25','26','27','28','29','30','31','01','02','03','04','05'
    ],
    notifications: [
      { title: 'System maintenance at 3PM', time: '5m ago' },
      { title: 'New user sign-up', time: '15m ago' }
    ],
    messages: [
      { initial: 'C', name: 'CraftBot', text: 'Your report is ready' },
      { initial: 'J', name: 'John', text: 'Hey, call me when free' }
    ]
  });
});

module.exports = router;
