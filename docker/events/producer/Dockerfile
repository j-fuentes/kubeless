FROM python:2.7.11-alpine

RUN apk add --no-cache python py-pip git
RUN pip install --upgrade pip
RUN pip install kafka-python

ADD prod.py .

CMD ["python", "/prod.py"]
