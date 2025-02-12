// script.js
document.addEventListener("DOMContentLoaded", () => {
    // Registration Modal Code
    const openModalBtn = document.getElementById("openModalBtn");
    const closeModalBtn = document.getElementById("closeModalBtn");
    const modal = document.getElementById("modal");
    const modalContent = document.getElementById("modalContent");
    const inscriptionForm = document.getElementById("inscriptionForm");
    const confirmation = document.getElementById("confirmation");
  
    // Only set up modal code if the elements exist (i.e., on pages where registration is enabled)
    if (openModalBtn && closeModalBtn && modal && modalContent && inscriptionForm && confirmation) {
      function openModal() {
        modal.classList.remove("hidden");
        modalContent.classList.remove("modal-close");
        modalContent.classList.add("modal-open");
      }
      openModalBtn.addEventListener("click", openModal);
  
      closeModalBtn.addEventListener("click", () => {
        modalContent.classList.remove("modal-open");
        modalContent.classList.add("modal-close");
        setTimeout(() => {
          modal.classList.add("hidden");
          modalContent.classList.remove("modal-close");
          inscriptionForm.classList.remove("hidden");
          confirmation.classList.add("hidden");
          inscriptionForm.reset();
        }, 500);
      });
  
      // Form submission handling for registration
      inscriptionForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const formData = {
          nomPrenom: document.getElementById("nomPrenom").value,
          email: document.getElementById("email").value,
          formation: document.getElementById("formation").value,
          motivation: document.getElementById("motivation").value,
        };
  
        // Use your backend API URL directly
        const API_URL = "https://eventsnexus.onrender.com";
  
        fetch(`${API_URL}/process-form`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
          })
          .then((data) => {
            console.log("Success:", data);
            inscriptionForm.classList.add("hidden");
            confirmation.classList.remove("hidden");
          })
          .catch((error) => {
            console.error("Error:", error);
            // Optionally, display an error message to the user
          });
      });
    }
  
    // Countdown Timer (runs on all pages, but checks if elements exist)
    const targetDate = new Date("Feb 27, 2025 00:00:00").getTime();
    function updateCountdown() {
      const now = new Date().getTime();
      const gap = targetDate - now;
  
      if (gap < 0) {
        if (document.getElementById("days")) document.getElementById("days").innerText = "00";
        if (document.getElementById("hours")) document.getElementById("hours").innerText = "00";
        if (document.getElementById("minutes")) document.getElementById("minutes").innerText = "00";
        if (document.getElementById("seconds")) document.getElementById("seconds").innerText = "00";
        clearInterval(countdownInterval);
        return;
      }
  
      const days = Math.floor(gap / (1000 * 60 * 60 * 24));
      const hours = Math.floor((gap % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((gap % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((gap % (1000 * 60)) / 1000);
  
      if (document.getElementById("days"))
        document.getElementById("days").innerText = days < 10 ? "0" + days : days;
      if (document.getElementById("hours"))
        document.getElementById("hours").innerText = hours < 10 ? "0" + hours : hours;
      if (document.getElementById("minutes"))
        document.getElementById("minutes").innerText = minutes < 10 ? "0" + minutes : minutes;
      if (document.getElementById("seconds"))
        document.getElementById("seconds").innerText = seconds < 10 ? "0" + seconds : seconds;
    }
  
    updateCountdown();
    const countdownInterval = setInterval(updateCountdown, 1000);
  });
  