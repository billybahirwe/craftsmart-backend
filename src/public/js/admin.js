document.getElementById("userForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const adminAction = {
    type: document.getElementById("userType").value,
    action: document.getElementById("action").value,
    userId: document.getElementById("userId").value,
    details: document.getElementById("details").value,
  };

  console.log("Admin Action:", adminAction);
});
