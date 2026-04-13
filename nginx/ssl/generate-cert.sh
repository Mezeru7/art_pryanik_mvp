#!/bin/sh
# Скрипт генерации локального SSL-сертификата для HTTPS

mkdir -p nginx/ssl

openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout nginx/ssl/key.pem \
  -out nginx/ssl/cert.pem \
  -subj "/C=RU/ST=Moscow/L=Moscow/O=Art-Pryanik/CN=localhost"

echo "Сертификат создан: nginx/ssl/cert.pem"
echo "Ключ создан:       nginx/ssl/key.pem"
