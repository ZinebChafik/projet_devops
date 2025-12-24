from django.urls import path
from .views import *
urlpatterns= [
path('continent_listing/',continent_list    ),
path('country_listing/',post_list    ),
path('views/<int:pk>/',views_detail),
path('continent_listing/<int:pk>/',continent_detail    ),

]