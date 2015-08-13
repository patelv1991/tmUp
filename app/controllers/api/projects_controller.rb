class Api::ProjectsController < ApplicationController
  before_action :require_workspace_membership!

  def index
  end

  def create
  end

  def show
  end

  def destroy
  end
  private
    def current_workspace
      
    end

    def project_params
      params.require(:project).permit(:title, :description,
            :workspace_id, :owner_id, :due_date)
    end

end
