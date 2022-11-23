import { defineStore } from 'pinia'

const useUserStore = defineStore('user', {
    state: () => {
        return {
            username: '',
            roles: [],
            permissions: []
        }
    },
    getters: {},
    actions: {}
})

export default useUserStore