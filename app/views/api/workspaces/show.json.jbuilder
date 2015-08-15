# json.extract! @board, :id, :title, :created_at, :updated_at
#
# json.members @board.members do |member|
#   json.id member.id
#   json.email member.email
#   json.gravatar_url member.gravatar_url
# end
#
# json.lists @board.lists do |list|
#   json.extract! list, :id, :title, :ord, :created_at, :updated_at
#
#   json.cards list.cards do |card|
#     json.extract! card, :id, :title, :ord, :created_at, :updated_at
#   end
# end


json.extract! @workspace, :id, :title, :created_at, :updated_at

json.team_members @workspace.users do |member|
  json.partial! 'users/user', user: member
end

json.projects @workspace.projects do |project|
  json.partial! 'api/projects/project', project: project

end

json.my_tasks @workspace.projects.map(&:tasks).flatten do |task|
  if task.assignee_id == current_user.id
    json.partial! 'api/tasks/task', task: task
  end
end
