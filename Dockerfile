# Use a Go base image to build the application
FROM golang:1.23 AS builder

# Set the current working directory inside the container
WORKDIR /app

# Copy the local Go module files to the container
COPY go.mod go.sum ./

# Download dependencies
RUN go mod download

# Copy the entire project to the container
COPY . .

# Build the Go application
RUN go build -o myapp ./cmd/main.go

# Start a new stage to create a lean final image
FROM debian:bullseye-slim

# Set the working directory
WORKDIR /app

# Copy the built Go application from the builder image
COPY --from=builder /app/myapp .

# Expose the port that the application will listen on
EXPOSE 8080

# Run the application
CMD ["./myapp"]
