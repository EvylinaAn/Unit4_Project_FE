# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

### Description

For my final project I decided to create a personal blog as this has been my biggest reason for learning how to code and there was no way I was ending my course without developing a blog. I had a week to build a CRUDable application using Django REST, React.js and PostgreSQL, where only an authenticated user was authorised to CRUD some part of my application. 

### Deployment link
Find the deployed application here.

I have only allowed new post access to one user (owner) of the blog and new posts can only be added through django admin. 

![Alt text](../frontend/public/assets/img1.png)

![Alt text](../frontend/public/assets/img2.png)

The idea behind this is to give the blog owner access to admin to be able to add a new post including - Post Title, Content (tinymce), Category, Featured Photo and other Photos.

The owner is also able to add new looks from admin which lets them add a Photo, Looks Category and description. 

### Getting Started/Code Installation

Backend is hosted on localhost8000 -
Run the command python manage.py runserver to start the localhost.
Run pip install -r requirements.txt to install all dependencies in the requirements.txt file

Frontend is hosted on localhost3000 -
Run the command npm install to install the dependencies in the frontend.
Then run npm start to run localhost

### Timeframe & Working Team (Solo/Pair/Group)

This was a solo project to be completed in a week with the minimum requirements being a CRUDable application at some part of the project.

### Technologies Used

Frontend - HTML, CSS, JavaScript, React.js, react-Bootstrap, react-Icons,  Axios
Backend - Python, Django REST, JSON, jwt- decode, tinymce, S3
Other - GitHub, PostgreSQL

### Brief

*Technical Requirements
Fullstack application to be built using React.js frontend, Django REST framework for the backend and implement PostgreSQL for the database requirements.

The most important requirement was to have a part of the application CRUDable by an authenticated user where only if authorised could add, update or delete some part of the application. For my application I implemented CRUDing in the comments section of my post. 

Authenticate users using Django's built-in authentication.

Have at least one data entity (Model) in addition to the built-in User model. The related entity can be either a one-to-many (1:M) or a many-to-many (M:M) relationship. I chose to showcase both (1:M) as well as (M:M) relationships.

*Optional Requirements
Consume an API or upload images to AWS S3

### Planning

I spent day 1 planning my layout and ERD’s and then went on to make my to-do list. 

![Alt text](../frontend/public/assets/img3.png)
![Alt text](../frontend/public/assets/img4.png)
![Alt text](../frontend/public/assets/img5.png)
![Alt text](../frontend/public/assets/img6.png)
![Alt text](../frontend/public/assets/img7.png)
![Alt text](../frontend/public/assets/img8.png)
![Alt text](../frontend/public/assets/img9.png)

### Build/Code Process

I started the project by setting up my GitHub Repos and adding a remote to connect it to my application. I also split my project into 2 folders (backend and frontend) and had my GitHub reflecting the same.

I created separate apps to structure my backend and make my code more readable, starting with main_app, then implementing blog_app and looks_app. I changed my Database settings in settings.py and changed the default SQLLite3 to accept PostgreSQL. 
```
DATABASES = {
   'default': {
       'ENGINE': 'django.db.backends.postgresql',
       'NAME': os.environ['PGDATABASE'],
       'HOST': os.environ['PGHOST'],
       'PORT': os.environ['PGPORT'],
       'USER': os.environ['PGUSER'],
       'PASSWORD': os.environ['PGPASSWORD']
   }
}
```

I then set up my database in PostgreSQL, created all my models, serializers and class based views. I also set up my User and Group serializers, created a superuser and registered all my models in Django admin. I then went ahead and set my routes.

In order to connect my post to the post categories and implement a (M:M) relationship where a post can belong to many categories and my categories can have many posts I set up a many to many Field in my Post model

```
class Category(models.Model):
   category = models.CharField(max_length=200)


   def __str__(self):
       return self.category
    


class Post(models.Model):
   title = models.CharField(max_length=200)
   content = HTMLField()
   categories = models.ManyToManyField(Category)
   created_at = models.DateTimeField(default=timezone.now)


   def __str__(self):
       return self.title
  
   def get_absolute_url(self):
       return reverse('detail', kwargs={'post_id': self.id})
  
   class Meta:
       ordering = ['-created_at']
```

Also to implement a (1:1) and (1:M) relationship, I let a single post have 1 featured photo and multiple other images. I also had (1:M) relationships for post comments.

```
class Photo(models.Model):
   url = models.ImageField( max_length=254)
   post = models.ForeignKey(Post, on_delete=models.CASCADE)


   def __str__(self):
       return f"Photo url: {self.url}"
  
   class Meta:
       verbose_name_plural = 'photos'
      


class FeaturedPhoto(models.Model):
   url = models.ImageField( max_length=254)
   post = models.OneToOneField(Post, on_delete=models.CASCADE)


   def __str__(self):
       return f"Photo url: {self.url}"
  
   class Meta:
       verbose_name_plural = 'featuredPhotos'




class Comment(models.Model):
   created_at  = models.DateTimeField('comment added', default=timezone.now)
   updated_at = models.DateTimeField('last modified', auto_now=True)
   comment = models.TextField(max_length=300)
   post = models.ForeignKey(
       Post,
       on_delete=models.CASCADE
   )
   owner = models.ForeignKey(User, on_delete=models.CASCADE)
   username = models.CharField(max_length=250 )


   def __str__(self):
       return self.comment


   class Meta:
       ordering = ['-id']
```

For the serializers I implemented a connection with all the relationships to be able to retrieve JSON data
```
class PostSerializer(serializers.HyperlinkedModelSerializer):
   categories = serializers.SerializerMethodField()
   photos = serializers.SerializerMethodField()
   comments = serializers.SerializerMethodField()


   class Meta:
       model = Post
       fields = ['id', 'url', 'title', 'content', 'categories', 'photos', 'created_at', 'comments']


   def get_categories(self, obj):
       return [category.category for category in obj.categories.all()]
  
   def get_photos(self, obj):
       photos_queryset = obj.photo_set.all()
       photos_data = PhotoSerializer(photos_queryset, many=True).data
       return photos_data


   def get_comments(self, obj):
       request = self.context.get('request')
       comments_queryset = obj.comment_set.all()
       comments_data = CommentSerializer(comments_queryset, many=True, context={'request': request}).data
       return comments_data
```

I implemented CBV, to view comments, retrieve a single comment and add comments. 
```
class CommentViewSet(viewsets.ModelViewSet):
   queryset = Comment.objects.all()
   serializer_class = CommentSerializer


   def retrieve(self, request, *args, **kwargs):
       instance = self.get_object()
       serializer = self.get_serializer(instance)
       return Response(serializer.data)
  
   @api_view(['POST'])
   def create_comment(request, *args, **kwargs):
       print(request)
       post_id = kwargs.get('pk')
       user_id = request.user.id
       user = User.objects.get(id=user_id) 
       post = Post.objects.get(pk=post_id)
       comment_text = request.data.get('comment_text')
       comment = Comment.objects.create(post=post, comment_text=comment_text, user=user)
       return Response({'message': 'Comment created successfully'})
```

I also used the same logic to set the other views.

For the routes I used Djangos built in routing.

```
router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'groups', views.GroupViewSet)
router.register(r'posts', views.PostViewSet)
router.register(r'categories', views.CategoryViewSet)
router.register(r'looks', views.LookViewSet)
router.register(r'looksCategories', views.LooksCategoryViewSet)
router.register(r'comments', views.CommentViewSet)
router.register(r'photos', views.PhotoViewSet)
router.register(r'featuredPhoto', views.FeaturedPhotoViewSet)
```

To allow the owner to upload images for each east post I set an inline declaration in admin.py
```
class PhotoInline(admin.TabularInline):
   model = Photo


class PhotoAdmin(admin.ModelAdmin):
   list_display = ('post', 'url') 
   fields = ('post', 'url')


class PostAdmin(admin.ModelAdmin):
   inlines = [PhotoInline, FeaturedPhotoInline]


admin.site.register(Post, PostAdmin)
admin.site.register(Photo, PhotoAdmin)
```

For my frontend I started with installing the required dependencies to run a react app. 

I set up all the required files and folders required in my src folder, implemented browser router as router, added all my navigation links to nav.jsx, and then added all the routes to app.jsx. I then made sure all the links were working and good to go. 

I first started with fetching my post from my database to make sure it was visible in the frontend along with the images.
```
const [posts, setPosts] = useState([
   {
     title: "",
     content: "",
   },
 ]);


 const fetchPosts = async () => {
   try {
     const response = await axios.get(`${backendURL}/posts`, {
       headers: {
         "Content-Type": "application/json",
       },
     });


     const result = response.data;
     setPosts(result);
   } catch (e) {
     console.error(e);
   }
 };


 const fetchSinglePost = async (postId) => {
   try {
     const response = await axios.get(`${backendURL}/posts/${postId}`, {
       headers: {
         "Content-Type": "application/json",
       },
     });
     const result = response.data;
     setSinglePost(result);
   } catch (e) {
     console.error(e);
   }
 };


 const allPostImages = async () => {
   try {
     const response = await axios.get(`${backendURL}/photos`, {
       headers: {
         "Content-Type": "application/json",
       },
     });
     const result = response.data;
     setAllPostImgs(result);
   } catch (e) {
     console.error(e);
   }
 };


 const fetchFeaturedImage = async () => {
   try {
     const response = await axios.get(`${backendURL}/featuredPhoto`, {
       headers: {
         "Content-Type": "application/json",
       },
     });
     const result = response.data;
     setFeaturedImg(result);
   } catch (e) {
     console.error(e);
   }
 };
 ```

I then displayed my single post along with images in the single post page.

```
     {loading ? (
       <div>Loading... </div>
     ) : (
       <>
         <h2 className="postTitle">{singlePost.title}</h2>
         <Carousel fade className="postCarousel">
           {featuredImg &&
             featuredImg.map(
               (img) =>
                 img.post === parseInt(postId) && (
                   <Carousel.Item key={img.id}>
                     <img
                       src={img.url}
                       alt="Featured"
                       className="d-block w-100"
                     />
                   </Carousel.Item>
                 )
             )}
           {allPostImgs.map(
             (img, index) =>
               img.post === parseInt(postId) && (
                 <Carousel.Item key={index}>
                   <img
                     src={img.url}
                     alt={`${index + 1}`}
                     className="d-block w-100"
                   />
                 </Carousel.Item>
               )
           )}
         </Carousel>
         <div
           dangerouslySetInnerHTML={{ __html: singlePost.content }}
           className="postContent"
         />
       </>
     )}
```

As the idea of a blog is to have it available to any viewer I hadn’t implemented login at this stage and only implemented it after I was properly able to view my posts. I then implemented login/signup and logout at the bottom of each post, making it so that if a user wants to make a comment on a post they will have to either login or signup and once logged in the login button than dynamically changes to logout letting them logout as soon as the comment is made. 

I also made it so that the logged in user can only edit or delete their own comments and no one else’s and any user whether logged in or not can read all the comments made on the post.

```
 const handleAddComment = async (e) => {
   e.preventDefault();
   try {
     const commentData = {
       comment: newComment,
       post: postId,
       owner: current_user,
       username: username
     };
     console.log(commentData);
     const result = await axios.post(`${backendURL}/comments/`, commentData, {
       headers: {
         Authorization: `Bearer ${localStorage.getItem("access_token")}`,
         "Content-Type": "application/json",
       },
     });
     console.log(result)
     fetchComments();
     setNewComment("");
   } catch (err) {
     console.error(err);
   }
 };


 const handleDeleteComment = async (commentId) => {
   try {
     await axios.delete(`${backendURL}/comments/${commentId}/`, {
       headers: {
         Authorization: `Bearer ${localStorage.getItem("access_token")}`,
       },
     });
     fetchComments(postId);
   } catch (err) {
     console.error(err);
   }
 };


 async function editComment(selectedCommentId, updatedComment) {
   try {
     const commentData = {
       comment: editedComment,
       post: postId,
       owner: current_user,
     };
     await axios.put(
       `${process.env.REACT_APP_BACKEND_URL}/comments/${selectedCommentId}/`, commentData
     );
     fetchComments();
   } catch (e) {
     console.log("Error editing schedule", e);
   }
 }
 ```

Once I had all my functionality working for my posts I implemented my Looks view that would display images of looks that I posted along with a short description. Even though I gave the owner of the blog access to add looks from the Django Admin I also implement create and delete looks from the frontend only if the logged in user is the owner of the blog.

Once I had all my functionality working I then went on to feed my posts and looks to all the pages that needed the same to be displayed and finally finished up on the styling.

### Challenges

As this was the first time I integrated 2 different technologies namely React and Django, most of the project was really a big challenge to be able to connect the backend to my frontend. Starting with understanding how serializers in the Django REST framework works. I did quite a lot of reading, researching and testing to understand how to get everything I needed in JSON format in order to be able to fetch data from the frontend. I also had a few issues working with S3 and understanding Django’s built in routing. 

I also wanted to implement an image plugin in tinymce to let the owner add images as they go while writing a post. Unfortunately, due to lack of time to research on how to get the plugin working, I finally settled on adding the additional photo models to my post and went on to display all the images as a carousel.

### Wins

I have to say that my biggest win was being able to beautifully integrate the 2 technologies and present a fully functional blog application at the end of it. Also, properly planning my project at the start was what made a huge difference to my progress. 

As mentioned in my challenges, figuring out a way to display the images without the plugin was a hassle, however I am extremely proud of how I decided to go about it and did not waste a lot of time worrying that it wasn’t going to look the way I intended it to.

Adding the inline photo and featured photo views for posts in Django Admin was a bit of a challenge as well that took quite a few hours of research and trials to make it work.

Also implementing the login and signup functionality in the frontend was a big challenge and I can say I spent the most time trying to figure out how that worked.

### Key Learnings/Takeaways
As mentioned in my wins, I am extremely proud of the fact that I can now implement 2 different technologies, especially considering how greatly seamless the Django REST framework is. 

I believe that having used React quite a bit now, I feel very comfortable and quite confident in understanding the usage and I would most probably stick to using React for its seamless SPA usage in the frontend.

I also feel comfortable using Django, Django REST and I am able to now navigate around in PostgreSQL. 

End of project 4 and I can definitely say that I feel extremely comfortable with stand ups and also helping my teammates.


### Future Improvements

I would like to work on my styling, to make it look a bit better than it does now and make it mobile responsive.  

I also want to implement react quill in the frontend so that (only) the owner can also create a new post from the frontend and hopefully implement a feature for them to be able to add images as they go both in the frontend and in tinymce. 

Lastly, I want to add a contact form, such as an email format where any viewer can reach out to me by directly sending an email out from the form in the frontend

### Backend Git Repo Link
https://github.com/EvylinaAn/unit4_Project_Backend