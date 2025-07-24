const express = require('express');
const router = express.Router();

// Dashboard Main
router.get('/', (req, res) => {
  res.render('dashboard', {
    title: 'Dashboard',
    sidebarItems: ['home', 'folder', 'briefcase', 'users', 'user', 'slash', 'eye', 'message-circle', 'file-text', 'user-x', 'bar-chart-2', 'settings', 'help-circle', 'mail'],
    stats: [
      { icon: 'folder', label: 'Projects', value: 3 },
      { icon: 'briefcase', label: 'Jobs', value: 3456 },
      { icon: 'users', label: 'Employers', value: 56 },
      { icon: 'user', label: 'Craftmen', value: 256 },
      { icon: 'slash', label: 'Blacklisted', value: 256 },
      { icon: 'eye', label: 'Monitor', value: 256 }
    ],
    calendarDays: ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],
    calendarDates: ['26','27','28','29','30','31','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31','01','02','03','04','05'],
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

// Subpages for each sidebar link:
router.get('/projects', (req, res) => {
  res.render('projects', { title: 'Projects' });
});

router.get('/jobs', (req, res) => {
  res.render('jobs', { title: 'Jobs' });
});

router.get('/employers', (req, res) => {
  res.render('employers', { title: 'Employers' });
});

router.get('/craftmen', (req, res) => {
  res.render('craftmen', { title: 'Craftmen' });
});

router.get('/blacklist', (req, res) => {
  res.render('blacklist', { title: 'Blacklisted Users' });
});

router.get('/monitor', (req, res) => {
  res.render('monitor', { title: 'Job Monitor' });
});

router.get('/messages', (req, res) => {
  res.render('messages', { title: 'Messages' });
});

router.get('/reports', (req, res) => {
  res.render('reports', { title: 'Reports' });
});

router.get('/analytics', (req, res) => {
  res.render('analytics', { title: 'Analytics' });
});

router.get('/settings', (req, res) => {
  res.render('settings', { title: 'Settings' });
});

router.get('/help', (req, res) => {
  res.render('help', { title: 'Help Center' });
});

router.get('/contact', (req, res) => {
  res.render('contact', { title: 'Contact Us' });
});

module.exports = router;
