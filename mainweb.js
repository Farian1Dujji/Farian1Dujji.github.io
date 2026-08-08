const previewCard = document.getElementById('universal-preview-card');

document.querySelectorAll('.hover-preview').forEach(link => {
  // When mouse enters the word
  link.addEventListener('mouseenter', (e) => {
    const text = link.getAttribute('data-preview');
    previewCard.innerHTML = text;
    previewCard.style.display = 'block';
  });

  // When mouse moves across the word, track its coordinates
  link.addEventListener('mousemove', (e) => {
    previewCard.style.left = (e.pageX + 15) + 'px'; // 15px to the right of cursor
    previewCard.style.top = (e.pageY + 15) + 'px';  // 15px below the cursor
  });

  // When mouse leaves the word
  link.addEventListener('mouseleave', () => {
    previewCard.style.display = 'none';
  });
});

const wikiCard = document.getElementById('wiki-preview-card');

document.querySelectorAll('.wiki-hover-link').forEach(link => {
  link.addEventListener('mouseenter', async () => {
    // 1. Get the article title from the end of the Wikipedia link URL
    const urlParts = link.href.split('/wiki/');
    if (urlParts.length < 2) return;
    const title = urlParts[1];

    try {
      // 2. Query the official Wikipedia summary API endpoint
      const response = await fetch(`https://wikipedia.org`); 
      // Note: Using the standard direct summaries route for high reliability:
      const apiURL = `https://wikipedia.org{title}`;
      const apiResponse = await fetch(apiURL);
      const data = await apiResponse.json();

      // 3. Assemble the response into the card using title, extract, and thumbnail
      let imageHtml = '';
      if (data.thumbnail && data.thumbnail.source) {
        imageHtml = `<img src="${data.thumbnail.source}" alt="${data.title}">`;
      }

      wikiCard.innerHTML = `
        <div class="wiki-card-content">
          <div class="wiki-card-text">
            <h3>${data.title}</h3>
            <p>${data.extract}</p>
          </div>
          ${imageHtml}
        </div>
      `;
      wikiCard.style.display = 'block';

    } catch (error) {
      console.error("Failed to load data from Wikipedia:", error);
    }
  });

  // Keep tracking mouse pointer placement
  link.addEventListener('mousemove', (e) => {
    wikiCard.style.left = (e.pageX + 15) + 'px';
    wikiCard.style.top = (e.pageY + 15) + 'px';
  });

  // Clean the layout card structure on leave
  link.addEventListener('mouseleave', () => {
    wikiCard.style.display = 'none';
    wikiCard.innerHTML = '';
  });
});

