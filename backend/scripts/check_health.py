import requests
import sys

BASE_URL = "http://127.0.0.1:8000/api/v1"

def check_backend():
    print("Checking backend health...")
    try:
        # Check root
        r = requests.get("http://127.0.0.1:8000/")
        if r.status_code == 200:
            print("Backend is reachable.")
        
        # Login
        print("Attempting login as 'aliveli'...")
        login_data = {
            "username": "aliveli",
            "password": "123456"
        }
        # Note: OAuth2PasswordRequestForm expects form data, not JSON
        r_login = requests.post(f"{BASE_URL}/auth/login", data=login_data)
        
        if r_login.status_code == 200:
            token = r_login.json()["access_token"]
            print("Login successful. Token received.")
            
            # Fetch Lessons
            headers = {"Authorization": f"Bearer {token}"}
            r_lessons = requests.get(f"{BASE_URL}/lessons/", headers=headers)
            print(f"Lessons endpoint status (with token): {r_lessons.status_code}")
            if r_lessons.status_code == 200:
                print("Lessons fetched successfully:")
                print(r_lessons.json())
            else:
                print(f"Failed to fetch lessons: {r_lessons.text}")
        else:
            print(f"Login failed: {r_login.status_code} - {r_login.text}")

    except Exception as e:
        print(f"An error occurred: {e}")
        sys.exit(1)

if __name__ == "__main__":
    check_backend()
