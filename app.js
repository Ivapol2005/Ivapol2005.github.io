document.addEventListener('DOMContentLoaded', () => {
    async function loadContent() {
        try {
            const response = await fetch('content.md');
            const markdownText = await response.text();

            // Convert markdown to HTML
            const htmlContent = marked.parse(markdownText);

            // Insert the content into <main>
            const main = document.querySelector('main');
            main.innerHTML = htmlContent;

            // Generate Table of Contents
            generateTOC();

        } catch (error) {
            console.error('Error loading content:', error);
            document.querySelector('main').innerHTML = '<p>Failed to load content.</p>';
        }
    }

    function generateTOC() {
      const tocList = document.querySelector('#table-of-contents ul');
      tocList.innerHTML = '';

      const headings = document.querySelectorAll('main h1, main h2, main h3');

      headings.forEach(heading => {
          if (!heading.id) {
              heading.id = heading.textContent.trim()
                  .toLowerCase()
                  .replace(/\s+/g, '-')
                  .replace(/[^\w-]/g, '');
          }

          const li = document.createElement('li');

          // Indent h2 and h3 for hierarchy (adjust as needed)
          if (heading.tagName.toLowerCase() === 'h2') {
              li.style.marginLeft = '10px';
          } else if (heading.tagName.toLowerCase() === 'h3') {
              li.style.marginLeft = '20px';
          }

          const a = document.createElement('a');
          a.href = `#${heading.id}`;
          a.textContent = heading.textContent;

          li.appendChild(a);
          tocList.appendChild(li);
      });
  }

    loadContent();
});
