const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const usersFilePath = path.join(__dirname, '../data/users.json');

// GET all users
router.get('/', (req, res) => {
  const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf8'));
  res.json(users);
});

// POST a new user
router.post('/', (req, res) => {
  const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf8'));
  const newUser = req.body;
  users.push(newUser);
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
  res.json(newUser);
});

// DELETE a user by ID
router.delete('/:id', (req, res) => {
  const userId = req.params.id;
  let users = JSON.parse(fs.readFileSync(usersFilePath, 'utf8'));
  users = users.filter(user => user.id !== userId);
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
  res.send(`User ${userId} deleted`);
});

module.exports = router;
