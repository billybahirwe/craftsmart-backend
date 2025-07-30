// public/js/messages.js (for example)

// Initialize Feather icons on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  if (typeof feather !== 'undefined') {
    feather.replace();
  }

  // Initialize dark mode toggle checkbox state
  const darkToggle = document.getElementById('darkToggle');
  if (darkToggle) {
    darkToggle.checked = document.documentElement.classList.contains('dark');
    darkToggle.addEventListener('change', () => {
      document.documentElement.classList.toggle('dark', darkToggle.checked);
    });
  }

  // Message send button logic
  const sendBtn = document.querySelector('button.ml-4.bg-blue-600');
  const messageInput = document.querySelector('input[placeholder="Type your message here..."]');
  const chatArea = document.querySelector('.flex-1.overflow-y-auto');

  if (sendBtn && messageInput && chatArea) {
    sendBtn.addEventListener('click', () => {
      const msgText = messageInput.value.trim();
      if (!msgText) return;

      // Create new message block elements
      const messageWrapper = document.createElement('div');
      messageWrapper.classList.add('text-right');

      const sender = document.createElement('p');
      sender.className = 'text-sm text-gray-500 dark:text-gray-400';
      sender.textContent = 'You';

      const messageBubble = document.createElement('div');
      messageBubble.className = 'bg-blue-600 text-white p-3 rounded-lg inline-block';
      messageBubble.textContent = msgText;

      const timestamp = document.createElement('p');
      timestamp.className = 'text-xs text-gray-400 mt-1';
      const now = new Date();
      timestamp.textContent = `Today, ${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}pm`;

      messageWrapper.appendChild(sender);
      messageWrapper.appendChild(messageBubble);
      messageWrapper.appendChild(timestamp);

      chatArea.appendChild(messageWrapper);

      // Scroll chat area to bottom
      chatArea.scrollTop = chatArea.scrollHeight;

      // Clear input
      messageInput.value = '';
      messageInput.focus();
    });

    // Optional: also send message on Enter key in input
    messageInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        sendBtn.click();
      }
    });
  }
});
