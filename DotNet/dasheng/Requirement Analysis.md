# Requirement Analysis

## Outline

- Overview 
- User management 
- Reservation module
- Map module
- Customer engagement model
- Social check-in module



## Overview

1. [C] Bootstrap for responsive web design(RWD)

2. [C] Diagram for aspects fitting - https://www.draw.io *

3. [C] Usability Design Review *

4. [C] A Checklist of the site functionality 

5. [C] User Story based Modulars

   

6. [D] Database first (Entity Relationship Diagram) - MySQL Workbench

7. [D] Data Dictionary

   

8. [HD] Code and Fix method 

9. [HD] Version control - Git

10. [HD] 1 basic module and 1 advanced module



## User Module

1. [C] Log in & Log out (Using Microsoft Identity) 
2. [C] Must be a "Date" present as one of the values stored 



## Reservation Module

1. [Basic] Make reservation - Data Time selection, reservation status
2. [Advanced] 
   - For customers:
     - Conflict prevention, email notification (create/reschedule/cancel)
   - For Administrator
     - Manage reservation (confirm/reschedule/cancel)



## Map Module

1. [Basic] Manipulate maps - Place of interest, custom map marker
2. [Advanced] 
   - Navigation between two places
   - Link several places to form a trip
   - Save trip & route info, dynamic update route with places of interest



## Customer Engagement Module

1. [Basic] Contribute the website - post comments

2. [Advanced] 

   - For customers:
     - WYSIWYG editor (所见即所得编辑器)
     - File upload
     - reCAPTCHA (一种验证码)

   - For Administrator

     - Approve/disapprove post
     - Achive inactive users
     - Edit newsletter template
     - Newsletter batch sending

     

## Social check-in Module

1. [Basic] Check-in location - add friends
2. [Advanced]
   - For customer
     - Identify current location to check-in
     - Interact - like/favourite a check-in, Restful API (3rd party integration - Zomato, 4 square, Flickr)

