# Use an official Go image as the base image
FROM golang:1.23 AS builder

# Set the working directory for the backend app
WORKDIR /app

# Copy Go module files and install dependencies
COPY go.mod go.sum /app/

# Install the required Go dependencies
RUN go get modernc.org/sqlite \
    github.com/google/uuid \
    github.com/golang-jwt/jwt \
    golang.org/x/crypto/bcrypt \
    github.com/gorilla/mux \
    github.com/rs/cors

# Run go mod tidy to ensure dependencies are clean and updated
RUN go mod tidy

# Copy only the necessary Go source code
COPY internals /app/internals
COPY pkg/ /app/pkg/
COPY main.go /app/

# Copy the entire Node.js server directory
COPY clientServer/ /app/clientServer/
COPY images/ /app/images/

# Build the Go backend app
RUN go build -o clientServer ./main.go

# Use a minimal base image for the final image
FROM debian:bullseye-slim

# Set the working directory for production
WORKDIR /app

# Expose ports for both services
EXPOSE 8080
EXPOSE 3000

# Command to run when the container starts
CMD ["./clientServer"]
