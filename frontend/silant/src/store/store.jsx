import { makeAutoObservable } from "mobx";
import axios from 'axios'


class Store {
    baseURL = 'http://127.0.0.1:8000/api'

    dataCatalogRecords = []
    isAuth = false
    token = ''

    setDataCatalogRecords(value) { this.dataCatalogRecords = value}
    setAuth(bool) { this.isAuth = bool; }
    setAccessToken(value) {
        localStorage.setItem("accessToken", value);
        this.token = `Bearer ${value}`;
        console.log('токен изменен')
    }

    constructor() {
        makeAutoObservable(this);
    }

    async handleLogin(login, password) {
        try {
            const response = await axios.post(`${this.baseURL}/token/`, {
                "username": login,
                "password": password,
              }, {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'X-CSRFToken': '1TeToOmytlZyDW3z3SSrXxIveAAdxSSTFaiedl2Z3KNuCN7z7xHAqPrb0O112esj',
                }
            });
            if (response.status === 200) {
                const accessToken = response.data.access;
                this.setAuth(true);
                this.setAccessToken(accessToken)
                console.log('Login successful');
                // this.checkAuth(accessToken);
            } else {
                console.error('Login failed');
            }
        } catch (error) {
            console.error('Error during login in store:', error);
            throw error;
        }
    };

    async loadCatalog() {
        try {
            const response = await axios.get(`${this.baseURL}/catalog_record/`, 
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                        'X-CSRFToken': '1TeToOmytlZyDW3z3SSrXxIveAAdxSSTFaiedl2Z3KNuCN7z7xHAqPrb0O112esj',
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