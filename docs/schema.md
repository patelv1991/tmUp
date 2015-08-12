# Schema Information

## users
column name    | data type | details
---------------|-----------|-----------------------
id             | integer   | not null, primary key
fname          | string    | not null
lname          | string    | not null
email          | string    | not null, unique, index
password_digest| string    | not null
session_token  | string    | not null, unique, index

## workspaces
column name    | data type | details
---------------|-----------|-----------------------
id             | integer   | not null, primary key
title          | string    | not null, unique, index

## user_workspaces
column name    | data type | details
---------------|-----------|-----------------------
id             | integer   | not null, primary key
user_id        | integer   | not null, foreign key (ref users), index
workspace_id   | integer   | not null, foreign key (ref workspaces), index

## projects
column name    | data type | details
---------------|-----------|-----------------------
id             | integer   | not null, primary key
title          | string    | not null
description    | string    |
workspace_id   | integer   | not null, foreign key (ref workspaces), index
owner_id       | string    | foreign key (ref users), index
due_date       | date      |

## team_assignments
column name    | data type | details
---------------|-----------|-----------------------
id             | integer   | not null, primary key
project_id     | integer   | not null, foreign key (ref projects), index
member_id      | integer   | not null, foreign key (ref users), index

## tasks
column name    | data type | details
------------   |-----------|-----------------------
id             | integer   | not null, primary key
creator_id     | integer   | not null, foreign key (ref users)
parent_task_id | integer   | foreign key (self referencing key)
due_date       | date      |
project_id     | integer   | not null, foreign key (ref projects)
title          | string    | not null
body           | string    |
completed      | boolean   | not null, Defaults: false
assignee_id    | integer   | foreign key (users)
assignor_id    | integer   | foreign key (users)

## comments
column name    | data type | details
---------------|-----------|-----------------------
id             | integer   | not null, primary key
task_id        | integer   | not null, foreign key (tasks), index
commenter_id   | integer   | not null, foreign key (users), index

## attachments
column name    | data type | details
---------------|-----------|-----------------------
id             | integer   | not null, primary key
task_id        | integer   | not null, foreign key (tasks), index

## followings
column name    | data type | details
---------------|-----------|-----------------------
id             | integer   | not null, primary key
task_id        | integer   | not null, foreign key (ref tasks), index
followers_id   | integer   | not null, foreign key (ref users), index
