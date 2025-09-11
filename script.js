const form = document.querySelector(".login-form");
const inputs = form.querySelectorAll("input");
const button = document.getElementById("animated-button");
const icon = document.getElementById("icon");

// Error message (only created once)
let errorMsg = document.createElement("p");
errorMsg.style.color = "red";
errorMsg.style.fontSize = "0.9rem";
errorMsg.style.marginTop = "5px";
errorMsg.style.display = "none";
form.appendChild(errorMsg);

// Floating label + persistent focus handling
inputs.forEach(input => {
  const label = input.nextElementSibling;

  function checkValue() {
    if (input.value.trim() !== "") {
      label.classList.add("active");
      input.classList.add("filled"); // keep glow style after blur
    } else {
      label.classList.remove("active");
      input.classList.remove("filled");
    }
  }

  input.addEventListener("input", checkValue);
  input.addEventListener("blur", checkValue);
  checkValue(); // check on load
});

// Button click + animation + reset
button.addEventListener("click", () => {
  // 1️⃣ Check if any input is empty
  let isValid = true;
  inputs.forEach(input => {
    if (!input.value.trim()) isValid = false;
  });

  if (!isValid) {
    errorMsg.innerText = "⚠️ Please fill out all fields before submitting.";
    errorMsg.style.display = "block";
    inputs[0].focus();
    return;
  } else {
    errorMsg.style.display = "none";
  }

  // 2️⃣ Trigger button animation
  button.classList.add("clicked", "hold-hover");

  // 3️⃣ Function to reset everything AFTER animation
  const resetClasses = () => {
    // Remove animation + hover lock
    button.classList.remove("clicked", "hold-hover");
    button.blur(); // fixes hover stuck on mobile

    // Reset all inputs + labels
    inputs.forEach(input => {
      input.value = "";
      input.classList.remove("filled");
      const label = input.nextElementSibling;
      if (label) label.classList.remove("active");
    });

    // Remove event listeners to avoid duplicates
    icon.removeEventListener("animationend", resetClasses);
    button.removeEventListener("animationend", resetClasses);
  };

  // 4️⃣ Listen for animation end
  icon.addEventListener("animationend", resetClasses);
  button.addEventListener("animationend", resetClasses);

  // 5️⃣ Safety fallback (if animationend is missed)
  setTimeout(resetClasses, 2000);
});