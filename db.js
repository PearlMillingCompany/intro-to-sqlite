//-----------------------------
//#region Database Connection
//-----------------------------
const path = require("path");
const sqlite = require("sqlite3").verbose();
const dbFile = path.join(__dirname, "foo.db");
const db = new sqlite.Database(dbFile, (error) => {
  if (error) return console.error(error.message);
  console.log(`Connected to database ${dbFile}`);
});

//#endregion Database Connection

//-----------------------------
//#region Routes
//-----------------------------
/**
 * Gets a single user by id
 */
const getUserById = (request, response) => {
  // Parse the id to generate a SQLite query
  const id = parseInt(request.params.id);
  const query = `SELECT * FROM user WHERE id = ?`;

  // db.get will replace all ? in query sequentially with
  // items from the array passed as the second parameter
  // and then run the callback function passed as the third param
  // What does the callback function do?
  db.get(query, [id], (error, result) => {
    if (error) {
      console.error(error.message);
      response.status(400).json({ error: error.message });
      return;
    }
    // If nothing is returned, then result will be undefined
    if (result) {
      response.json(result);
    } else {
      response.sendStatus(404);
    }
  });
};

// ----- FILL IN BELOW -----
// Write and export the rest of the functions needed by index.js!

const userlist = (req, res) => {

  const query = `SELECT * FROM user`;

  db.all(query, [], (error, result) => {
    if (error) {
      console.error(error.message);
      res.status(400).json({ error: error.message });
      return;
    }
    // If nothing is returned, then result will be undefined
    if (result) {
      res.json(result);
    } else {
      res.sendStatus(404);
    }
  })

}

// fix 
const createUser = (req, res) => {
  const userId = req.body.userId;
  const userName = req.body.userName;

  const query = 'INSERT INTO user(id, name) VALUES(?, ?)';

  db.run(query, [userId, userName], (error, result) => {
    if (error) {
      console.error(error.message);
      res.status(400).json({ error: error.message });
      return;
    }
    // If nothing is returned, then result will be undefined
    res.json("Inserted");

  })
};

const updateUserById = (req, res) => {
  const userId = req.body.userId;
  const newUserName = req.body.newUserName;

  const query = 'UPDATE user SET name = ? WHERE id = ?';

  db.run(query, [newUserName, userId], (error, result) => {
    if (error) {
      console.error(error.message);
      res.status(400).json({ error: error.message });
      return;
    }
    // If nothing is returned, then result will be undefined
    if (result) {
      res.json(result);
    } else {
      res.sendStatus(404);
    }
  })
}


const deleteUserById = (req, res) => {
  const userId = req.body.userId;

  const query = 'DELETE FROM user WHERE Id = ?';


  db.run(query, [userId], (error, result) => {
    if (error) {
      console.error(error.message);
      res.status(400).json({ error: error.message });
      return;
    }
    // If nothing is returned, then result will be undefined
    if (result) {
      res.json(result);
    } else {
      res.sendStatus(404);
    }
  });
}




//#endregion Routes

// This allows `index.js` to use functions defined in this file.
module.exports = {
  getUserById,
  userlist,
  createUser,
  updateUserById,
  deleteUserById
};
