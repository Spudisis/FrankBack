# FrankBack
SCHEMA: https://drive.google.com/file/d/1HEZ827tZ4Dv7HuEkOSnChORGX_MSijwG/view?usp=sharing


tasks:
1. add owners service and controller
2. add owners record with createEmptyProject
3. create endpoints list
4. create endpoints body list
5. remove id field from response for projects endpoints
6. add valid response to project controllers method updateProject


------------------------------------------endpoints list------------------------------------------

-------------------------------person group (host:8080/api/person/)-------------------------------

host:8080/api/person/login
METHOD: POST

request body: 
{
    "email":"test_email@email.com",
    "password":"password"
}

response body:
{
    "userData": {
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNhbmFrdXJ2aW5AZ21haWwuY29tIiwiaWQiOjIsImlzQWN0aXZhdGVkIjp0cnVlLCJpYXQiOjE2ODQwMDcwODIsImV4cCI6MTY4NDAxMDY4Mn0.SlHvpspEQYesmhIp1mLxQ3e_HnnbnOapVqNNdlF2Xz4",
        "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNhbmFrdXJ2aW5AZ21haWwuY29tIiwiaWQiOjIsImlzQWN0aXZhdGVkIjp0cnVlLCJpYXQiOjE2ODQwMDcwODIsImV4cCI6MTY4NjU5OTA4Mn0.m7oc3pTiTuNKoKE92oePkmN6t8cZwUGDy6qkW7aYvlk",
        "user": {
            "email": "test_email@email.com"",
            "id": 2,
            "isActivated": true
        }
    }
}

---

host:8080/api/person/logout
METHOD: POST

---

host:8080/api/person/activate/:link
METHOD: GET

---

host:8080/api/person/refresh
METHOD: GET

---

host:8080/api/person/user/:id
METHOD: GET

---

host:8080/api/person/getCodeRestore
METHOD: POST

---

host:8080/api/person/restorePassword
METHOD: PATCH

---

host:8080/api/person/changeInfoUser
METHOD: PATCH

---

--------------------------------project group (host:8080/api/project/)-----------------------------

host:8080/api/project/createnew
METHOD: POST

request body: 
{
    "projectName":"test_proj_1",
    "statusAccess":true
}
response body:
{
    "projectData": "e4700efe-0879-4b"
}

---

host:8080/api/project/delete
METHOD: DELETE

request body:
{
    "projectUid": "a1d9a970-c0bd-40"
}
response body:
{
    "result": true
}

---

host:8080/api/project/public-projects
METHOD: GET

request body:
{}
response body:
{
    "projects": [
        {
            "id": 4,
            "uid": "ccecd43e-f44d-49",
            "name": "test_proj_1",
            "miniature": null,
            "statusAccess": true,
            "layout": "{}",
            "createdAt": "2023-05-13T19:57:09.995Z",
            "updatedAt": "2023-05-13T19:57:09.995Z"
        },
        {
            "id": 5,
            "uid": "5da99613-4316-46",
            "name": "test_proj_1",
            "miniature": null,
            "statusAccess": true,
            "layout": "{}",
            "createdAt": "2023-05-13T19:57:11.143Z",
            "updatedAt": "2023-05-13T19:57:11.143Z"
        },
        .
        .
        .
    ]
}

---

host:8080/api/project/project-info/:id
METHOD: GET

request body:
{}
response body:
{
    "projectInfo": {
        "id": 1,
        "uid": "a1d9a970-c0bd-40",
        "name": "test_proj",
        "miniature": null,
        "statusAccess": false,
        "layout": "{}",
        "createdAt": "2023-05-13T19:34:47.576Z",
        "updatedAt": "2023-05-13T19:34:47.576Z"
    }
}

---

host:8080/api/project/update
METHOD: POST

request body:
{
    "projectUid": "a1d9a970-c0bd-40",
    "newLayout": "{fuck}"
}
response body:
{}


-----------------------------build system group (host:8080/api/build-system/)---------------------------

host:8080/api/build-system/start-build

request body:
{
    "projectUid": "test"
}
response body:
{
    "result": 200
}

---

------------------------------------------endpoints list------------------------------------------