import { queue } from "./db";
import * as fs from 'fs';
import path from 'path';

export const queueFile = (folder: any, filename: any) => {
    console.log('Queueing file:', {folder, filename});
    // insert pending file check into queue
    const queueInsert = queue.prepare("INSERT INTO task_queue (folder, filename, processing, created_at, updated_at) VALUES ($folder, $filename, $processing, $created_at, $updated_at)");
    queue.transaction((queueInsert: any) => {
        queueInsert.run({
            folder,
            filename,
            processing: 0,
            created_at: new Date(),
            updated_at: new Date()
        });
    });
    // move file out of todo into done folder in the same site folder
    const doneFolder = folder.replace('todo', 'done');
    // move file from todo to done
    fs.renameSync(path.join(folder, filename), path.join(doneFolder, filename));
    console.log('queueInsert:', queueInsert);
    return;

    // id integer primary key autoincrement,
    // folder text not null,
    // filename text not null,
    // processing integer not null,
    // processed_at datetime,
    // created_at datetime not null,
    // updated_at datetime not null
}

export const processFile = (folder: any, filename: any) => {
    console.log('Processing file:', filename);
}