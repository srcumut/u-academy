import requests

BASE_URL = "http://127.0.0.1:8000"

def test_create_announcement():
    # 1. Login as teacher
    login_data = {
        "username": "teacher",
        "password": "123456"
    }
    
    print("Attempting to login with:", login_data)
    try:
        # Note: OAuth2PasswordRequestForm expects form data normally, but let's check how the endpoint is defined.
        # Many FastAPI auth implementations use form data. Let's try requests.post with data=...
        response = requests.post(f"{BASE_URL}/api/v1/auth/login", data=login_data)
        
        if response.status_code != 200:
            print(f"Login failed: {response.status_code}")
            print(response.text)
            return

        token_data = response.json()
        access_token = token_data.get("access_token")
        if not access_token:
            print("No access token found in response")
            return
            
        print("Login successful. Token received.")
        
        # 2. Create Announcement
        headers = {
            "Authorization": f"Bearer {access_token}"
        }
        
        announcement_data = {
            "title": "Test Announcement from Script",
            "content": "This is a test content.",
            "is_global": True
        }
        
        print("Attempting to create announcement...")
        response = requests.post(f"{BASE_URL}/api/v1/announcements/", json=announcement_data, headers=headers)
        
        print(f"Response Status: {response.status_code}")
        print(f"Response Body: {response.text}")
        
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    test_create_announcement()
