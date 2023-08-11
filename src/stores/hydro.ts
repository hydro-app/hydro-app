import {defineStore} from 'pinia'

import {db} from '@/stores/db'
import moment from "moment";

interface hydroEntry {
    id?: number
    icon: string
    amount: number
    created_at: number
}

const hydroEntryExample: hydroEntry = {
    icon: 'cup',
    amount: 0,
    created_at: 0
}

export const hydroStore = defineStore('hydroStore', {
    state: () => ({
        entries: [hydroEntryExample],
        date: new Date as Date,
        dateStart: 0,
        dateEnd: 0,
        datePrevious: '',
        dateNext: '',
        isToday: true,
        lastEntryAt: 0,
    }),
    actions: {
        async init() {
            // set initial date to last used or today
            const date = localStorage.getItem('date')
            if (date)
                await this.setDate(date)
            else
                await this.setDate(moment().format('YYYYMMDD'))
        },
        async setDate(date: string) {
            localStorage.setItem('date', date)  // persist currently selected date

            // current utc as date object
            this.date = moment(date).utc().toDate()

            // unix time
            this.dateStart = moment(this.date).startOf('day').valueOf()
            this.dateEnd = moment(this.date).endOf('day').valueOf()

            // formatted date string
            this.datePrevious = moment(this.date).subtract(1, 'days').format('YYYY-MM-DD')
            this.dateNext = moment(this.date).add(1, 'days').format('YYYY-MM-DD')

            this.isToday = moment(this.date).format('YYYYMMDD') == moment().format('YYYYMMDD')

            const lastEntry= await db['entries'].orderBy('created_at').reverse().limit(1).toArray()
            if (lastEntry.length > 0)
                this.lastEntryAt = lastEntry[0].created_at

            await this.loadStorage()
        },
        async loadStorage() {
            const entries: any[] = await db.table('entries')
                .where("created_at").between(this.dateStart, this.dateEnd + 1).toArray()
            this.entries = entries.sort(function (x, y) {
                return y.created_at - x.created_at;
            })
        },
        async add(data: hydroEntry) {
            if ('id' in data)
                delete data['id']
            db.table('entries').add(data)
                .then(() => {
                    this.entries.splice(0, 0, data)
                    this.lastEntryAt = data.created_at
                })
        },
        async addPresetEntry(presets: any, preset_index: number) {
            let created_at = moment().valueOf() // current unix time

            if (!this.isToday)
                // end of specified day as unix time
                created_at = moment(this.date).endOf('day').valueOf()

            const data = {
                amount: presets[preset_index].amount,
                icon: presets[preset_index].icon,
                created_at: created_at,
            }
            await this.add(data)
        },
        async delete(id: number) {
            await db.table('entries').where({id: id}).delete()
                .then(() => {
                    // get index by id and remove object accordingly
                    const index = this.entries.map((x) => {
                        return x.id
                    }).indexOf(id)
                    if (index > -1)
                        this.entries.splice(index, 1)
                })
        },
    }
})

