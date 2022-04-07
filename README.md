# FrontEndProject_All_Pokemon

# Instructions to start application
# -	download all files from the git repository into a parent folder.
# -	navigate to the parent folder and type "ionic serve".
# -	react production script should auto run and open the application in a browser.
# - 	if you experience issues with opening the application, please utilize these steps:
# -		-delete the "build" folder in the parent directory.
# -		-delete the "node_modules" folder in the parent directory.
# -		-create a new empty "node_modules" folder in the parent directory.
# -		-delete the "package-lock.json" file in the parent directory.
# -		-run "sudo npm install" in the parent directry from a terminal window.
# -		-this should install all the required dependencies stated in package.json file into your "node_modules" folder.
# -		-run "sudo ionic build"
# -		-run "ionic serve"
##
##
## SPECIAL NOTE. Line 66 of the Tab_Overview file has the removeStorageItems() function commented out.  If you uncomment, and then comment out lines 68 - 123, the program will automatically remove
#	local storage upon application start, which might solve some freezing issues.  Thanks.


# Instruction for User Interface
# -	you can select the amount of cards avaialbe per view from 10 to 20 to 50 cards per view.
# -	you can sort the cards via the drop down button on the top right. you can sort by Name, Height, Weight.
# -	you can search for cards that contain your search criteria via Search Name, and Search Abilities input fields on the Top left.
# -	There is a next and back button to proceed incrementaly on the slides view.
# -	The full details of the pokemen will pop up when you click on details.
#- 	I added a clear storage button so that you can clear the local store if glitches start emerging.




# Conclusion
# -	Its not perferct.  I was not able to get the sorting completely ironed out.  The sorting, combined with state/local management tripped me up.  I'm sure I needed to clear some arrays..
#-	I was not able to display the cards like i wanted, per view in each page.  It would have been nice to have an even block distribution throughout the whole page.
#-	Additionally, the display images should be dynamic so that images will resize depending on the screen size.  I will have to spend more time to integrate that functionality accurately.
#-	I did most of my development on 20 pokemons, thus towards the end of my time, I raised the limit to 898.  There are definitely performace pathways I did not think about.  
#-	I assume an Async/Await type coding needs to be done to collect the pokemons in batches, not all at once.  Again, due to time, I can't address that at the moment.  I opted to keep the limit to 400.
