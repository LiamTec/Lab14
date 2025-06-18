from dataclasses import field, fields
from os import write
from rest_framework import serializers
from .models import Serie, Category
from django.contrib.auth.models import User

        
class CategorySerializer(serializers.HyperlinkedModelSerializer):
    
    class Meta:
        
        model = Category
        
        fields = ('id' , 'description')


class SerieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Serie
        fields = ('id', 'name', 'description', 'img', 'category')
        
    def get_category_description(self, obj):
        return obj.category.description

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)
    
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']