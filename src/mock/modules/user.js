import Mock from 'mockjs'
import { success, fail } from '../result'

Mock.mock(new RegExp(`${process.env.VUE_APP_BASE_API}/api/v1/user/login`), (params) => {
    const { username, password } = JSON.parse(params.body);
    return success({
        id: '1',
        username: 'admin',
        roles: ['admin'],
        permissions: ['admin'],
        token: 'admin-token'
    })
})
