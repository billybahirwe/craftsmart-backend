document.getElementById('deleteForm').addEventListener('submit', function(e) {
      e.preventDefault();
      const userId = document.getElementById('deleteId').value;
      fetch(`/blacklist/${userId}`, {
        method: 'DELETE',
      })
      .then(res => res.json())
      .then(data => alert(JSON.stringify(data)))
      .catch(err => alert('Error: ' + err));
    });