import { makeAutoObservable } from "mobx";
import axios from 'axios'


class Store {
    baseURL = 'http://127.0.0.1:8000/api'

    dataCatalogRecords = []
    dataUser = []
    role = ''
    isAuth = false
    token = ''
    refreshToken = ''
    machine = ''
    machines = []

    entityChoices = [
        { value: 'eq', label: 'Техника' },
        { value: 'en', label: 'Двигатель' },
        { value: 'tr', label: 'Трансмиссия' },
        { value: 'da', label: 'Ведущий мост' },
        { value: 'sa', label: 'Управляемый мост' },
        { value: 'mt', label: 'Тип ТО' },
        { value: 'fu', label: 'Узел отказа' },
        { value: 'rm', label: 'Способ восстановления' },
    ];


    getValueLabel = (value) => {
        const choice = this.entityChoices.find(item => item.value === value);
        return choice ? choice.label : 'Unknown';
    };

    modelData = (model_id) => this.dataCatalogRecords.find(data => data.id == model_id)

    setDataCatalogRecords(value) { this.dataCatalogRecords = value}

    setDataUser(value) { this.dataUser = value}

    setMachine(value) {this.machine = value}
    
    setMachines(value) {this.machines = value}

    setRole(value) {
        switch (value) {
            case 'service_company':
                this.role = 'сервисная компания'
                break
            case 'client':
                this.role = 'клиент'
        }
    }
    setAuth(bool) { this.isAuth = bool; }

    setAccessToken(value) {
        localStorage.setItem("accessToken", value);
        this.token = `Bearer ${value}`;
        this.setAuth(true)
        console.log('set Access Token')
    }
    setRefreshToken(value) {
        this.refreshToken = value
        localStorage.setItem("refreshToken", value);
        console.log('setRefreshToken')
    }

    constructor() {
        makeAutoObservable(this);
    }

    handleRole(data) {

    }

    async handleLogin(login, password) {
        try {
            const response = await axios.post(`${this.baseURL}/token/`, {
                "username": login,
                "password": password,
              }, {
                headers: {
                    Accept: 'application/json',
                }
            });
            if (response.status === 200) {
                this.setAuth(true);
                this.setAccessToken(response.data.access)
                this.setRefreshToken(response.data.refresh)
                console.log('Login successful');
                this.handleUser()
            } else {
                console.error('Login failed');
            }
        } catch (error) {
            console.error('Error during login in store:', error);
            throw error;
        }
    };

    async hendlerMachines() {
        try {
            axios.get(`${this.baseURL}/machines/`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: this.token,
                    }
                }
            )
                .then(response => {
                    const list = response.data.map(({ id, serial_number }) => ({
                        id: id,
                        name: serial_number
                    }))
                    this.setMachines(list);
                })
        } catch (error) {
            if (error.response.status === 401) {
                console.error('запускаем рефреш');
                this.handlerRefreshToken(localStorage.getItem('refreshToken'))
            }
            console.error('Error response machines:', error);
            throw error;
        }
    }

    async hendlerMachine(id) {
        try {
            axios.get(`${this.baseURL}/machines/${id}/`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: this.token,
                    }
                }
            )
                .then(response => {
                    this.setMachine(response.data);
                    console.log('=> setData detail Mashine')
                    return response.data  // проверь, оно тут нужно?
                })
        } catch (error) {
            if (error.response.status === 401) {
                console.error('запускаем рефреш');
                this.handlerRefreshToken(localStorage.getItem('refreshToken'))
            }
            console.error('Error response machine:', error);
            throw error;
        }
    }

    async handleLogout() {
        try {
            this.setAuth(false)
            this.token = ``;
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");

          } catch (err) {
            console.log("logout error");
          }
    }

    async handlerRefreshToken(refreshToken) {
        try {
            const response = await axios.post(`${this.baseURL}/token/refresh/`, {
                "refresh": refreshToken,
              }, {
                headers: {
                    Accept: 'application/json',
                }
            });
            if (response.status === 200) {
                this.setAuth(true);
                this.setAccessToken(response.data.access)
                // this.setRefreshToken(response.data.refresh)
                this.handleUser()
                console.log('Refresh token successful');
                return true
            } else {
                console.error('Refresh token failed', response.status);
            }
        } catch (error) {
            console.error('Error during login in store:', error);
            throw error;
        }
    };

    async handleUser() {
        try {
            axios.get(`${this.baseURL}/user/`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: this.token,
                }
            }
        )
            .then(response => {
                console.log('полученны данные пользователя');
                this.setDataUser(response.data)
                this.setRole(response.data.groups[0])
            })
            .catch(error => {
                if (error.response.status === 401) {
                    console.error('запускаем рефреш');
                    this.handlerRefreshToken(localStorage.getItem('refreshToken'))
                }
                console.error('Error fetching data:', error);
            });
            
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    async loadCatalog() {
        try {
            const response = await axios.get(`${this.baseURL}/catalog_record/`, 
                {
                    headers: {
                        Accept: 'application/json',
                    }
                }
            )
            this.setDataCatalogRecords(await response.data)
            console.log('каталог загружен')
        } catch (e) {
            console.log(e.response.data.message);
        }
    }
}

export default Store;