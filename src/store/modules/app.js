import { defineStore } from 'pinia'
import defaultSettings from '@/config/setting.json'

const useAppStore = defineStore('app', {
    state: () => {
        return {
            ...defaultSettings
        }
    },
    getters: {},
    actions: {
        setCollapseStatus() {
            this.menuCollapse = !this.menuCollapse
        }
    }
})

export default useAppStore