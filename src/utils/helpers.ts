import net from "net"
import fs from 'fs';
import path from 'path';

export const getTodoFolders = (dir: any, fileList: any = []) => {
    const files = fs.readdirSync(dir);
    files.forEach((file: any) => {
        const filePath = path.join(dir, file);
        const fileStat = fs.statSync(filePath);
        if (fileStat.isDirectory()) {
            if (file === 'todo') {
                fileList.push(filePath);
            }
            fileList = getTodoFolders(filePath, fileList);
        }
    });
    return fileList;
}

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