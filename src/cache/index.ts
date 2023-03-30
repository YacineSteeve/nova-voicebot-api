import NodeCache from 'node-cache';

const cache = new NodeCache({
    stdTTL: 3600,
});

export default cache;
