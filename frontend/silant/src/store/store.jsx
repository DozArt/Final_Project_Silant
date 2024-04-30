import { makeAutoObservable } from "mobx";
import axios from 'axios'


class Store {
    baseURL = 'http://127.0.0.1:8000/api'

    dataCatalogRecords = []

    setDataCatalogRecords(value){
        this.dataCatalogRecords = value
    }
    
    constructor() {
        makeAutoObservable(this);
    }

    async loadCatalog(accessToken) {
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
            console.log('Проверка авторизации с ответом ' + this.setDataCatalogRecords)
        } catch (e) {
            console.log(e.response.data.message);
        }
    }
}

export default Store;