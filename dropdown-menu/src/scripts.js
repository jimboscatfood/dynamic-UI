export default dropdownMenu;

function dropdownMenu() {
  const dropdown = document.querySelector(".dropdown-menu");
  const dropdownBtn = document.querySelector(".dropdown-button");
  const dropdownContent = document.querySelector(".dropdown-content");

  function chanegVisibility() {
    dropdownContent.classList.toggle("hidden");
  }

  dropdownBtn.addEventListener("mouseenter", (e) => {
    chanegVisibility(e.target);
  });

  dropdown.addEventListener("mouseleave", (e) => {
    chanegVisibility(e.target);
  });
}
