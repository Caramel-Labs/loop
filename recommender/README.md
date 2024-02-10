# Loop Recommender Engine

This is the event recommendation engine for the Loop app.

Built with:
1. FastAPI
2. Pydantic
3. Uvicorn

## Setup

### Prerequisites

The recommender engine has very few prerequisites, which are probably already installed on your system:

1. <a href="https://git-scm.com/">Git</a> version control system
2. <a href="https://www.python.org/">Python</a> (recommended to have a version greater than 3.9.0)

To run the recommender engine locally on your machine, follow these steps:

### 1. Clone Project

Clone the project to a desired location (folder) on your machine by opening up a terminal from the folder and entering the following command:

```shell
git clone https://github.com/Caramel-Labs/loop-recommender-engine.git
```

Next, move into the `loop-recommender-engine` project directory:

```shell
cd loop-recommender-engine
```

### 2. Activate Virtual Environment

A virtual environment will help you keep the recommender engine's dependencies isolated from the global system of Python packages. To setup your virtual environment, first ensure that `virtualenv` is installed on your system:

```shell
pip install virtualenv
```

To create and activate a virtual environment, enter the following commands after moving into the `loop-recommender-engine` folder as done in the previous step:

```shell
# Create a virtual environment named 'env':
python -m venv env

# Activate the virtual environment (Windows):
env\Scripts\activate.bat

# Activate the virtual environment (MacOS / Linux):
source env/bin/activate
```

Your terminal will now include an `(env)` prefix, indicating a successful activation of the virtual environment:

```shell
# On Windows:
(env) drive:\folder\...loop-recommender-engine>

# On MacOS and Linux
(env) user@computer:~/...loop-recommender-engine$
```

To deactivate the virtual environment (and remove the `(env)` prefix):

```shell
deactivate
```

### 3. Install Dependencies

After activating the virtual environment, you can install all of the necessary dependencies with a single command:

```shell
pip install -r requirements.txt
```

<a href="https://github.com/Caramel-Labs/loop-recommender-engine/blob/main/requirements.txt">`requirements.txt`</a> includes all of the project's dependencies and their respective versions.

### 4. Store Environment Variables

Create a file named `.env` to store the connection string to the MongoDB database:

```shell
# add this to the .env file:

MONGO_URI_STRING="insert-your-mongodb-connection-uri-here"
```

### 5. Start FastAPI App

Start up the FastAPI server:

```shell
python main.py

# or

python3 main.py
```

Uvicorn will then serve the recommender engine on <a>http://localhost:8000</a>.

---

Made with :heart: by Ravindu Aratchige. Licensed under the <a href="https://github.com/Caramel-Labs/loop-recommender-engine/blob/main/LICENSE">Apache License<a>.
