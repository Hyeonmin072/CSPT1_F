import { WebSocketServer } from "ws";

const server = new WebSocketServer({ port: 5001 });


let clients = [];

server.on("connection", (socket) => {
    console.log("사용자 연결됨");

    clients.push(socket);

    // 클라이언트로부터 메시지 받기
    socket.on("message", (message) => {
        console.log("메시지 수신:", message);

        // 모든 클라이언트에게 메시지 전송
        clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    // 클라이언트 연결 해제
    socket.on("close", () => {
        clients = clients.filter((client) => client !== socket);
        console.log("사용자 연결 종료");
    });
});

console.log("WebSocket 서버 실행 중 (포트 5001)");
