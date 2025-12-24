from rest_framework import serializers
from .models import Post, Continent

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = [
            'id',
            'name_of_the_country',
            'image',
            'image_2',
            'image_3',
            'image_4',
            'continent',
            'praragraph_that_represents_the_country',
            'paragraph_of_the_pros',
            'paragraph_of_the_cons',
            'link',
            'created_at'
        ]

class ContinentSerializer(serializers.ModelSerializer):
    posts = PostSerializer(many=True, source='post_set')
    class Meta:
        model = Continent
        fields = ['id', 'name', 'posts','description']