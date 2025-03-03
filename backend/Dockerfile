FROM golang:1.24

RUN adduser runner
RUN mkdir -p /home/runner/wordle_guesser
WORKDIR /home/runner/wordle_guesser

COPY ./ .
COPY go.mod go.sum ./
RUN go mod download

ENV DATA_DIRECTORY="/home/runner/wordle_guesser/data"

RUN go build -v -o /usr/local/bin/app ./cmd/api/main.go
EXPOSE 8080

CMD ["app"]
