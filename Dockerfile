FROM python:3.9.5-buster

WORKDIR .

COPY . .

RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 5000

ENTRYPOINT ["npm"]

CMD ["start"]