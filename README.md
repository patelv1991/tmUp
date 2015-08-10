# tmUp - Inspired by asana:

[Heroku link][heroku]

[heroku]:

## Minimum Viable Product
tmUp is a clone of Asana built on Rails and Backbone. Users can:

<!-- This is a Markdown checklist. Use it to keep track of your progress! -->

- [ ] Create accounts
- [ ] Create sessions (log in)
- [ ] Create workspaces
- [ ] Create projects
- [ ] Add team members to a projects
- [ ] Create tasks and subtasks
- [ ] Assign a task/subtask to a team member
- [ ] Follow a task
- [ ] Comment on a task
- [ ] Sort tasks by due dates
- [ ] View taks on a calendar
- [ ] Receive a notification upon task completion by other team members.
- [ ] Search for tasks by keywords in title
- [ ] Search for tasks by tag

## Design Docs
* Wireframes - I will use actual asana as a guiding tool for my front end work. I don't plan to make any customizations.
<!-- * [View Wireframes][views] -->
* [DB schema][schema]

<!-- [views]: ./docs/views.md -->
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: User Authentication, Rails backend (~2 days)
I will implement user authentication in Rails based on the practices learned at
App Academy. By the end of this phase, users will be able to create new accounts,
login, and receive welcome email(via sendgrid). I will also set up the rails
back-end with necessary models and controllers. At this point, users should be
able to create workspaces, projects, tasks, and comments, add other users to
their project, and assign task all through rails console. The most important part
of this phase will be pushing the app to Heroku and ensuring that everything works
before moving on to phase 2.

<!-- [Details][phase-one] -->

### Phase 2: Backbone front-end (~3 days)
I will add API routes to serve workspaces, projects, tasks, and comments data as
JSON, then add Backbone models and collections that fetch data from those routes.
I will also add simple Backbone views so that by the end of this phase, users
will have access to most of the functionalities through front end, all inside a
single Backbone app.

<!-- [Details][phase-two] -->

### Phase 3: CSS / Bootstrap / Catchup (~3 days)
I plan to prettify my app using CSS and bootstrap as it has all the basic
features at this point. I also wanted to have one buffer day in the middle to
make sure I have time to complete any tasks I haven't completed from previous
phases before I move on.

<!-- [Details][phase-three] -->

### Phase 4: Sorting tasks / Completed task views (~1 days)
I will add a feature to sort tasks by due date and ability to view completed task.

<!-- [Details][phase-four] -->

### Phase 5: Followings and User notification (~1 days)
I will add user notification feature for new task assignment, comments on
assigned tasks and any tasks users are following and any CSS that is necessary
for these features.

<!-- [Details][phase-five] -->

### Phase 6: Search tasks (~1-2 days)
I will implement search feature to search tasks by keywords in title and/or by
due dates.

### Bonus Features (TBD)
- [ ] Calendar view + sync feature with personal calendar
- [ ] OmniAuth with Google
- [ ] "Like" button for a task
- [ ] Chat feature using third party plugin


<!-- [phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md -->
