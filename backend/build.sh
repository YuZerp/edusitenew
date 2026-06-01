#!/bin/bash
pip install -r requirements.txt
python manage.py collectstatic --noinput
python manage.py migrate

if [[ $CREATE_SUPERUSER ]];
then
    python manage.py createsuperuser --no-input --username admin --email admin@example.com
fi