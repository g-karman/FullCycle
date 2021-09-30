FROM golang:alpine as stage1

WORKDIR /go/src/app
COPY . .

RUN go get -d -v ./...
RUN go install -v ./...

RUN go build -o /go/bin/app

FROM scratch

WORKDIR /app

COPY --from=stage1 /go/bin/app /go/bin/app

ENTRYPOINT ["/go/bin/app"]