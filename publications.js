(() => {
  const table = document.getElementById('tbPublications');
  const body = table.tBodies[0];
  const papers = Array.from(body.rows);
  const toggle = document.getElementById('first-author-toggle');

  function updateView() {
    const representative = window.location.hash === '#representative';
    toggle.checked = representative;
    const ordered = representative
      ? [...papers].sort((a, b) => Number(b.dataset.year) - Number(a.dataset.year))
      : papers;

    ordered.forEach(paper => {
      paper.hidden = !representative && paper.dataset.selected !== 'true';
      body.appendChild(paper);
    });

    table.setAttribute('aria-label', representative
      ? 'First-author and co-first-author publications, newest first'
      : 'Selected papers');
  }

  toggle.addEventListener('change', () => {
    window.location.hash = toggle.checked ? 'representative' : 'selected';
  });
  window.addEventListener('hashchange', updateView);
  updateView();
})();
