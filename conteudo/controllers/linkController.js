const model = require('../models/linkModel');

exports.getLinks = (req, res) => {
  const data = model.readData();
  res.json(data);
};

exports.addLink = (req, res) => {
  const { section, title, url } = req.body;
  const updated = model.addLink(section, title, url);
  res.json(updated);
};

exports.addSection = (req, res) => {
  const { name } = req.body;
  const updated = model.addSection(name);
  res.json(updated);
};

exports.updateLink = (req, res) => {
  const { id } = req.params;
  const { title, url } = req.body;
  const updated = model.updateLink(parseInt(id), title, url);
  res.json(updated);
};

exports.deleteLink = (req, res) => {
  const { id } = req.params;
  const updated = model.deleteLink(parseInt(id));
  res.json(updated);
};

exports.deleteSection = (req, res) => {
  const { name } = req.params;
  const updated = model.deleteSection(name);
  res.json(updated);
};