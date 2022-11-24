import http from '@/utils/http'

export function login(data) {
    return http({
        url: '/api/v1/user/login',
        method: 'post',
        data
    })
}

export function getInfo(token) {
    return http({
        url: '/api/v1/user/info',
        method: 'get',
        params: { token }
    })
}

export function logout() {
    return http({
        url: '/api/v1/user/logout',
        method: 'post'
    })
}