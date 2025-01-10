package database

import (
	"database/sql"
	"log"

	// _ "github.com/mattn/go-sqlite3"
	_ "modernc.org/sqlite"
)

var db *sql.DB

// InitDB initializes the SQLite database connection
func InitDB(dataSourceName string) (*sql.DB, error) {
	var err error
	db, err = sql.Open("sqlite", dataSourceName)
	if err != nil {
		return nil, err
	}

	// Test the connection
	if err := db.Ping(); err != nil {
		log.Printf("Failed to ping database: %v", err)
		return nil, err
	}

	// Enable foreign keys
	_, err = db.Exec("PRAGMA foreign_keys = ON")
	if err != nil {
		log.Printf("Failed to enable foreign keys: %v", err)
		return nil, err
	}

	// Create users table if it doesn't exist
	createTableSQL := `
	CREATE TABLE IF NOT EXISTS users (
		id TEXT PRIMARY KEY,
		email TEXT UNIQUE NOT NULL,
		password TEXT NOT NULL,
		first_name TEXT,
		last_name TEXT,
		phone TEXT,
		address TEXT,
		image TEXT,
		role TEXT,
		status TEXT,
		verified INTEGER DEFAULT 0,
		votes INTEGER DEFAULT 0,
		created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
		updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
	);`

	if _, err := db.Exec(createTableSQL); err != nil {
		log.Printf("Failed to create users table: %v", err)
		return nil, err
	}

	// Create products table if it doesn't exist
	createProductTableSQL := `
	CREATE TABLE IF NOT EXISTS products (
		id TEXT PRIMARY KEY,
		user_id TEXT NOT NULL,
		title TEXT NOT NULL,
		image TEXT,
		description TEXT,
		price INTEGER NOT NULL,
		stock INTEGER NOT NULL,
		created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
		updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
		FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
	);`

	if _, err := db.Exec(createProductTableSQL); err != nil {
		log.Printf("Failed to create products table: %v", err)
		return nil, err
	}

	return db, nil
}

// GetDB returns the database instance
func GetDB() *sql.DB {
	return db
}
