## General Assembly, Software Engineering Immersive - project 4
 
# Know Your Heritage 
A PostgreSQL, Python, Flask & React Full Stack Application which showcases UNESCO's world heritage list. The user is able to comment on sites and add their favourites to the wish list. 

Deployed on Heroku: know-your-heritage.herokuapp.com

Quick peek of the working app ⬇️

![app working](./frontend/images/.gif)


## Overview
The concept was to work remotely in a group of two for 7 days to create a full-stack web application. Using a Flask Framework to serve data from a PostgreSQL database to a React front end. The application must demonstrate the use of multiple relationships and CRUD functionality for the intended models. Plan and create an Entity Relationship Diagram, prior to moving on to development.
 
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

   
## Approach Taken

First we whiteboard it out the basic structure and functions of what we wanted to implement and also the stretch goals. We displayed the entity relationship between the models.
We built the user and site schema together and after split the work efficiently between us.
My focus was on the back end which relies heavily on serializers to populate response bodies. I was working on the CRUD controller functions and also the email verification. Later on help to create the wishlist both backend and frontend.

## Method
 
**Email Verification**

To create the email verification functionality I used the SendGrid Email API. 
The documentation was pretty straight forward , although I got some issues with implementing it to Python since I was fairly new to the language. After a bit of reading I managed to make it work.

```
@router.route('/signup', methods=['POST'])
def signup():
    request_body = request.get_json()
    user = user_schema.load(request_body)
    email = user.email
    try:
      valid = validate_email(email)
      email = valid.email
      # user verification by email 
      def send(user):
        base_URL = 'https://know-your-heritage.herokuapp.com'
        message = Mail(from_email = "whprojectapp2020@gmail.com",
          to_emails = user.email,
          subject = "Email verification from WH",
          html_content = f'<a href="{base_URL}/verification/{user.id}">Please verify your email address</a>'
          )
        try:
          sg = SendGridAPIClient(os.environ['SENDGRID_API_KEY'])
          response = sg.send(message)
          print(response.status_code)
          print(response.body)
          print(response.headers)
        except Exception as e:
          print(str(e), message)
    except EmailNotValidError as e:
      return str(e)
    user.save()
    send(user)

    return user_schema.jsonify(user), 200

```

**Search** 

I also contributed with the search function. In my previous project the search function came from the front end. This time I decided to make a new `search endpoint`  on the backend. This was a nice challenge for me, I got to know better the `list comprehension` in python. I was pretty pleased with this slick solution. 

```
  @router.route('/search/<name>', methods=['GET'])
def search(name):
    sites = Site.query.all()
    matches = [site for site in sites if name.lower() in site.country.lower()]
    return site_schema.jsonify(matches, many=True), 200

 ```
## Challenges


To add the right serializers is an area I'll definitely spend more time researching best practices and reading up on. This project showed us the endless capabilities when working with entity relational databases. Although it was a challenge for me to connect the dots, when implementing a new relation. 

We used the Google Places API to get the pictures for the app. Unfortunately during our development period we used up the number of requests given by the API. We managed to get a new key for the deployment, but this is one of the key lessons learned in this project. 


# Summary

If given more time, we would have liked to spend it to show the sites in a scalable map page, show other sites recommendation on the single page, search in city or site names with more filters. 

Overall,  we both enjoyed the project a lot and are excited to continue work on it, so these features will be added over time.
 

