# tmUp - Inspired by asana:

<!-- [Heroku link][heroku]

[heroku]: -->

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


## Design Docs
* Wireframes - I will use actual asana as a guiding tool for my front end work. I don't plan to make any customizations.
* [DB schema][schema]

<!-- [views]: ./docs/views.md -->
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: User Authentication (~1 day)
I will implement user authentication in Rails based on practices learned at App
Academy. By the end of this phase user will be able to create new account, login,
and receive welcome email (via sendgrid). The most important part
of this phase will be pushing the app to Heroku and ensuring that everything works
before moving on to phase 2.

[Details][phase-one]

### Phase 2: Workspaces, projects (~1 day)
I will implement both Rails models and controllers and Backbone models,
collections, and views for workspaces and projects. At this point users would
be able to create new workspaces and projects.

[Details][phase-two]

### Phase 3: Tasks and comments (~1 day)
I will implement both Rails models and controllers and Backbone models,
collections, and views for tasks and comments. At this point users would
be able to create new tasks in their projects and add comments.

[Details][phase-two]

### Phase 4: Project Teams and Task Assignments (~1 day)
I will add the functionality to add team members to your project and assign
tasks to different members.

[Details][phase-four]

### Phase 5: CSS / Bootstrap / Catchup (~2 days)
I plan to prettify my app using CSS and bootstrap as it has all the basic
features at this point. I also wanted to have one buffer day in the middle to
make sure I have time to complete any tasks I haven't completed from previous
phases before I move on.

### Phase 6: All tasks (by due date) / All tasks (by project) (~1 days)
I will add two views to either sort all tasks by due dates or project. I will
also allow users to see completed tasks in both views if they choose to do so.

[Details][phase-six]

### Phase 7: Followings and User notification (~1 days)
I will add user notification feature for new task assignment, comments on
assigned tasks and any tasks users are following and any CSS that is necessary
for these features.

[Details][phase-seven]


### Bonus Features (TBD)
- [ ] Search for tasks by keywords in title
- [ ] Search for tasks by tag
- [ ] User profile picture
- [ ] Calendar view + sync feature with personal calendar
- [ ] OmniAuth with Google
- [ ] Chat feature using third party plugin
- [ ] "Like" button for a task


[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2-3.md
[phase-four]: ./docs/phases/phase4.md
[phase-six]: ./docs/phases/phase6.md
[phase-seven]: ./docs/phases/phase7.md
