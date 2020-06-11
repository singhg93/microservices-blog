FROM python:3.8-slim

WORKDIR /src

COPY ./requirements.txt  /src

RUN python3 -m pip install -r requirements.txt

COPY . /src

ENV FLASK_APP=app
ENV FLASK_ENV=development
ENV FLASK_RUN_HOST=0.0.0.0
ENV LC_ALL=C.UTF-8
ENV LANG=C.UTF-8
ENV DATABASE_URI=postgresql://devuser:devpassword@db/devdatabase
ENV TEST_DATABASE_URI=postgresql://testuser:testpassword@testdb/testdatabase

expose 5000

# CMD ["flask", "run"]
CMD gunicorn -w 4 -b 0.0.0.0:5000 "app:create_app()"
