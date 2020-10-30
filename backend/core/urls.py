from rest_framework import routers

from .views import ExperimentViewSet, RunViewSet


router = routers.DefaultRouter()
router.register(r'experiments', ExperimentViewSet)
router.register(r'runs', RunViewSet)
