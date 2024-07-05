document.addEventListener("DOMContentLoaded", () => {
  const toc = document.getElementById("toc");
  const content = document.getElementById("content");
  const headings = content.querySelectorAll("h1, h2, h3, h4, h5, h6");
  const btnToExpandToc = document.querySelector(".expand-toc");
  const tocItems = [];

  let counters = [0, 0, 0, 0, 0, 0]; // For numbering headings

  headings.forEach((heading) => {
    const level = parseInt(heading.tagName.charAt(1)) - 1; // get the number of the heading tag and reduce by 1. eg. from h1 get 1 and make it 0.
    counters[level] += 1;
    for (let i = level + 1; i < counters.length; i++) counters[i] = 0; // Reset lower levels

    const number = counters
      .slice(0, level + 1)
      .filter((num) => num > 0)
      .join(".");

    // Set heading ID for linking and class for generic styling
    const headingId = `heading-${number.split(".").join("-")}`;
    heading.id = headingId;
    heading.classList.add(`heading-${level + 1}`);
    if (content.classList.contains("add-index")) {
      heading.textContent = `${number} ${heading.textContent}`;
    }

    const tocItem = document.createElement("a");
    tocItem.href = `#${headingId}`;
    if (toc.classList.contains("add-index")) {
      tocItem.textContent = `${number} ${heading.textContent}`;
    } else {
      tocItem.textContent = heading.textContent;
    }
    tocItem.style.marginLeft = `${level * 10}px`; // Indent subheadings
    tocItem.classList.add(`heading-${level + 1}`); // for generic stylings
    toc.appendChild(tocItem);

    tocItems.push(tocItem);
  });

  // Smooth scroll behavior
  toc.addEventListener("click", (event) => {
    if (event.target.tagName.toLowerCase() === "a") {
      event.preventDefault();
      // Remove active class from all links
      const links = toc.querySelectorAll("a");
      links.forEach((link) => link.classList.remove("active"));

      // Add active class to the clicked link
      event.target.classList.add("active");
      document.querySelector(event.target.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
    }
  });

  // expand toc on mobile
  btnToExpandToc.addEventListener("click", function () {
    toc.style.display = "block";
    btnToExpandToc.textContent = "X";
    if (btnToExpandToc.getAttribute("id") === "close") {
      toc.style.display = "none";
      btnToExpandToc.innerHTML = "&uarr;";
      btnToExpandToc.id = "";
    } else {
      btnToExpandToc.id = "close";
    }
  });
});
