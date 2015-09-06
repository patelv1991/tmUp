# [tmUp - Inspired by asana][link]

[link]: https://www.tmup.work/

## What is it?
tmUp is a full stack, collaborative project management web application inspired
by Asana and built using Rails and Backbone.

## Current Features
- [x] Create new workspaces / teams
- [x] Invite team members via email (Invite multiple people simultaneously)
- [x] Remove team members from your workspace or leave workspace
- [x] Add / edit / delete projects in your workspace
- [x] Add new tasks in your projects
- [x] Edit task details in place by double clicking any task
- [x] Delete a task or mark it as complete
- [x] Show / hide completed tasks
- [x] Assign tasks to different team members
- [x] Give them deadline
- [x] See tasks that are past due in red
- [x] Views all tasks assigned to you from all projects in one place
- [x] View all tasks assigned to anyone else in your team by visiting their page

## Features under Development
- [ ] Implement a search feature
- [ ] Add task show page
- [ ] Allow users to create nested subtasks
- [ ] Use ActionMailer to send welcome email
- [ ] Calendar view of all tasks

## Technical Details
### Software Specs
- [Ruby 2.1.2](https://www.ruby-lang.org/en/)
- [Rails 4.2.3](http://rubyonrails.org/)
- [JavaScript6 (ES6)](https://www.javascript.com/)
- [Backbone.js 1.2.3](http://backbonejs.org/)
- [Bootstrap 3.3.5](http://getbootstrap.com/)
- [PostresSQL 9.4.4.0](http://www.postgresql.org/)
- Deployed on [Heroku](https://www.heroku.com/home)

### JavaScript Plug-ins
- [Bootstrap-datepicker](https://bootstrap-datepicker.readthedocs.org/en/latest/#)
- [Cookies.JS](https://github.com/js-cookie/js-cookie)
- [IntroJS](http://usablica.github.io/intro.js/)

## Database Schema
- Users
- Workspaces
- Workspace Memberships
- Projects
- Tasks
