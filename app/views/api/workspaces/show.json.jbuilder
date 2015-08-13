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

# this could be refactored into partial
json.projects @workspace.projects do |project|
  json.extract! project, :title, :description, :workspace_id, :owner_id,
        :due_date, :created_at, :updated_at
  json.tasks project.tasks do |task|
    if task.assignee_id == current_user.id
      json.extract! task, :parent_task_id, :due_date, :project_id, :title,
                          :body, :created_at, :updated_at, :creator_id,
                          :assignee_id, :assignor_id, :completed
    end
  end
end
