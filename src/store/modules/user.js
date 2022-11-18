import { defineStore } from 'pinia'

const useUserStore = defineStore('user', {
    state: () => {
        return {
            roles: [],
            permissions: []
        }
    },
    getters: {},
    actions: {}
})

export default useUserStore