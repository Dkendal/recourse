defmodule Recourse.Router do
  use Recourse.Web, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", Recourse do
    pipe_through :browser # Use the default browser stack

    get "/about", PageController, :about

    resources "/", TermController do
      resources "/courses", CourseController
    end
  end

  # Other scopes may use custom stacks.
  scope "/api", Recourse do
    pipe_through :api
  end
end