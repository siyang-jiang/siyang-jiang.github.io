(() => {
  const table = document.getElementById('tbPublications');
  const body = table.tBodies[0];
  const papers = Array.from(body.rows);
  const links = document.querySelectorAll('[data-publication-view]');
  const note = document.getElementById('publication-note');

  function updateView() {
    const representative = window.location.hash === '#representative';
    const view = representative ? 'representative' : 'selected';
    const ordered = representative
      ? [...papers].sort((a, b) => Number(b.dataset.year) - Number(a.dataset.year))
      : papers;

    ordered.forEach(paper => {
      paper.hidden = !representative && paper.dataset.selected !== 'true';
      body.appendChild(paper);
    });

    links.forEach(link => {
      if (link.dataset.publicationView === view) {
        link.setAttribute('aria-current', 'page');
      } else {
        link.removeAttribute('aria-current');
      }
    });

    table.setAttribute('aria-label', representative
      ? 'First-author and co-first-author publications, newest first'
      : 'Selected publications');
    note.textContent = representative
      ? 'First-author and co-first-author papers, newest first. * denotes equal contribution.'
      : '* denotes equal contribution';
  }

  window.addEventListener('hashchange', updateView);
  updateView();
})();
