from django.db import models




# Create your models here.
class Continent(models.Model):
    name = models.CharField(max_length = 200)
    description=models.TextField(default="")
    def __str__(self):
        return self.name
class Post(models.Model):
    continent = models.ForeignKey(Continent,on_delete=models.CASCADE)
    name_of_the_country = models.CharField(max_length = 200)
    image = models.ImageField(upload_to='Image_Of_The_Country',blank=True,null=True)
    image_2 = models.ImageField(upload_to='Image_Of_The_Country',blank=True,null=True)
    image_3 = models.ImageField(upload_to='Image_Of_The_Country',blank=True,null=True)
    image_4 = models.ImageField(upload_to='Image_Of_The_Country',blank=True,null=True)
    praragraph_that_represents_the_country = models.TextField()
    paragraph_of_the_pros = models.TextField()
    image_of_the_pros = models.ImageField(help_text="optionnal",upload_to="Image_of_the_pros/",null=True,blank=True)
    paragraph_of_the_cons = models.TextField()
    image_of_the_cons = models.ImageField(help_text="optionnal",upload_to="Image_of_the_cons/",null=True,blank=True)
    link = models.URLField(default='#')
    created_at = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.name_of_the_country