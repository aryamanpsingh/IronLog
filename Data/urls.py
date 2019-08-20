from rest_framework import routers
from .api import ExerciseViewSet, RoutineViewSet, WorkoutViewSet, CreateWorkoutAPI, UpdateWorkoutAPI, CreateRoutineAPI
from django.urls import include, path


router = routers.DefaultRouter()
router.register('api/exercise', ExerciseViewSet, 'exercise')
router.register('api/routine', RoutineViewSet, 'routine')
router.register('api/list', WorkoutViewSet, 'workout')
urlpatterns = router.urls

urlpatterns += [
    path('api/create/workout/', CreateWorkoutAPI.as_view(), name='create-workout'),
    path('api/update/workout/', UpdateWorkoutAPI.as_view(), name='update-workout'),
    path('api/create/routine/', CreateRoutineAPI.as_view(), name='create-routine'),
]
