const pool = require("./mysql2");

const selectUser = () => {
  return pool.execute(`SELECT * FROM usersproj.userinformation `);
};
const selectStore = () => {
  return pool.execute(`SELECT * FROM usersproj.storeinfo `);
};

const insertmyusers = (userName, password) => {
  return pool.execute(
    `INSERT INTO usersproj.myusers (client_name,client_hash) VALUES (?,?) `,
    [userName, password]
  );
};

const cheakUserEmail = (email) => {
  return pool.execute(
    `SELECT * FROM usersproj.userinformation WHERE client_email = ? `,
    [email]
  );
};

const cheakStoreName = (storename) => {
  return pool.execute(
    `SELECT * FROM usersproj.storeInfo WHERE store_name = ? `,
    [storename]
  );
};
const cheakStoreEmail = (email) => {
  return pool.execute(
    `SELECT * FROM usersproj.storeInfo WHERE store_email = ? `,
    [email]
  );
};

const cheakUsername = (name) => {
  return pool.execute(
    `SELECT * FROM usersproj.userinformation WHERE client_fullName = ? `,
    [name]
  );
};


const cheakUserEmailAndName = (name,email) => {
  return pool.execute(
    `SELECT * FROM usersproj.userinformation WHERE client_fullName = ? AND client_email = ? `,
    [name,email]
  );
};

const cheakStoreEmailAndName = (email,name) => {
  return pool.execute(
    `SELECT * FROM usersproj.storeInfo WHERE store_email = ? AND store_name = ?`,
    [email,name]
  );
};



const insertall = (id, name, email, phon, view, token, date) => {
  return pool.execute(
    `INSERT INTO usersproj.userinformation (client_id,client_fullName,client_email,client_phon,client_view,token,date) VALUES (?,?,?,?,?,?,?) `,
    [id, name, email, phon, view, token, date]
  );
};

const insertallStore = (storeId, name, email, view, id, token, date) => {
  return pool.execute(
    `INSERT INTO usersproj.storeInfo (store_idcart,store_name,store_email,store_view,store_hash,token,date) VALUES (?,?,?,?,?,?,?) `,
    [storeId, name, email, view, id, token, date]
  );
};

const selectUserById = (id) => {
  return pool.execute(
    `SELECT * FROM usersproj.userinformation WHERE client_id = ? `,
    [id]
  );
};
const updateUser = (password,newToken,
   userName, email, phon, view, userID) => {
  return pool.execute(
    `UPDATE usersproj.userinformation
    SET client_id = ?,token = ?,
    client_fullName =?,client_email =?,
    client_phon=?,client_view=?
    WHERE client_number = ? `,
    [password,newToken, userName, email, phon, view, userID]
  );
};




const updateUserViwe = (view ,number) => {
  return pool.execute(
    `UPDATE usersproj.userinformation
    SET client_view=?
    WHERE client_number = ? `,
    [view ,number]
  );
};

const updateStoreView = (view ,number) => {
  return pool.execute(
    `UPDATE usersproj.storeinfo
    SET store_view=?
    WHERE store_number = ? `,
    [view ,number]
  );
};





const updateStore = (idcart,x, userName, email, password, view, userID) => {
  return pool.execute(
    `UPDATE usersproj.storeinfo
    SET store_idcart = ?,token = ?,store_name =?,store_email =?,store_hash=?,store_view=?
    WHERE store_number = ? `,
    [idcart,x, userName, email, password, view, userID]
  );
};

module.exports.selectUser = selectUser;
module.exports.selectUserById = selectUserById;
module.exports.insertmyusers = insertmyusers;
module.exports.insertall = insertall;
module.exports.cheakUserEmail = cheakUserEmail;
module.exports.cheakUsername = cheakUsername;
module.exports.cheakStoreName = cheakStoreName;
module.exports.cheakStoreEmail = cheakStoreEmail;
module.exports.insertallStore = insertallStore;
module.exports.selectStore = selectStore;
module.exports.updateUser = updateUser;
module.exports.updateStore = updateStore;
module.exports.cheakUserEmailAndName = cheakUserEmailAndName;

module.exports.cheakStoreEmailAndName = cheakStoreEmailAndName;


module.exports.updateUserViwe = updateUserViwe;
module.exports.updateStoreView = updateStoreView;



