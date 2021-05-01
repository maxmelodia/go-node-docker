FROM golang:1-alpine3.6 AS builder

## Criamos um diretório / app no qual colocaremos todo o código do nosso projeto
RUN mkdir /app
ADD . /app
WORKDIR /app

## Queremos construir o executável binário de nosso aplicativo
RUN CGO_ENABLED=0 GOOS=linux GOARCH=386 go build -o main ./...

FROM scratch AS production
## Temos que copiar a saída de nosso "builder stage" para nosso estágio de produção

COPY --from=builder /app .
## podemos então lançar nosso recém-compilado binário executável
CMD ["./main"]