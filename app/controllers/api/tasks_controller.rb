class Api::TasksController < ApplicationController
  def create
    @task = Task.new(task_params)
    if @task.save
      render json: @task
    else
      render json: @task.errors.full_messages, status: :unprocessable_entity
    end
    
  end

  private
    def task_params
      params.require(:task).permit(:parent_task_id, :due_date, :project_id,
                                   :title, :body, :created_at, :updated_at,
                                   :creator_id, :assignee_id, :assignor_id,
                                   :completed
                                 )
    end

end
