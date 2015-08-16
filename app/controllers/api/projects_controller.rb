class Api::ProjectsController < ApplicationController

  def index
  end

  def create
    @project = Project.new(project_params)

    if @project.save
      render json: @project
    else
      render json: @project.errors.full_messages, status: :unprocessable_entity
    end

  end

  def show
  end

  def destroy
  end
  private

    def project_params
      params.require(:project).permit(:title, :description,
            :workspace_id, :owner_id, :due_date)
    end

end
