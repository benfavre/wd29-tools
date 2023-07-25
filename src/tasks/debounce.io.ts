// process CSV files from a given folder 
// submit them to debounce.io for bulkvalidation
import { Cron } from "croner";
import { constants } from "../utils/constants";
import { getTodoFolders } from "../utils/helpers";
import * as fs from 'fs';
import { processFile, queueFile } from "../utils/processFile";

const jobShowTime = Cron('* * * * * *', () => {
    console.log('Cron JOB running! - Current time:', new Date());
});

console.log('Announce how many sites are being watched');
console.log('Watching sites:', constants.sites.length);

let todoFolders = getTodoFolders(constants.sitesPath, []);


// set up a watcher for each site folder in the todoFolders array
// if a new file is added to the folder, trigger proccessFile function
todoFolders.forEach((folder: any) => {
    // trigger processFile function if a new file is allready in the folder when the watcher is set up
    fs.readdirSync(folder).forEach((file: any) => {
        queueFile(folder, file);
    });
    console.log('Watching folder:', folder);
    fs.watch(folder, (eventType: string, filename: any) => {
        if (filename) {
            console.log(`event type is: ${eventType}`);
            if (eventType === 'rename') {
                queueFile(folder, filename);
            }
        }
    });
});

