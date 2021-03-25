### ![GA](https://cloud.githubusercontent.com/assets/40461/8183776/469f976e-1432-11e5-8199-6ac91363302b.png) General Assembly, Software Engineering Immersive
 
# Know Your Heritage 
A PostgreSQL, Python, Flask & React Full Stack Application which showcases UNESCO's world heritage list. The user is able to comment on sites and add their favourites to the wish list. 


Quick peek of the working app ⬇️

![app working](heritage.gif)


## Overview
The concept was to work remotely in a group of two - I have contributed with [Baltasar Romero](https://github.com/Baromeg) - for 7 days to create a full-stack web application. Using the Flask Framework to serve data from a PostgreSQL database to a React front end. The application must demonstrate the use of multiple relationships and CRUD functionality for the intended models. Plan and create an Entity Relationship Diagram, prior to moving on to development.
 
## Brief
- Build a full-stack application by making your own database using PostgreSQL
- Build a complete product - multiple relationships and CRUD functionality for the models
- Navigate the database using Python & Flask with SQLAlchemy
- Work with REST-ful design to serve data programmatically
- Build a professional front end design with React
- Collaborate via Git and GitHub
- Deploy the application online

 
## Technologies Used

- Python & Flask
- PostgreSQL
- Marshmallow & SQLalchemy
- React & Javascript
- Bulma
- Bcrypt & JWT
- Insomnia 
- Git and GitHub 
- Heroku
- Mapbox (React-MapGL)
- Cloudinary
- Google API's

   
## Approach Taken

First we used a virtual whiteboard to flesh out the basic structure and functions that we wanted to implement and also figure out the stretch goals. We created an entity relationship diagram;
built the user and site schema together to make sure we both are on the same page. This allowed us to split the work efficiently.
My focus was on the back end which heavily relies  on `serializers` to populate response bodies. I was working on the `CRUD` controller functions and also the email verification. Later on helped to create the wishlist both backend and frontend.

## Method
 
**Email Verification**

To create the email verification functionality I used the [SendGrid Email API](https://sendgrid.com/docs/API_Reference/index.html). 
The documentation was pretty straight forward, although I got some issues at first with implementing it in `Python` since I was fairly new to the language. After a bit of reading I managed to make it work.

```python
def send(base_URL,sender,user):
  message = Mail(from_email = sender,
    to_emails = user.email,
    subject = "Email verification from WH",
    html_content = f'<a href="{base_URL}/verification/{user.id}">Please click here to verify your email address</a>'
    )
  try:
    sg = SendGridAPIClient(os.environ['SENDGRID_API_KEY'])
    response = sg.send(message)
  except Exception as e:
    print(str(e), message)
```
The email is sent upon successful login. 

```python
@router.route('/signup', methods=['POST'])
def signup():
    request_body = request.get_json()
    user = user_schema.load(request_body)
    email = user.email
    try:
      valid = validate_email(email)
      email = valid.email
    except EmailNotValidError as e:
      return str(e), 400
    try: 
      user.save()
    except exc.IntegrityError as e:
      return str(e.orig.args), 409
    send('https://know-your-heritage.herokuapp.com', 'whprojectapp2020@gmail.com', user)
    return user_schema.jsonify(user), 200
```

**Search** 

I also contributed with the search function. In my previous project the search was done on the front end. Since that is not scalable I decided to challenge myself and implement the `search endpoint` this time on the backend. I used `list comprehension` to solve the task elegantly in `Python`.


```python
  @router.route('/search/<name>', methods=['GET'])
def search(name):
    sites = Site.query.all()
    matches = [site for site in sites if name.lower() in site.country.lower()]
    return site_schema.jsonify(matches, many=True), 200

 ```
## Future Enhancements
 - Ratings to be imported from google or tripadvisor,
 - Adding a section of "popular locations" nearby in the single page,
 - Pagination and filtering options
 
## Challenges

This is the first project I have used `Python` for. One of the challenges was that in `Python` there is an extra layer of `serializers` between the objects   and their `JSON` form  compare to `javaScript`. Getting these right certainly took some time researching of best practices and reading up on the subject.

Working with a relational database was also a challenge that I had to overcome. After you understand the core concepts it is quite clear that it offers a robust solution for modeling complex domains. 

## Lessons learned

We used the Google Places API to get the pictures for the app. Unfortunately during our development period we used up the number of requests given by the API. We managed to get a new key for the deployment in time and had a successful demo. Paying attention to `API` quotas and monitoring your usage was certainly  one of the key lessons learned in this project. 


# Summary

We had lots more ideas that we couldn't fit in the timescale. Such as showing the sites on a scalable map page, displaying recommendations on the single page and extending the search functionality with additional filters. 

We both enjoyed the project learned a lot especially about `Python`, `RDBMS`. We are excited to continue work on it, so these features will be added over time.
 

