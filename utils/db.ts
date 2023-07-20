import { Database } from "bun:sqlite";

const queue = new Database("queue.sqlite", { create: true });
const stats = new Database("stats.sqlite", { create: true });


const bootQueue = () => {
    console.log('bootQueue');
    // queue.run(`create table task_queue;`);
    // table name "task_queue" columns : id, folder, filename, status, created_at, updated_at, processing, processed_at
    queue.run(`create table if not exists task_queue (
        id integer primary key autoincrement,
        folder text not null,
        filename text not null,
        processing integer not null,
        processed_at datetime,
        created_at datetime not null,
        updated_at datetime not null
    );`);
    console.log('task_queue table created');
    
    console.log('Done booting queue');
    return;
}

bootQueue();


export { 
    queue,
    stats};