###This is the branch front-end development will happen on :)

![image](https://cloud.githubusercontent.com/assets/5458180/8791470/4f758e90-2f29-11e5-8f29-98886c74cb52.png)

**Frontend Demo:** http://elementalcode.github.io/Elemental/  
**Backend Demo:** http://elementalcode.herokuapp.com/

Scratch Forums topic: https://scratch.mit.edu/discuss/topic/134554/
## Project Goal
The goal of Elemental is to act as a bridge between [Scratch](http://scratch.mit.edu/) and front-end web technology. Any and all design decisions will focus on teaching how to write clean, easy-to-read, valid front-end code. There should be as little opportunity for error as possible, thus bridging the syntax gap. Users of Elemental should not be expected to continue using Elemental once they become advanced users. Instead, they should be encouraged to convert to text-based code, for a quicker, more powerful, and more extensible coding experience.


## Project information
* Code style
    * Css style guide: http://google-styleguide.googlecode.com/svn/trunk/htmlcssguide.xml
    * JS style guide: http://google.github.io/styleguide/javascriptguide.xml
* Never push directly to the gh-pages or master branch
    * Always create a new branch with a name describing the additions to the branch
    * Only merge once the code has been tested and works
* The style of the front end will be green and grey
    * Green colours:
        * Light - #2ecc71, rgb(46,204,113)
        * Dark - #27AE60, rgb(39,174,96)
        * Extra Dark - #3D7555, rgb(61,117,85)
    * Grey colours:
        * Regular - #323232, rgb(50,50,50)
        * Extra Dark - #1D1E1A, rgb(29,30,26)
* Webapp plans
    * Saving
        * html, css and js will be converted to json to allow easy saving of script data and location of scripts on the workspace
        * files will be compressed into a .zip file for saving
        * html, css and js will be named example.html.json, example.css.json and exmaple.js.json to easily identify the file type
        * Assets will also be saved in the project zip
        * Directory structure will be respected in the zip files. (The sprite pane in scratch is a directory viewer)
    * Running
        * Webpages will be compiled from json to their respected file types (html, css, and js)
        * Webpages will be shown in a sandboxed iframe in the stage pane

### Dev Notes
If you're an Elemental Dev, be sure to read the [Dev Notes](https://github.com/ElementalCode/Elemental/wiki/Dev-Notes) to get up to speed on the rules and regulations for creating with the ElementalCode team. Happy coding! :)