json.workspaces @resultData['workspaces'] do |workspace|
  json.extract! workspace, :id, :title, :created_at, :updated_at
end

json.team_members @resultData['users'] do |member|
  json.partial! 'users/user', user: member
end

json.projects @resultData['projects'] do |project|
  json.partial! 'api/projects/project', project: project
end

json.my_tasks @resultData['tasks'] do |task|
  json.partial! 'api/tasks/task', task: task
end
