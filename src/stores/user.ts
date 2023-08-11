import {defineStore} from 'pinia'
import {mande} from 'mande'
import {defaults} from 'mande'

const api = mande(import.meta.env.VITE_API_BASE_URL + 'api-token-auth/')

export const userStore = defineStore('tokenStore', {
    state: () => ({
        token: null,
    }),
    actions: {
        is_authenticated(){
            return !!this.token
        },
        fromStorage() {
            if (localStorage.authToken) {
                this.token = localStorage.authToken
                defaults.headers.Authorization = 'Token ' + this.token
            }
            return this.token
        },
        async login(username: string, password: string) {
                await api
                    .post({'username': username, 'password': password})
                    .then((response: any) => {
                        if (response) {
                            this.token = response.token
                        }
                        localStorage.authToken = this.token
                        defaults.headers.Authorization = 'Token ' + this.token
                    }).catch((reason) => {
                    })
        },
        logout() {
            this.token = null
            localStorage.removeItem('authToken')
            defaults.headers.Authorization = ''
        }

    }
})