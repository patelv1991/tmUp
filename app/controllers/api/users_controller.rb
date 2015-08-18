class Api::UsersController < ApplicationController
  def show
    @users = User.where(email: params[:emails])
    if @users.length < 1
      render json: params[:emails], status: 422
    else
      render :show
    end

  end

end
