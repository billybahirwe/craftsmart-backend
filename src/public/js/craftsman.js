document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("profileForm");

  if (!form) {
    console.error("❌ Form not found in DOM");
    return;
  }

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const selectedSkills = Array.from(
      document.getElementById("skills").selectedOptions
    ).map((opt) => opt.value);

    const profile = {
      name: document.getElementById("name").value.trim(),
      phone: document.getElementById("phone").value.trim(),
      location: document.getElementById("location").value.trim(),
      bio: document.getElementById("bio").value.trim(),
      skills: selectedSkills,
    };

    try {
      const res = await fetch("/api/craftsman/dashboard", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profile),
      });

      if (res.ok) {
        alert("✅ Profile saved successfully!");
        form.reset();
      } else {
        const err = await res.text();
        console.error("❌ Server responded with error:", err);
        alert("❌ Failed to save profile. Check the console for details.");
      }
    } catch (error) {
      console.error("❌ Network or fetch error:", error);
      alert("❌ Error submitting profile.");
    }
  });
});
