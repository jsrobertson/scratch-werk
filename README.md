#Scratch werk

##Prerequisites

* [node](git config --global push.default simple)
* [bower](http://bower.io/)
* [grunt](http://gruntjs.com/)

##Getting started

1. clone repo
2. npm install
3. grunt setup

##Some instructions

These will be improved over time when functionality is confirmed, however, here are some to get started.

###Creating a new page

Create a new .hbs file in the templates/pages directory and include the following YAML front-matter as a starting point.

```yaml
---
title: About us
navigation:
  status: true
  order: 2
---
```

Should you wish for the page to appear in the navigation, make sure that **navigation** is set to *true* and edit the **order** value for the page to appear in the desired position (left to right).

##Resources used

* [normalize.css](https://github.com/necolas/normalize.css/)
* [csswizardry-grids](https://github.com/csswizardry/csswizardry-grids)
* [jquery](http://jquery.com/)
* [modernizr](http://modernizr.com/)
* [grunt](http://gruntjs.com/)
* [assemble](http://assemble.io/)
* [lodash](https://github.com/lodash/lodash)
* [grunt-newer](https://github.com/tschaub/grunt-newer)
* [grunt-contrib-clean](https://github.com/gruntjs/grunt-contrib-clean)
* [grunt-contrib-sass](https://github.com/gruntjs/grunt-contrib-sass)
* [grunt-bowercopy](https://github.com/timmywil/grunt-bowercopy)
* [grunt-contrib-concat](https://github.com/gruntjs/grunt-contrib-concat)
* [grunt-contrib-connect](https://github.com/gruntjs/grunt-contrib-connect)
* [grunt-contrib-watch](https://github.com/gruntjs/grunt-contrib-watch)

Thank you to the authors and contributors of the above. :)
