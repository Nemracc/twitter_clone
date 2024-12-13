INSERT INTO
    "users" (
        "user_id",
        "user_name",
        "user_account",
        "user_avatar",
        "user_verified",
        "user_password",
        "user_token"
    )
VALUES (
        1,
        'Adrian',
        '@adrian',
        'male-05.jpg',
        'f',
        '$2b$10$KbCQxn76oQiYUVfjMSSRiOs/PRWoc86clb7b05ndbbGqZUaK0A5q2',
        NULL
    );

INSERT INTO
    "users" (
        "user_id",
        "user_name",
        "user_account",
        "user_avatar",
        "user_verified",
        "user_password",
        "user_token"
    )
VALUES (
        2,
        'Alfredo',
        '@alfredo',
        'male-03.jpg',
        't',
        '$2b$10$JVMEIYgxtw1hU5tZ7A6xEOWlXo5AMJBOVxBEcU5xdlLu7G.U6O98a',
        NULL
    );

INSERT INTO
    "users" (
        "user_id",
        "user_name",
        "user_account",
        "user_avatar",
        "user_verified",
        "user_password",
        "user_token"
    )
VALUES (
        3,
        'Omar',
        '@omar',
        'male-05.jpg',
        't',
        '$2b$10$fH8bKnaYmKJ74ezNf/ZzI.wDXxiWJ923skzksV2ovZQ5rBscJNagG',
        NULL
    );

INSERT INTO
    "users" (
        "user_id",
        "user_name",
        "user_account",
        "user_avatar",
        "user_verified",
        "user_password",
        "user_token"
    )
VALUES (
        4,
        'Lorena',
        '@lorena',
        'female-06.jpg',
        't',
        '$2b$10$7VcEozaHHAWoTLutMJwhFOSrxodF8kIw.BgGLntYIhPe64sQDapXu',
        NULL
    );

INSERT INTO
    "users" (
        "user_id",
        "user_name",
        "user_account",
        "user_avatar",
        "user_verified",
        "user_password",
        "user_token"
    )
VALUES (
        5,
        'Alejandro',
        '@lejandro',
        'male-03.jpg',
        'f',
        '$2b$10$Z87h8Xn/VTZSNJQTNqxQkuJnmdqRuR5gLdCCtcu1VJgeGuxQ8gpha',
        NULL
    );

INSERT INTO
    "users" (
        "user_id",
        "user_name",
        "user_account",
        "user_avatar",
        "user_verified",
        "user_password",
        "user_token"
    )
VALUES (
        6,
        'Rosa',
        '@rosa',
        'female-06.jpg',
        'f',
        '$2b$10$oZfdyd7IJ/TVPu6uIJPHvu5oOCPOiNU0O/..lcnC3YzTrAB2fCeJW',
        NULL
    );

INSERT INTO
    "users" (
        "user_id",
        "user_name",
        "user_account",
        "user_avatar",
        "user_verified",
        "user_password",
        "user_token"
    )
VALUES (
        7,
        'Sofia ',
        '@sofia ',
        'female-06.jpg',
        'f',
        '$2b$10$nSeM9RMHbU7IM4rnYcmg4OP44HAFGjGweq80GkPKZ9YBMjwzIw9c6',
        NULL
    );

INSERT INTO
    "users" (
        "user_id",
        "user_name",
        "user_account",
        "user_avatar",
        "user_verified",
        "user_password",
        "user_token"
    )
VALUES (
        8,
        'Hernan ',
        '@hernan ',
        'male-05.jpg',
        'f',
        '$2b$10$2VQUf4jg6ZQ5Z3gOMOjcvuy6iW.ym8ipAXNLwmOQ3hiR7TXMeITmO',
        NULL
    );

INSERT INTO
    "tweets" (
        "tweet_text",
        "tweet_img_url",
        "user_id"
    )
VALUES (
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. 
	Aliquid itaque veritatis eaque numquam minima nostrum assumenda.',
        '',
        1
    );

INSERT INTO
    "tweets" (
        "tweet_text",
        "tweet_img_url",
        "user_id"
    )
VALUES (
        '¡Reto de JavaScript!
¿Cuál es la salida en consola del siguiente código?',
        'https://pbs.twimg.com/media/FybSjDQXoAA6oHv?format=jpg&name=small',
        3
    );

INSERT INTO
    "tweets" (
        "tweet_text",
        "tweet_img_url",
        "user_id"
    )
VALUES (
        '🛰️ Aquí está el satélite de los estudiantes de 
@platzi
Estará en órbita a:
Altura de 218 Km
Velocidad de 28,000 Km/h
Llevado por un cohete Falcón 9 de SpaceX, este lunes. 
Misión Transporter-8 desde California. 
Estaremos cubriendo el lanzamiento',
        'https://pbs.twimg.com/media/FySEusDXgAIMtGB?format=jpg&name=small',
        2
    );

INSERT INTO
    "tweets" (
        "tweet_text",
        "tweet_img_url",
        "user_id"
    )
VALUES (
        '6 alternativas a Github Copilot para ayudarte a programar... ¡Gratis!<br>
1️⃣ Tabnine
2️⃣ CodeGeeX
3️⃣ Code Whisperer
4️⃣ Codeium
5️⃣ GPT-Code-Clippy
6️⃣ Captain Stack',
        'https://pbs.twimg.com/media/FyUseExXoAEhrsl?format=jpg&name=small',
        4
    );

INSERT INTO
    "tweets" (
        "tweet_text",
        "tweet_img_url",
        "user_id"
    )
VALUES (
        'Inicio de semana = Café + JavaScript',
        '',
        5
    );

INSERT INTO
    "tweets" (
        "tweet_text",
        "tweet_img_url",
        "user_id"
    )
VALUES (
        'A google crhome le gusta esta publicácion',
        'https://www.xtrafondos.com/thumbs/1_4213.jpg',
        6
    );

INSERT INTO
    "tweets" (
        "tweet_text",
        "tweet_img_url",
        "user_id"
    )
VALUES (
        'La silla.Exe dejó de funcionar',
        'https://www.xtrafondos.com/thumbs/1_8312.jpg',
        7
    );

INSERT INTO
    "tweets" (
        "tweet_text",
        "tweet_img_url",
        "user_id"
    )
VALUES (
        '"¡Solo por curiosidad, ¿estás utilizando exclusivamente funciones de flecha (=>) o todavía te mantienes fiel a la sintaxis de funciones tradicionales? ¡Sin ningún tipo de juicio!"',
        NULL,
        8
    );