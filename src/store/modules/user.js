import { defineStore } from 'pinia'

const useUserStore = defineStore('user', {
    state: () => {
        return {
            role: ['admin'],
            permission: []
        }
    },
    getters: {},
    actions: {}
})

export default useUserStore