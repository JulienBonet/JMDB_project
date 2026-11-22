// Create the first JMDB administrator.

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({
    path: `${__dirname}/../.env.development`,
  });
}

const readline = require('readline');
const bcrypt = require('bcrypt');

const db = require('../database/client');
const userModel = require('../src/models/userModel');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const ask = (question) => {
  return new Promise((resolve) => {
    rl.question(question, resolve);
  });
};

const askPassword = (question) => {
  return new Promise((resolve, reject) => {
    if (!process.stdin.isTTY) {
      reject(new Error('Password input requires an interactive terminal.'));
      return;
    }

    const stdin = process.stdin;
    let password = '';

    process.stdout.write(question);
    readline.emitKeypressEvents(stdin, rl);

    const onKeypress = (character, key) => {
      if (key.ctrl && key.name === 'c') {
        cleanup();
        reject(new Error('Operation cancelled.'));
        return;
      }

      if (key.name === 'return') {
        cleanup();
        process.stdout.write('\n');
        resolve(password);
        return;
      }

      if (key.name === 'backspace') {
        password = password.slice(0, -1);
        return;
      }

      if (character && !key.ctrl && !key.meta) {
        password += character;
      }
    };

    const cleanup = () => {
      stdin.removeListener('keypress', onKeypress);
    };

    stdin.on('keypress', onKeypress);
  });
};

const createAdmin = async () => {
  try {
    // Check database connectivity.
    const connection = await db.getConnection();
    connection.release();

    // Refuse initialization if an administrator already exists.
    const [admins] = await db.query('SELECT id FROM user WHERE isAdmin = 1 LIMIT 1');

    if (admins.length > 0) {
      throw new Error('An administrator already exists.');
    }

    console.info('\nJMDB - First administrator creation\n');

    const name = (await ask('Administrator name: ')).trim();

    if (!name || name.length > 100) {
      throw new Error('Name must contain between 1 and 100 characters.');
    }

    // Check whether the username already exists.
    const [existingUsers] = await userModel.findByName(name);

    if (existingUsers.length > 0) {
      throw new Error('This username already exists.');
    }

    const password = await askPassword('Password: ');

    if (password.length < 8) {
      throw new Error('Password must contain at least 8 characters.');
    }

    const confirmation = await askPassword('Confirm password: ');

    if (password !== confirmation) {
      throw new Error('Passwords do not match.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await userModel.createUser(name, hashedPassword, 1);

    console.info(`\nAdministrator "${name}" created successfully.`);
  } finally {
    rl.close();
    await db.end();
  }
};

createAdmin().catch((error) => {
  console.error('\nAdministrator creation failed:', error.message);
  process.exitCode = 1;
});
