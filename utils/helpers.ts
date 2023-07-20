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
