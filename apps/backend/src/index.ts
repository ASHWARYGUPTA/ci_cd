import express from "express";
import { prisma } from "@repo/db";
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send({
    message: "Connection is working fine",
    value: true,
  });
});
app.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await prisma.user.create({
      data: {
        email,
        password,
      },
    });
    res.status(201).send({
      message: "User created successfully",
      value: user,
    });
  } catch (err) {
    res.status(500).send({
      message: "Error creating user",
      value: err,
    });
  }
});
app.listen(5001, (err) => {
  if (err) console.log("Error Occured: ", err);
  else console.log("Server is running on port 5001");
});
