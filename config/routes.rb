Rails.application.routes.draw do
  root to: 'static_pages#root'

  resources :users
  resource :session

  namespace :api, defaults: { format: :json } do
    resources :users, only: [:show, :index]
    resources :workspaces
    resources :projects
    resources :workspace_memberships, only: [:create, :destroy]
  end
end
