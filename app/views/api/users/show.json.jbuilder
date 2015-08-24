json.extract! @user, :id, :fname, :lname, :email

json.projects @projects do |project|
  json.extract! project, :title, :description, :workspace_id, :owner_id,
                         :due_date, :created_at, :updated_at
end

json.tasks @projects.map(&:tasks).flatten do |task|
  if task.assignee_id == @user.id
    json.partial! 'api/tasks/task', task: task
  end
end
