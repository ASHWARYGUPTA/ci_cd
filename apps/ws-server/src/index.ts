import { WebSocketServer } from "ws";
import { prisma } from "@repo/db";
const wss = new WebSocketServer(
  {
    port: 8080,
  },
  () => {
    console.log("websocket server start");
  }
);

wss.on("connection", async (socket, req) => {
  try {
    socket.send("Hiiiiiiiiiiiiii");
    socket.on("message", async (message) => {
      await prisma.user.create({
        data: {
          email: Math.random().toString(),
          password: Math.random().toString(),
        },
      });
      console.log("Received message");
      socket.send(message.toString());
    });
    socket.on("close", async () => {
      socket.send("BYEEEEEEE");
    });
  } catch (error) {
    socket.send(`Error Occured: ${error}`);
  }
});
