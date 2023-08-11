import {defineStore} from 'pinia'
import {db} from '@/stores/db'

interface settingsEntry {
    [key: string]: any
}

const settingsExample: settingsEntry = {
    targetAmount: 2000,
    startTime: {
        'hours': 7,
        'minutes': 0,
        'seconds': 0,
    },
    endTime: {
        'hours': 22,
        'minutes': 0,
        'seconds': 0,
    },
    reminderActive: false,
    reminder: {
        'hours': 0,
        'minutes': 45,
        'seconds': 0,
    },
}

interface presetEntry {
    id?: number
    icon: string
    amount: number
    color: string
    fill: number
}

const presetsExample: presetEntry[] = [
    {'amount': 25, 'icon': 'cup', color: 'brown', fill: 50},
    {'amount': 200, 'icon': 'glas', color: 'lightblue', fill: 80},
    {'amount': 300, 'icon': 'drop', color: 'lightblue', fill: 50},
]

const presetIcons = [
    'heart',
    'cup',
    'glas',
    'drop',
]

export const settingsStore = defineStore('settingsStore', {
    state: () => ({
        store: settingsExample,
        presets: presetsExample,
        presetIcons: presetIcons,
    }),
    actions: {
        // general settings
        async loadSettings() {
            for (const item of await db.table('settings').toArray()) {
                this.store[item.key] = item.value
            }
        },
        async updateSettings(key: string, value: string | number | boolean | {}) {
            this.store[key] = value

            const setting = await db.table('settings').get({key: key})
            if (setting)
                await db.table('settings').update(setting.id, {value: value})
            else
                await db.table('settings').add({key: key})
        },
        async deleteSetting(settings_id: number) {
            await db.table('settings').delete(settings_id)
        },

        // presets
        async loadPresets() {
            const presets: any[] = await db.table('presets').toArray()
            if (presets.length > 0) {
                this.presets = presets.sort(function (x, y) {
                    return x.amount - y.amount;
                })
            }
            else
                this.presets = presetsExample
        },
        async addPreset(icon: string, amount: number, color: string, fill: number) {
            fill = fill > 100 ? 100 : fill
            const data = {
                icon: icon,
                amount: amount,
                color: color,
                fill: fill,
            }
            await db.table('presets').add(data)
            await this.loadPresets()
        },
        async deletePreset(preset_id: number) {
            await db.table('presets').delete(preset_id)
            await this.loadPresets()
        },
    },
})