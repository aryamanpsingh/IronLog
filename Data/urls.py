from rest_framework import routers
from .api import ExerciseViewSet, RoutineViewSet, WorkoutViewSet, CreateWorkoutAPI, UpdateWorkoutAPI
from django.urls import include, path


router = routers.DefaultRouter()
router.register('api/exercise', ExerciseViewSet, 'exercise')
router.register('api/routine', RoutineViewSet, 'routine')
router.register('api/list', WorkoutViewSet, 'workout')
urlpatterns = router.urls

urlpatterns += [
    path('api/workout/create/', CreateWorkoutAPI.as_view(), name='create'),
    path('api/workout/update/', UpdateWorkoutAPI.as_view(), name='update')
]
