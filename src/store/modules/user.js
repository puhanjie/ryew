import { defineStore } from 'pinia'

const useUserStore = defineStore('user', {
    state: () => {
        return {
            username: '',
            avatar: '',
            roles: [],
            permissions: [],
            routes: []
        }
    },
    getters: {},
    actions: {
        setUserStore(user) {
            this.username = user.username
            this.avatar = user.avatar
            this.roles = user.roles
            this.permissions = user.permissions
        }
    }
})

export default useUserStore