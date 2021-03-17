# JS230PracticeProject

## Project Main Features
###1.   Lists all available contacts.
###2.   Add a new contact.
###3.   Edit an existing contact.
###4.   Search for contacts with a common tag.
###5.   Search for contacts by name.
###6.   Add a new tag to a contact.
###7.   Add an existing tag to a contact.

### Error Checking
There is quite a bit of error checking in this project, which is described below.
Error checks for name, email, and phone:
1.  All name, email, and phone entries must exist.
2.  Then name must have at least 2 characters.
3.  The phone number must have exactly 10 digits.
4.  The email must be in '*@*' format.
5.  For the add contact form one cannot use an existing name, email, or phone.
6.  For the edit contact form one cannot use another name, email, or phone from another email.

For the tags, one cannot create a new tag which already exists.

### Major Design Decisions
1.  Model View Controller (MVC) pattern.
2.  The model took the responsibility of caching data, extracting data, and formatting data for the view.
3.  The view made heavy use of *Handlebars.js* and its only purpose was to receive and display data.  I was
intentional in keeping logic out of the view.
4.  Controller Design
    1.  I decided to have a number of separate controllers which each had a specific purpose, rather than one
    large controller which did a number of different things.
    2.  Essentially each controller served as the link between the model and the view.  Based on the user's
    action, the controller would extract data from the model and serve it to the view.
5.  Controllers
    1.  *AddContractController*: Brought up the add contact form and when properly filled out, submitted a request to
    the API to add a single contact.
    2.  *DeleteContactController*: Verified the user wanted to delete a contact, if so then submitted a request to the
    API to delete a single contact.
    3.  *EditContactController*: Brought up the edit contact form and when properly filled out, submitted a request to
    the API to update the contact with the edited data.
    4.  *FormErrorController*: All error checking was done with this controller, including tag errors.
    5.  *GetAllContactsController*: Fetched all the contact data from the API and updated the cached values for
    all contacts and unique tags.
    6.  *SearchController*: Performed the search operation keying off the contact name.
    7.  *TagController*: Performed all operations on tags, except error checking tags, added a new tag and added a
    tag from existing tags.
 6. *Helpers* I had a separate file for miscellaneous actions which really could not be put under the purview of any
controller.  The actions chosen were mainly deploying the focus listeners and preparing the form data for submission
by converting it to JSON.
7.  Delegation - Initially, I could not figure out how to put an event listener on an element once it came into existence,
this issue was the result of using a templating engine like *Handlebars.js*.  This meant I had to delegate the event to
the document object and discern what event was taking place.  At the end of the project I figured out how to do this.
For instance for both the AddContactController and EditContactController, once the forms were brought up, I could then
attach the event listener to the submit buttons, instead of delegating to the document.  I figured this out too late in
in the projet, but this is a change I would make.    
    
### Other Design Decisions
1.  I decided, after some failures and a number of delays, to stick with using *XMLHttpRequest* instead of *fetch*.  My
confidence in working with Javascript Promises is not yet at the point where I am willing to risk an assessment by using
them.
2.  There was probably a more clever way or efficient way to implement the tags in the view.  However, for me the
easiest solution to but style and code for was to associate a button with a given tag action.
3.  As a observation, I spend a lot of time debugging using the developer tools.  At the end of the project I was
started to wonder if acceptance testing would have actually reduced by turnaround time.  I plan to run this project
through an acceptance testing library (probably *Cypress*) and see if that might actually speed development.
4.  I started this project twice and scraped the first two attempts, this is why it took so long.  Even though I used
PEDAC each time, I did not go into enough detail on my high level designs.  In the first attempt I was using
*XMLHttpRequest* but because my high level design did not have enough specificity, my code became very disorganized
in a short order.  For my second attempt I tried to use *fetch* but I ran into too many issues because I really was
not confident in handling Javascript Promises.  Finally, I went back to the drawing board a third time and gave a lot
of thought to breaking up responsibilities among the controllers, view, and model.  It really helped that I wrote unit
tests for the model, as I was now confident the model would work as long as a controller called it properly.  The same
for the view, as it only took in data and presented.
5.  I could have used a switch statement at the top level, in the *contactsApp* instead of an object. I decided to
keep the object because I had started out with that and it worked, so I did not want to take a chance and break
something that already worked.    
