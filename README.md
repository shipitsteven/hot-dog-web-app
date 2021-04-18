# Dog Haus - Full Stack Web App

[![Netlify Status](https://api.netlify.com/api/v1/badges/595ccb16-3d46-4e57-ad8a-a8a17308c069/deploy-status)](https://app.netlify.com/sites/hotdog-webapp/deploys)  

[Live Demo](https://hotdog-webapp.netlify.app/)

This project aims to imitate a hot dog stand business like the one in New York City.  
There are three distinct views: Customer, Vendor, and System Admin. Each designed with its own features to accommodate the various needs of the user.

## Technology

Front end: React, Semantic UI, Formik (forms), Yup (form validation), Cirrus UI  
Back end: Node.js, Express, MySQL, ClearDB (Heroku)  
Third Party API: Google Maps, Places, Geocoding  
Hosting: Heroku (server), Netlify (client)  

## Design decisions

This was my first project using React. Thus, there's a some simplification of certain engineering approaches. One that stands out is the lack of user authentication. In a real business site, this would be essential. However, due to time constraint, and the sake of practicing a new framework. I hope to integrate user authentication in a future project, currently there's no plan to bring authentication to this project.

Online payment is also not included for the same reason stated above.

Semantic UI and Cirrus UI are used to reduce time spent decorating UI components.

ClearDB is the substitution for MySQL that resides on the Heroku server.

## Preview

### Customer

![Customer view](Docs/Readme%20Preview/customer.gif)

### Vendor

![Vendor view](Docs/Readme%20Preview/vendor.gif)

### Admin

![Admin View](Docs/Readme%20Preview/admin.gif)

-----------------------

## Thanks for stopping by! 🌭😊

If you have comments, you can find my contact in the `resume` repo.

-----------------------
> This project was original developed for course AD320 Web Application Development @ North Seattle College
