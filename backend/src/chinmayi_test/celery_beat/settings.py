# -*- coding: utf-8 -*-
from __future__ import annotations

# noinspection PyUnresolvedReferences
from chinmayi_test.settings_base import *

CELERY_BEAT_SCHEDULE = {
    "collect_data": {
        "task": "data_collection.tasks.collect_current_btc_price",
        "schedule": 60.0,
    },
}
