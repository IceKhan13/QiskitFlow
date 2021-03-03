from django.contrib.auth.models import User
from django.core.management import BaseCommand

from qiskitflow_backend import settings


class Command(BaseCommand):
    def handle(self, *args, **options):
        for line in settings.ADMINS:
            username, password, email = line.split(",")
            if User.objects.filter(username=username).exists():
                print("Admin user {} already exists".format(username))
            else:
                admin = User.objects.create_superuser(email=email, username=username, password=password)
                admin.is_active = True
                admin.is_admin = True
