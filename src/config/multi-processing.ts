import cluster from 'cluster';
import os from 'os';
import * as process from 'process';

// Multi-process to utilize all CPU cores.
if (process.env.NODE_ENV === 'production' && cluster.isMaster) {
    console.log(`Node cluster master ${process.pid} is running`);

    const coresNumber = os.cpus().length;

    // Fork workers.
    for (let i = 0; i < coresNumber; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.error(
            `Node cluster worker ${worker.process.pid} exited: code ${code}, signal ${signal}`,
        );
    });
}
