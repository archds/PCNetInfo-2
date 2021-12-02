cp -r ./config ./server

# Migrate
if ! python3 server/manage.py migrate; then
  echo "Failed to migrate"
  exit 1
fi


# Create test superuser if it does not exist yet
if ! python3 server/manage.py shell -c "
import sys
from django.contrib.auth.models import User

user_exists = User.objects.filter(username='admin').exists()

sys.exit(0 if user_exists else 1)
"; then
  echo "Creating superuser \"admin:admin\"... "
  if ! python3 server/manage.py shell -c "
from django.contrib.auth.models import User

User.objects.create_superuser('admin', 'admin@example.com', 'admin')
  "; then
    echo "Failed to create superuser"
    exit 1
  fi
  echo "done!"
else
  echo "User \"admin\" already exists"
fi

python server/manage.py runserver 0.0.0.0:8000