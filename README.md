Neos - Front End Developer Test

Candidate:Alfonso Florio

Working url: http://neostest.crystal-bits.co.uk

This "prototype" has been developer with Angular 1.5 and Angular material.
All the requirements have been met. 

It is the fruit of 1 day of work. While there is room for improvement I am quite happy of the UI. I have kept the styling at minimum, again a lot more could be done but I am for "more is less". 

It has been developer "mobile first" with a sidebar for the category management. It becomes fixed when the screen witdh > 960px;

For simplicity the tweets are recovered by a PHP proxy using application-type oAuth. No sensitive information is contained within the Angular project.

Also there are no routes, everything is kept within the same screen sharing data between different kind of content boxes.

I have also tried some simple animation for the list-items, unfortunately due to time restraint the result is not satisfactory and I have commented the code.

All the steps of the application bootstrapping happen within the files index.*.js 

I have created 2 different kind of services: **Tweets** that stores the search risults from the twitter api and **CatTweets** that stores the tweets categorized by the user.
Creating a data model for a single tweet whould have just added complexity without any real benefits.
I have also created some simple filters to format the single tweet on screen.
I have created the directive EnterKey so the search can be initiated also by pressing the enter key.

All the user interation is kept within **main/main.controller.js**

Do not hesitate to contact me if you have any questions

07459 301326 - lisophorm@gmail.com




