class Api::WorkspacesController < ApplicationController
  before_action :require_signed_in!

  def create
    @workspace = current_user.workspaces.new(workspace_params)
    if @workspace.save
      render json: @workspace
    else
      render json: @workspace.errors.full_messages, status: :unprocessable_entity
    end
  end

  def index
    @workspaces = current_user.workspaces
    render json: @workspaces
  end

  def show
    # this can be optimized using joins
    # w = current_user.workspaces.includes(projects: :tasks).where(tasks: {assignee_id: current_user.id})
    # w = current_user.workspaces.includes(projects: :tasks).where("workspaces.id = ?", params[:id]).where(tasks: {assignee_id: 1})
    # above two lines return workspace. Need to get projects and tasks from that.
    # But, this time, it doesn't go back to database.
    # w.map {|space| space.projects.map(&:tasks)}.flatten


    @workspace = current_user.workspaces.includes(:users, projects: :tasks).find_by_id(params[:id])

    if @workspace
      render :show
    else
      render json: ["You aren't a member of this board"], status: 422
    end
    #
    # if workspaces.where(id: params[:id]).exists?
    #   @workspace = workspaces.select { |ws| ws.id.to_s == params[:id] }.first # find(params[:id])
    # else
    # end

  end

  def destroy
    @workspace = current_user.workspaces.includes(:users).find(params[:id])
    if @workspace.users.length <= 1
      @workspace.destroy
    else
      membership = @workspace.user_workspaces.select { |m| m.user_id ==
            current_user.id && m.workspace_id == @workspace.id }
      membership.first.destroy
    end

    def update
      @workspace = current_user.workspaces.find(params[:id])

      if @workspace.update_attributes(workspace_params)
        render json: @workspace
      else
        render json: @workspace.errors.full_messages, status: :unprocessable_entity
      end

    end

  end

  private
    def workspace_params
      params.require(:workspace).permit(:title)
    end

end
