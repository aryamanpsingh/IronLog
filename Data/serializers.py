from rest_framework import serializers, permissions
from Data.models import Exercise, Workout, Routine


class ExerciseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exercise
        fields = '__all__'


class WorkoutSerializer(serializers.ModelSerializer):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    exercise = ExerciseSerializer(many=True)

    class Meta:
        model = Workout
        fields = ['name', 'exercise']


class CreateWorkoutSerializer(serializers.ModelSerializer):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    exercise = ExerciseSerializer(many=True)

    class Meta:
        model = Workout
        fields = ['name', 'exercise', 'created_at']

    def create(self, validated_data):
        exercises_data = validated_data.pop('exercise')
        workout = Workout.objects.create(**validated_data)
        for exercise_data in exercises_data:
            workout.exercise.add(Exercise.objects.create(
                workout=workout, **exercise_data))
        return workout


class UpdateWorkoutSerializer(serializers.ModelSerializer):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    exercise = ExerciseSerializer(many=True)

    class Meta:
        model = Workout
        fields = ['name', 'exercise', 'created_at']

    def validate(self, data):
        if (Workout.objects.filter(name=data['name']).count() == 0):
            raise serializers.ValidationError("Workout name doesn't exist")
        return data

    def update(self, instance, validated_data):
        exercise = validated_data.pop('exercise')
        instance = super().update(instance, validated_data)
        for exercise_data in exercises_data:
            instance.exercise.add(Exercise.objects.create(
                workout=instance, **exercise_data))
        return instance


class RoutineSerializer(serializers.ModelSerializer):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    workout = WorkoutSerializer(many=True)

    class Meta:
        model = Routine
        fields = ['name', 'workout', 'length']


class CreateRoutineSerializer(serializers.ModelSerializer):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    workout = WorkoutSerializer(many=True)

    class Meta:
        model = Routine
        fields = '__all__'

    def create(self, validated_data):
        workouts_data = validated_data.pop('workout')
        print("workouts_data")
        print("exercises_data")
        routine = Routine.objects.create(**validated_data)
        routine.save(owner=self.request.user)
        for workout_data in workouts_data:
            exercises_data = workout_data.pop('exercise')
            new_workouts = Workout.objects.create(
                routine=routine, **workout_data)
            routine.workout.add(new_workouts)
            for exercise_data in exercises_data:
                new_workouts.exercise.add(Exercise.objects.create(
                    workout=routine.workout, **exercise_data))
        return routine
