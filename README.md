# Define-your-world

## Things I fixed
1. I organized your project. I made folders for the images, js, and css files. I also fixed the syntax of the heads of your html docs. Along with this, I have changed the links in your project so they reflect the new directory structure.
2. I repointed your firebase to my database that I will share with you. You guys were supposed to have shared this with an instructor.
3. I reorganized your javascript and made it so that it wouldn't check for location on every single page. The only page we need to check for location on is the page where someone is looking at the map.
4. I changed the ID of the textarea to "storyInput" and called that from the function that saves to firebase.
5. Finding things near me:
  * I created a "current_location" variable. (see lines 18 and 127 of feed.js)
  * Next I did some research and found something called the Haversine Formula. This is pretty much what we want to use. It's a spherical trigonometry formala, and it is going to be badass to use so that we can say we used this and learned what it was. To read more about the formula, [check this out...] https://en.wikipedia.org/wiki/Haversine_formula
