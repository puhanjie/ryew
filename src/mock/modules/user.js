import Mock from 'mockjs'
import { success, fail } from '../result'

const userData = [
    {
        username: 'admin',
        password: 'admin',
        avatar: 'http://lf1-xgcdn-tos.pstatp.com/obj/vcloud/vadmin/start.8e0e4855ee346a46ccff8ff3e24db27b.png',
        roles: ['admin'],
        permissions: ['app:admin']
    },
    {
        username: 'guest',
        password: 'guest',
        avatar: 'http://lf1-xgcdn-tos.pstatp.com/obj/vcloud/vadmin/start.8e0e4855ee346a46ccff8ff3e24db27b.png',
        roles: ['guest'],
        permissions: ['app:dashboard']
    }
]

const getQuery = (url, name) => {
    const index = url.indexOf('?')
    if (index !== -1) {
        const queryStrArr = url.substr(index + 1).split('&')
        for (var i = 0; i < queryStrArr.length; i++) {
            const itemArr = queryStrArr[i].split('=')
            if (itemArr[0] === name) {
                return itemArr[1]
            }
        }
    }
    return null
}

Mock.mock(new RegExp(`${process.env.VUE_APP_BASE_API}/api/v1/user/login`), (params) => {
    const { username, password } = JSON.parse(params.body);
    const user = userData.filter(item => item.username === username)[0]
    
    if (user.password !== password) {
        return fail('登录失败')
    }
    return success({
        ...user,
        token: `${user.username}-token`
    })
})

Mock.mock(new RegExp(`${process.env.VUE_APP_BASE_API}/api/v1/user/info`), (params) => {
    const token = getQuery(params.url, 'token')
    const username = token.split('-')[0]
    const user = userData.filter(item => item.username === username)[0]
    if (user) {
        return success(user)
    }
    return fail('查询失败')
})
