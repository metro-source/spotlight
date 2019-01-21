from main import app

with app.test_client() as c:
    rv = c.post("/api/create_user", json={
        "name": "Hernan",
        "email": "hernan@mail.net",
        "password": "password1"
    })

    print(rv.get_json())

    rv = c.post("/api/sign_in", json={
        "email": "hernan@mail.net",
        "password": "password2"
    })

    print(rv.get_json())
