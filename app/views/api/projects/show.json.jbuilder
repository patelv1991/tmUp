json.partial! 'api/projects/project', project: @project

json.tasks @project.tasks.each do |task|
  json.partial! 'api/tasks/task', task: task
end
