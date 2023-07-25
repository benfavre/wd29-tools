import net from "net"

export function getFreePort(startingPort: number) {
  return new Promise((resolve, reject) => {
    const server = net.createServer();

    server.on('error', (err) => {
      // @ts-expect-error
      if (err.code === 'EADDRINUSE') {
        server.close(() => {
          resolve(getFreePort(startingPort + 1));
        });
      } else {
        reject(err);
      }
    });

    server.listen(startingPort, () => {
      // @ts-ignore
      const port = server.address().port;
      server.close(() => {
        resolve(port);
      });
    });
  });
}