class Api::ProjectsController < ApplicationController

  before_action :require_signed_in!

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
    @project = Project.find(params[:id])
    @tasks = @project.tasks
    render :show
  end

  def destroy
  end
  private

    def project_params
      params.require(:project).permit(:title, :description,
            :workspace_id, :owner_id, :due_date)
    end

end
