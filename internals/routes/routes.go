package routes

import (
	"net/http"

	"github.com/antmusumba/agrinet/internals/handlers"
	"github.com/antmusumba/agrinet/internals/repositories"
	"github.com/antmusumba/agrinet/internals/services"
	"github.com/gorilla/mux"
	"github.com/rs/cors"
)

// Router represents the main router structure
type Router struct {
	muxRouter *mux.Router
	handler   *handlers.Handler
}

// NewRouter initializes a new router with dependencies
func NewRouter(userRepo repositories.UserRepo) *Router {
	authService := services.NewAuthService(userRepo)
	return &Router{
		muxRouter: mux.NewRouter(),
		handler:   handlers.NewHandler(authService),
	}
}

// SetupRoutes configures all the routes for the application
func (r *Router) SetupRoutes() http.Handler {
	r.muxRouter.HandleFunc("/api/health", r.handler.HealthHandler).Methods("GET")
	r.muxRouter.HandleFunc("/api/auth/register", r.handler.Register).Methods("POST")
	r.muxRouter.HandleFunc("/api/auth/login", r.handler.Login).Methods("POST")

	// Setup CORS
	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"*"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type"},
		AllowCredentials: true,
	})

	return c.Handler(r.muxRouter)
}
