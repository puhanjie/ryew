export function success(data) {
    return {
        code: 0,
        message: '成功',
        data
    }
}

export function fail(message, code = -1) {
    return {
        code,
        message,
        data: null
    }
}
