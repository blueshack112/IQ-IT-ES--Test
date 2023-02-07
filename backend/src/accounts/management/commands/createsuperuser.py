# -*- coding: utf-8 -*-
"""
"""
import os

from django.contrib.auth import get_user_model
from django.contrib.auth.management.commands import createsuperuser


class Command(createsuperuser.Command):
    def handle(self, *args, **options):
        if (
            not options["interactive"]
            and get_user_model()
            .objects.filter(
                username=os.environ.get("DJANGO_SUPERUSER_USERNAME", "admin")
            )
            .exists()
        ):
            return
        return super().handle(*args, **options)
