# Use a Go base image to build and run the application
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
RUN go build -o myapp ./main.go

# Expose the port that the application will listen on
EXPOSE 8080
EXPOSE 3000

# Run the application
CMD ["./myapp"]
