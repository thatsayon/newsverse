from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from predict.models import UserInfo
import re 

User = get_user_model()


class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    address = serializers.CharField(max_length=120, write_only=True)
    region = serializers.CharField(max_length=120, write_only=True)
    country = serializers.CharField(max_length=120, write_only=True)
    favourite_topics = serializers.ListField(
        child=serializers.CharField(max_length=60), write_only=True
    )
    lang = serializers.ListField(
        child=serializers.CharField(max_length=2), write_only=True
    )

    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'full_name', 'date_of_birth', 'gender',
                  'address', 'region', 'country', 'favourite_topics', 'lang')

    def validate_password(self, value):
        if len(value) < 8:
            raise serializers.ValidationError(
                "Password must be at least 8 characters long.")
        if not any(char.isupper() for char in value):
            raise serializers.ValidationError(
                "Password must contain at least one uppercase letter.")
        if not any(char.islower() for char in value):
            raise serializers.ValidationError(
                "Password must contain at least one lowercase letter.")
        if not any(char.isdigit() for char in value):
            raise serializers.ValidationError(
                "Password must contain at least one digit.")
        if not re.search(r"[!@#$%^&*()_+{}\[\]:;\"'\\|<,>.?/`~-]", value):
            raise serializers.ValidationError(
                "Password must contain at least one special character.")
        validate_password(value)
        return value

    
    def create(self, validated_data):
        favourite_topics = validated_data.pop('favourite_topics', [])
        user_data = {
            'username': validated_data['username'],
            'email': validated_data['email'],
            'password': validated_data.pop('password'),
            'full_name': validated_data['full_name'],
            'date_of_birth': validated_data['date_of_birth'],
            'gender': validated_data['gender'],
            'favourite_topics': favourite_topics,
            'is_active': False
        }
        
        user = User.objects.create_user(**user_data)
        
        fav_topic = {topic: 1 for topic in favourite_topics}
        
        user_info_data = {
            'user': user,
            'address': validated_data['address'],
            'region': validated_data['region'],
            'country': validated_data['country'],
            'fav_topic': fav_topic,
            'lang': validated_data['lang']
        }
        
        UserInfo.objects.create(**user_info_data)
        
        return user
    
class UserLoginSerializer(serializers.Serializer):
    username = serializers.CharField(required=False)
    email = serializers.EmailField(required=False)
    password = serializers.CharField(style={'input_type': 'password'})

    def validate(self, attrs):
        username = attrs.get('username')
        email = attrs.get('email')

        if not (username or email):
            raise serializers.ValidationError("Username or email is required")

        return attrs

class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)

    def validate_new_password(self, value):
        if len(value) < 8:
            raise serializers.ValidationError(
                "Password must be at least 8 characters long.")

        if not any(char.isupper() for char in value):
            raise serializers.ValidationError(
                "Password must contain at least one uppercase letter.")

        if not any(char.islower() for char in value):
            raise serializers.ValidationError(
                "Password must contain at least one lowercase letter.")

        if not any(char.isdigit() for char in value):
            raise serializers.ValidationError(
                "Password must contain at least one digit.")

        if not re.search(r"[!@#$%^&*()_+{}\[\]:;\"'\\|<,>.?/`~-]", value):
            raise serializers.ValidationError(
                "Password must contain at least one special character.")

        validate_password(value)

        return value

class EmailUpdateSerializer(serializers.Serializer):
    new_email = serializers.EmailField(required=True)

class UsernameExistorNotSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=120)