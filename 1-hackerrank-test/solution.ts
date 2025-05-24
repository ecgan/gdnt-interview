function GetRejectedRequests (requests: string[], limit_per_second: number): number [] {
    const result: number [] = [];
    const set: Record<string, number []> = {}

    for (let i = 0; i < requests. length; i++) {
        const request = requests[i];
        const parts = request.split(' ');
        const requestId = parseInt(parts [0], 10)
        const ipAddress = parts [1]
        const timestamp = parseInt(parts [2])

        if (!set[ipAddress]) {
            set[ipAddress] = []
        }

        const pastRequests = set[ipAddress]
        if (pastRequests.length < limit_per_second) {
            pastRequests.push(timestamp)
        } else {
            // past requests is more than limit per second.
            // get the oldest in the past requests, and check how much time has elapsed.
            // if too much time has elapsed, we can remove the oldest, and push the newest into array.
            // if time has not elapsed, it means too many requests per second, we want to reject the current one.
            const oldest = pastRequests [0]
            const diff = timestamp - oldest

            // the current timestamp is ›= 1000ms than the oldest timestamp.
            // so we can discard old one and push new one.
            if (diff >= 1000) {
                pastRequests.shift()
                pastRequests.push(timestamp)
            } else {
                // too many requests per second.
                // need to reject the current request.
                result.push(requestId)
            }
        }
    }
    return result;
}

export { GetRejectedRequests }
