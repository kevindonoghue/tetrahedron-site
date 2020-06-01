FROM ubuntu

RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \

WORKDIR /app

ADD . /app

RUN pip3 install -r requirements.txt
RUN pip3 install uwsgi

CMD ["uwsgi", "app.ini"]
