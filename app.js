/* importações dependÊcias*/

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();

const User = require("./models/User");

// Configuração da resposta JSON
app.use(express.json());

// Route pública
app.get("/", (req, res) => {
  res.status(200).json({ msg: "Bem-vindo à API!" });
});

// Route privada
app.get("/user/:id", checkToken, async (req, res) => {
  const id = req.params.id;

  try {
    // Verifica se o usuário existe
    const user = await User.findById(id, "-password");

    if (!user) {
      return res.status(404).json({ msg: "Usuário não encontrado!" });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ msg: "Erro ao buscar usuário!" });
  }
});

function checkToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ msg: "Acesso negado!" });

  try {
    const secret = process.env.SECRET;

    jwt.verify(token, secret);

    next();
  } catch (err) {
    res.status(400).json({ msg: "O Token é inválido!" });
  }
}

app.post("/auth/register", async (req, res) => {
  const { name, email, password, confirmpassword } = req.body;

  // Validações
  if (!name || !email || !password || password !== confirmpassword) {
    return res.status(422).json({ msg: "Dados inválidos!" });
  }

  try {
    // Verifica se o usuário existe no bd
    const userExists = await User.findOne({ email: email });

    if (userExists) {
      return res.status(422).json({ msg: "Por favor, utilize outro e-mail!" });
    }

    // Cria a senha
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);


    res.status(201).json({ msg: "Usuário registrado com sucesso!" });
  } catch (error) {
    res.status(500).json({ msg: "Erro ao registrar usuário!" });
  }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});


// credênciais usadas
const dbUser = process.env.DBUSER;
const dbPassword = process.env.DB_PASS

mongoose.connect(
    'mongodb+srv://${dbUser}:${dbPassword}@jwt.jqnx0rw.mongodb.net//'
).
    then(() => {
    app.listen(3000)
    console.log("conectou o banco")
})
.catch((err) => console.log(err))
