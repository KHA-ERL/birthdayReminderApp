document.addEventListener("DOMContentLoaded", function () {
  // Load all users on page load
  fetchUsers();

  // Handle form submission
  document
    .getElementById("birthdayForm")
    .addEventListener("submit", function (e) {
      e.preventDefault();

      const username = document.getElementById("username").value;
      const email = document.getElementById("email").value;
      const dateOfBirth = document.getElementById("dateOfBirth").value;

      fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, dateOfBirth }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
          // Reset form
          document.getElementById("birthdayForm").reset();
          // Reload users list
          fetchUsers();
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("Error saving user. Please try again.");
        });
    });
});

function fetchUsers() {
  fetch("/api/users")
    .then((response) => response.json())
    .then((users) => {
      const usersList = document.getElementById("usersList");
      usersList.innerHTML = "";

      users.forEach((user) => {
        const dob = new Date(user.dateOfBirth);
        const formattedDob = dob.toLocaleDateString();

        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${user.username}</td>
            <td>${user.email}</td>
            <td>${formattedDob}</td>
          `;
        usersList.appendChild(row);
      });
    })
    .catch((error) => {
      console.error("Error fetching users:", error);
    });
}
