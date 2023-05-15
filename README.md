SCHEMA: https://drive.google.com/file/d/1HEZ827tZ4Dv7HuEkOSnChORGX_MSijwG/view?usp=sharing
tasks:
1. add owners service and controller +
2. add owners record with createEmptyProject +
3. create endpoints list +-
4. create endpoints body list +-
5. remove id field from response for projects endpoints +
6. add valid response to project controllers method updateProject
7. Отдельный эндпоинт для выборки последнего изменного проекта юзера (поле lastUpd). Вернуть сам проект +
8. 8080/api/project/public-projects через query пагинацию limit offset
9. апи для получения всех проектов юзера (аналогия со всеми Public проектами) с пагинацией. Через id юзера (важно именно через id) +
10. 8080/api/project/public-projects вернуть вместе с массивом проектов ключ size - количество всех проектов вне зависимости от пагинации +
11. апи для получения всех проектов юзера вернуть вместе с массивом проектов ключ size - количество всех проектов вне зависимости от пагинации +
12. change host:8080/api/projects/update to PATCH method
13. add valid error responses to project controller methods
14. add project controller methods: getUserIdByToken
15. изменение названия проекта, миниатюры (для sex с хранением картинок библиотека уже есть)
16. модифицировать таблицу юзера, добавить private (true/false) - невозможность просмотра профиля
17. при открытии чужого проекта и попытке изменить будет выдаваться окошко на фронте - добавить апи для копии проекта к себе
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
--------------------------------project group (host:8080/api/projects/)-----------------------------
host:8080/api/projects/createnew - authorization required!
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
host:8080/api/projects/delete - authorization required!
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
host:8080/api/projects/public-projects?p=1&l=5 - authorization required!
METHOD: GET
key "p" = page number
key "l" = limit of records per page
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
host:8080/api/projects/project-info/:id - authorization required!
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
host:8080/api/projects/update - authorization required!
METHOD: POST
request body:
{
    "projectUid": "a1d9a970-c0bd-40",
    "newLayout": "{fuck}"
}
response body:
{}
---
host:8080/api/projects/my-projects?p=1&l=5&userId=113 - authorization required!
METHOD: GET
key "p" = page number
key "l" = limit of records per page
key "userId" = get project for user id
request body:
{}
response body:
{
    "userProjects": {
        "count": 3,
        "rows": [
            {
                "id": 14,
                "uid": "f7e94642-2ade-47",
                "name": "test_proj_1",
                "miniature": null,
                "statusAccess": true,
                "layout": "{}",
                "createdAt": "2023-05-14T09:26:10.162Z",
                "updatedAt": "2023-05-14T09:26:10.162Z"
            },
            {
                "id": 15,
                "uid": "ddd10711-e888-4a",
                "name": "test_proj_1",
                "miniature": null,
                "statusAccess": true,
                "layout": "{fuck}",
                "createdAt": "2023-05-14T09:31:07.889Z",
                "updatedAt": "2023-05-14T10:23:33.510Z"
            },
            {
                "id": 17,
                "uid": "969f9677-dfdb-4f",
                "name": "test_proj_1",
                "miniature": null,
                "statusAccess": false,
                "layout": "{}",
                "createdAt": "2023-05-14T10:39:33.368Z",
                "updatedAt": "2023-05-14T10:39:33.368Z"
            }
        ]
    }
}

host:8080/api/projects/last-update-project/:userId
METHOD: GET

request body:
{}

response body:
{
    "id": 425,
    "uid": "f2ef8b03-d15b-4d",
    "name": "4141dadsaa",
    "miniature": null,
    "statusAccess": true,
    "layout": "{}",
    "createdAt": "2023-05-14T15:13:25.148Z",
    "updatedAt": "2023-05-14T15:13:25.148Z"
}


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
