from rest_framework import viewsets, permissions, generics
from .serializers import ExerciseSerializer, RoutineSerializer, CreateWorkoutSerializer, UpdateWorkoutSerializer, CreateRoutineSerializer
from .models import Exercise, Routine, Workout


class ExerciseViewSet (viewsets.ModelViewSet):
    serializer_class = ExerciseSerializer
    queryset = Exercise.objects.all()


class RoutineViewSet (viewsets.ModelViewSet):
    serializer_class = RoutineSerializer
    queryset = Routine.objects.all()


class WorkoutViewSet (viewsets.ModelViewSet):
    serializer_class = CreateWorkoutSerializer
    queryset = Workout.objects.all()


class CreateWorkoutAPI (generics.CreateAPIView):
    serializer_class = CreateWorkoutSerializer
    queryset = Workout.objects.all()
    permission_classes = [permissions.AllowAny]


class UpdateWorkoutAPI (generics.UpdateAPIView):
    serializer_class = UpdateWorkoutSerializer
    queryset = Workout.objects.all()
    permission_classes = [permissions.AllowAny]

    def get_object(self):
        return Workout.objects.get(name=self.request.data['name'])


class CreateRoutineAPI (generics.CreateAPIView):
    serializer_class = CreateRoutineSerializer
    queryset = Routine.objects.all()
    permission_classes = [permissions.AllowAny]
