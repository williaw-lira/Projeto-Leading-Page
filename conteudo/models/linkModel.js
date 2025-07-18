const fs = require('fs');
const FILE = './links.json';

function readData() {
  return JSON.parse(fs.readFileSync(FILE, 'utf8'));
}

function writeData(data) {
  fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
}

function addLink(sectionName, title, url) {
  const data = readData();
  const section = data.find(s => s.section === sectionName);
  if (!section) return null;

  const newId = Date.now();
  section.items.push({ id: newId, title, url });
  writeData(data);
  return data;
}

function addSection(name) {
  const data = readData();
  data.push({ section: name, items: [] });
  writeData(data);
  return data;
}

function updateLink(id, title, url) {
  const data = readData();
  data.forEach(section => {
    section.items.forEach(link => {
      if (link.id === id) {
        link.title = title;
        link.url = url;
      }
    });
  });
  writeData(data);
  return data;
}

function deleteLink(id) {
  const data = readData();
  data.forEach(section => {
    section.items = section.items.filter(link => link.id !== id);
  });
  writeData(data);
  return data;
}

function deleteSection(name) {
  const data = readData();
  const newData = data.filter(section => section.section !== name);
  writeData(newData);
  return newData;
}

module.exports = {
  readData,
  addLink,
  addSection,
  updateLink,
  deleteLink,
  deleteSection
};
