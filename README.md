# Final_Project_Silant
Final Project "Silant" for SkillFactory. CRM - service maintenance

#Run project

```
git clone https://github.com/DozArt/Final_Project_Silant.git
```

## Run back
```
- cd backend
- python -m venv venv
- source venv/bin/activate
- pip install -r requirements.txt
- cd silant_app
- python manage.py makemigrations
- python manage.py migrate
- python3 manage.py runserver  
```

api instruction
http://127.0.0.1:8000/swagger/

## Run front
```
- cd frontend/silant
- npm install
- npm run dev
```

Менеджер вносит все данные через админпанель
> http://127.0.0.1:8000/admin/

* login - admin
* password - admin

Фронтенд доступен по адресу
> http://localhost:5173/

Тестовые аккаунты с

service accounts
- silant - dXvZkYPE
- mgr - HAj3Vwqe
- prom_teh - 4YE9dmUa
- fns - JmiYX47X

customer accounts
- trud - JmYNsuKz
- fpk - fKtqBi8k
