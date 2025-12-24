from django.contrib import admin

from .models import *
# Register your models here.
class PostInline(admin.StackedInline):
    model=Post
    extra = 1
@admin.register(Continent)
class ContinentAdmin(admin.ModelAdmin):
    list_display=['name']
    search_fields=['name']
    list_filter=['name']
    ordering=['name']
    inlines =[PostInline]
