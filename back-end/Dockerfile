FROM python:latest
WORKDIR /back-end
COPY . .
RUN pip install -r requirements.txt
RUN mkdir -p /back-end/shareloft/static/
EXPOSE 8000