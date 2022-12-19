mkdir -p /back-end/wordlebot/static
python /back-end/wordlebot/manage.py collectstatic --clear --no-input
python /back-end/wordlebot/manage.py runserver 0.0.0.0:8000