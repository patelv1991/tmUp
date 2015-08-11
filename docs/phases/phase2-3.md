# Phase 2: Workspaces, projects, tasks, and comments

## Rails
### Models
* workspaces
* projects
* tasks
* comments

### Controllers
* Api::WorkspacesController (create, destroy, edit, index, show, update)
* Api::ProjectsController (create, destroy, edit, index, show, update)
* Api::TasksController (create, destroy, edit, index, show, update)
* Api::CommentsController (create, destroy, edit, index, show, update)

### Views
* api/workspaces/index.json.jbuilder
* api/workspaces/show.json.jbuilder
* api/workspaces/_workspace.json.jbuilder
* api/projects/index.json.jbuilder
* api/projects/show.json.jbuilder
* api/projects/_project.json.jbuilder
* api/tasks/index.json.jbuilder
* api/tasks/show.json.jbuilder
* api/tasks/_tasks.json.jbuilder
* api/comments/index.json.jbuilder
* api/comments/show.json.jbuilder
* api/comments/_comments.json.jbuilder


## Backbone
### Models
* workspace
* project
* taks
* comment

### Collections
* workspaces
* projects
* tasks
* comments

### Views
* WorkspaceForm
* WorkspaceShow (subviews: AllTaskIndex, ProjectIndex, WorkspaceTeamIndex)
* WorkspaceTeamIndex (subviews: WorkspaceTeamIndexItem)
* ProjectIndex (subviews: ProjectIndexItem)
* ProjectIndexItem (subviews: ProjectShow)
* ProjectShow (Subviews: ProjectTasksIndex, ProjectTeamIndex)
* ProjectTaskIndex / AllTaskIndex (subviews: TaskIndexItem)
* TaskIndexItem (subview: TaskAssignmentShow)
* TaskShow (subviews: CommentsIndex)
* CommentsIndex (subview: CommentsIndexItem)

## Gems/Libraries
