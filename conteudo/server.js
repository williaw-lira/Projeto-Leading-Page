const express = require('express');
const app = express();
const linkController = require('./controllers/linkController');
const path = require('path');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/links', linkController.getLinks);
app.post('/api/links', linkController.addLink);
app.post('/api/section', linkController.addSection);
app.put('/api/links/:id', linkController.updateLink);
app.delete('/api/links/:id', linkController.deleteLink);
app.delete('/api/section/:name', linkController.deleteSection);

app.listen(3290, () => console.log('Servidor rodando em http://localhost:3290'));
