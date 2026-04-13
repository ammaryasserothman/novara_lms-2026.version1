const { performance } = require('perf_hooks');

const ITEMS = Array.from({ length: 100000 }, (_, i) => ({
    id: i,
    type: i % 3 === 0 ? 'mention' : i % 2 === 0 ? 'success' : 'info',
    isRead: i % 2 === 0
}));

function renderWithoutMemo(filter) {
    const start = performance.now();
    for (let render = 0; render < 100; render++) {
        const filtered = ITEMS.filter(n => {
            if (filter === 'unread') return !n.isRead;
            if (filter === 'mentions') return n.type === 'mention';
            return true;
        });
        const unreadCount = ITEMS.filter(n => !n.isRead).length;
    }
    const end = performance.now();
    return end - start;
}

function renderWithMemo(filter) {
    const start = performance.now();
    let cachedFiltered = null;
    let cachedUnreadCount = null;

    for (let render = 0; render < 100; render++) {
        // Simulate memo: only recompute if filter changes (it doesn't here)
        if (!cachedFiltered) {
            cachedFiltered = ITEMS.filter(n => {
                if (filter === 'unread') return !n.isRead;
                if (filter === 'mentions') return n.type === 'mention';
                return true;
            });
        }
        if (!cachedUnreadCount) {
             cachedUnreadCount = ITEMS.filter(n => !n.isRead).length;
        }
    }
    const end = performance.now();
    return end - start;
}

console.log('--- Benchmark Results ---');
console.log(`Without useMemo: ${renderWithoutMemo('all').toFixed(2)}ms`);
console.log(`With useMemo: ${renderWithMemo('all').toFixed(2)}ms`);
