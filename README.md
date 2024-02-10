# Loop 🔄

<i>Discover events, societies and more at your university.</i>

## Setup

Make sure you have the following prerequisites installed on your system:

1. NodeJS (`v18.7.0` or above)
2. NPM (`v9.0.0` or above)
3. Python (`v3.9` or above)

Clone the repository to a desired location on your system:

```shell
git clone https://github.com/Caramel-Labs/loop.git
```

Navigate into the cloned directory:

```shell
cd loop
```

### The Frontend

To setup the Loop frontend, navigate to the `client` folder from the root folder:

```shell
cd client
```

Install the required packages:

```shell
npm install
```

Launch a development server:

```shell
npm run dev
```

### The Backend

To setup the Loop backend, navigate to the `api` folder from the root folder:

```shell
cd api
```

Install the required packages:

```shell
npm install
```

Launch a development server:

```shell
node index.js
```

### The Chatbot

To setup the Loop chatbot, navigate to the `chatbot` folder from the root folder:

```shell
cd chatbot
```

Install the required packages:

```shell
pip install -r requirements.txt
```

Launch the chatbot API service:

```shell
python main.py
```

### The Chatbot

To setup the Loop recommendation engine, navigate to the `recommender` folder from the root folder:

```shell
cd recommender
```

Install the required packages:

```shell
pip install -r requirements.txt
```

Launch the recommender API service:

```shell
python main.py
```

---

After the above steps have been completed, open up `localhost:3000` in the browser to view the Loop app.

It is recommended to open Loop in a <b>360 x 800</b> screen size.

---

This project is licensed under the <a href="https://github.com/Caramel-Labs/loop/blob/main/LICENSE">Apache License</a>.