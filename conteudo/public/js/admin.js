fetch('/api/links')
  .then(res => res.json())
  .then(data => {
    // Popular selects para adicionar link
    const select = document.getElementById('sectionSelect');
    data.forEach(section => {
      const opt = document.createElement('option');
      opt.value = section.section;
      opt.textContent = section.section;
      select.appendChild(opt);
    });

    // Popular selects para remover link
    const removeSectionSelect = document.getElementById('removeSectionSelect');
    const removeLinkSelect = document.getElementById('removeLinkSelect');
    data.forEach(section => {
      const opt = document.createElement('option');
      opt.value = section.section;
      opt.textContent = section.section;
      removeSectionSelect.appendChild(opt);
    });

    // Atualiza os links quando muda a seção
    removeSectionSelect.addEventListener('change', function() {
      updateRemoveLinks(data, this.value);
    });
    // Inicializa os links
    if (data.length > 0) {
      updateRemoveLinks(data, data[0].section);
    }

    // Popular select para remover seção
    const removeSectionOnlySelect = document.getElementById('removeSectionOnlySelect');
    data.forEach(section => {
      const opt = document.createElement('option');
      opt.value = section.section;
      opt.textContent = section.section;
      removeSectionOnlySelect.appendChild(opt);
    });
  });

function updateRemoveLinks(data, sectionName) {
  const removeLinkSelect = document.getElementById('removeLinkSelect');
  removeLinkSelect.innerHTML = '';
  const section = data.find(s => s.section === sectionName);
  if (section) {
    section.items.forEach(link => {
      const opt = document.createElement('option');
      opt.value = link.id;
      opt.textContent = link.title;
      removeLinkSelect.appendChild(opt);
    });
  }
}

function addSection() {
  const name = document.getElementById('sectionName').value;
  fetch('/api/section', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name })
  }).then(() => location.reload());
}

function addLink() {
  const section = document.getElementById('sectionSelect').value;
  const title = document.getElementById('linkTitle').value;
  const url = document.getElementById('linkUrl').value;

  fetch('/api/links', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ section, title, url })
  }).then(() => location.reload());
}

function removeLink() {
  const id = document.getElementById('removeLinkSelect').value;
  fetch(`/api/links/${id}`, {
    method: 'DELETE'
  }).then(() => location.reload());
}

function removeSection() {
  const section = document.getElementById('removeSectionOnlySelect').value;
  fetch(`/api/section/${encodeURIComponent(section)}`, {
    method: 'DELETE'
  }).then(() => location.reload());
}

function addLink() {
  const section = document.getElementById('sectionSelect').value;
  const title = document.getElementById('linkTitle').value;
  const url = document.getElementById('linkUrl').value;
  const image = document.getElementById('linkImage').value;

  if (!title || !url) {
    alert('Título e URL são obrigatórios.');
    return;
  }

  fetch('/api/addLink', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      section,
      link: {
        id: Date.now(),
        title,
        url,
        image
      }
    })
  })
  .then(res => res.json())
  .then(data => {
    alert('Link adicionado!');
    location.reload();
  });
}
