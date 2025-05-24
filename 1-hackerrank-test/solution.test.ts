import { expect, test } from 'vitest'
import { GetRejectedRequests } from  './solution'

test('Example 1: ', () => {
    const requests = [
        "1 172.253.115.138 50000", 
        "2 172.253.115.139 50100", 
        "3 172.253.115.138 50210", 
        "4 172.253.115.139 50300", 
        "5 172.253.115.138 51000", 
        "6 172.253.115.139 60300"
    ]
    const limit_per_second = 1

    const result = GetRejectedRequests(requests, limit_per_second)

    expect(result).toStrictEqual([3, 4])
})

test('Example 2: ', () => {
    const requests = [
        "10 172.253.115.138 50000", 
        "20 172.253.115.138 50000", 
        "30 172.253.115.138 50000"
    ]
    const limit_per_second = 2

    const result = GetRejectedRequests(requests, limit_per_second)

    expect(result).toStrictEqual([30])
})

test('Example 3: ', () => {
    const requests = [
        "1 172.253.115.138 50000", 
        "2 172.253.115.138 50900", 
        "3 172.253.115.138 51000", 
        "4 172.253.115.138 51500"
    ]
    const limit_per_second = 2

    const result = GetRejectedRequests(requests, limit_per_second)

    expect(result).toStrictEqual([4])
})
