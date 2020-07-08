import Api from './Api'

export default {
    register (credentials){
        return Api().post('/api/register', credentials)
    },
    login (credentials){
        return Api().post('/api/login', credentials)
    },
    settings (credentials){
        return Api().post('/api/settings', credentials)
    },
    settingsPersonal (credentials){
        return Api().post('/api/settings/personal', credentials)
    },
    settingsPassword (credentials){
        return Api().post('/api/settings/password', credentials)
    },
    settingsAdditional (credentials){
        return Api().post('/api/settings/additional', credentials)
    },
    settingsLocation (credentials){
        return Api().post('/api/settings/location', credentials)
    }
}