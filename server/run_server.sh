# Migrate
if ! python manage.py migrate; then
  echo "Failed to migrate"
  exit 1
fi


# Create test superuser if it does not exist yet
echo "Creating superuser..."
if ! python manage.py createsu; then
    echo "Failed to create superuser"
    exit 1
else
  echo "User already exists"
fi
echo "done!"

python manage.py runserver 0.0.0.0:8000