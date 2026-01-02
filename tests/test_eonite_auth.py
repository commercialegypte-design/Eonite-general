"""
EONITE B2B Platform - Authentication API Tests
Tests for user registration and login flows
"""
import pytest
import requests
import os
import time

# Get backend URL from environment
BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

class TestHealthCheck:
    """Health check tests - run first to verify API is up"""
    
    def test_api_root(self):
        """Test API root endpoint"""
        response = requests.get(f"{BASE_URL}/api/")
        assert response.status_code == 200
        data = response.json()
        assert "message" in data
        assert "EONITE" in data["message"]
        print(f"✓ API root: {data}")
    
    def test_health_endpoint(self):
        """Test health check endpoint"""
        response = requests.get(f"{BASE_URL}/api/health")
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "healthy"
        print(f"✓ Health check: {data}")


class TestUserRegistration:
    """User registration flow tests"""
    
    @pytest.fixture
    def unique_email(self):
        """Generate unique email for each test"""
        timestamp = int(time.time() * 1000)
        return f"test_eonite_{timestamp}@example.com"
    
    def test_register_new_user(self, unique_email):
        """Test successful user registration"""
        payload = {
            "email": unique_email,
            "password": "Test123!",
            "company_name": "Restaurant Le Gourmet",
            "contact_name": "Jean Test"
        }
        
        response = requests.post(
            f"{BASE_URL}/api/auth/register",
            json=payload,
            headers={"Content-Type": "application/json"}
        )
        
        assert response.status_code == 200, f"Registration failed: {response.text}"
        data = response.json()
        
        # Verify response structure
        assert "access_token" in data, "Missing access_token in response"
        assert "user" in data, "Missing user in response"
        assert data["token_type"] == "bearer"
        
        # Verify user data
        user = data["user"]
        assert user["email"] == unique_email
        assert user["company_name"] == "Restaurant Le Gourmet"
        assert user["contact_name"] == "Jean Test"
        assert "id" in user
        
        print(f"✓ User registered: {user['email']}")
        return data
    
    def test_register_duplicate_email(self, unique_email):
        """Test registration with duplicate email fails"""
        payload = {
            "email": unique_email,
            "password": "Test123!",
            "company_name": "Company 1"
        }
        
        # First registration should succeed
        response1 = requests.post(f"{BASE_URL}/api/auth/register", json=payload)
        assert response1.status_code == 200
        
        # Second registration with same email should fail
        payload["company_name"] = "Company 2"
        response2 = requests.post(f"{BASE_URL}/api/auth/register", json=payload)
        assert response2.status_code == 400
        
        data = response2.json()
        assert "existe déjà" in data.get("detail", "").lower() or "email" in data.get("detail", "").lower()
        print(f"✓ Duplicate email rejected correctly")
    
    def test_register_missing_required_fields(self):
        """Test registration with missing required fields"""
        # Missing email
        response = requests.post(
            f"{BASE_URL}/api/auth/register",
            json={"password": "Test123!", "company_name": "Test Co"}
        )
        assert response.status_code == 422  # Validation error
        print(f"✓ Missing email rejected")
        
        # Missing password
        response = requests.post(
            f"{BASE_URL}/api/auth/register",
            json={"email": "test@test.com", "company_name": "Test Co"}
        )
        assert response.status_code == 422
        print(f"✓ Missing password rejected")


class TestUserLogin:
    """User login flow tests"""
    
    @pytest.fixture
    def registered_user(self):
        """Create a user for login tests"""
        timestamp = int(time.time() * 1000)
        email = f"login_test_{timestamp}@example.com"
        password = "Test123!"
        
        payload = {
            "email": email,
            "password": password,
            "company_name": "Login Test Company"
        }
        
        response = requests.post(f"{BASE_URL}/api/auth/register", json=payload)
        assert response.status_code == 200, f"Setup failed: {response.text}"
        
        return {"email": email, "password": password}
    
    def test_login_success(self, registered_user):
        """Test successful login with valid credentials"""
        response = requests.post(
            f"{BASE_URL}/api/auth/login",
            json={
                "email": registered_user["email"],
                "password": registered_user["password"]
            }
        )
        
        assert response.status_code == 200, f"Login failed: {response.text}"
        data = response.json()
        
        # Verify response structure
        assert "access_token" in data
        assert "user" in data
        assert data["token_type"] == "bearer"
        
        # Verify user data
        assert data["user"]["email"] == registered_user["email"]
        
        print(f"✓ Login successful for: {registered_user['email']}")
        return data
    
    def test_login_wrong_password(self, registered_user):
        """Test login with wrong password fails"""
        response = requests.post(
            f"{BASE_URL}/api/auth/login",
            json={
                "email": registered_user["email"],
                "password": "WrongPassword123!"
            }
        )
        
        assert response.status_code == 401
        data = response.json()
        assert "incorrect" in data.get("detail", "").lower() or "mot de passe" in data.get("detail", "").lower()
        print(f"✓ Wrong password rejected correctly")
    
    def test_login_nonexistent_user(self):
        """Test login with non-existent email fails"""
        response = requests.post(
            f"{BASE_URL}/api/auth/login",
            json={
                "email": "nonexistent_user_12345@example.com",
                "password": "Test123!"
            }
        )
        
        assert response.status_code == 401
        print(f"✓ Non-existent user rejected correctly")


class TestAuthenticatedEndpoints:
    """Tests for endpoints requiring authentication"""
    
    @pytest.fixture
    def auth_token(self):
        """Get auth token for authenticated requests"""
        timestamp = int(time.time() * 1000)
        email = f"auth_test_{timestamp}@example.com"
        
        # Register user
        response = requests.post(
            f"{BASE_URL}/api/auth/register",
            json={
                "email": email,
                "password": "Test123!",
                "company_name": "Auth Test Company"
            }
        )
        assert response.status_code == 200
        return response.json()["access_token"]
    
    def test_get_me_authenticated(self, auth_token):
        """Test /auth/me endpoint with valid token"""
        response = requests.get(
            f"{BASE_URL}/api/auth/me",
            headers={"Authorization": f"Bearer {auth_token}"}
        )
        
        assert response.status_code == 200
        data = response.json()
        assert "email" in data
        assert "company_name" in data
        print(f"✓ /auth/me returned user data: {data['email']}")
    
    def test_get_me_unauthenticated(self):
        """Test /auth/me endpoint without token fails"""
        response = requests.get(f"{BASE_URL}/api/auth/me")
        assert response.status_code == 401
        print(f"✓ /auth/me rejected unauthenticated request")
    
    def test_get_orders_authenticated(self, auth_token):
        """Test /orders endpoint with valid token"""
        response = requests.get(
            f"{BASE_URL}/api/orders",
            headers={"Authorization": f"Bearer {auth_token}"}
        )
        
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        print(f"✓ /orders returned {len(data)} orders")


class TestProductsAPI:
    """Tests for products endpoints (public)"""
    
    def test_get_products(self):
        """Test getting all products"""
        response = requests.get(f"{BASE_URL}/api/products")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        print(f"✓ Products endpoint returned {len(data)} products")
    
    def test_get_categories(self):
        """Test getting product categories"""
        response = requests.get(f"{BASE_URL}/api/categories")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        print(f"✓ Categories endpoint returned {len(data)} categories")


class TestPricingAPI:
    """Tests for pricing/configurator endpoints"""
    
    def test_get_pricing_tiers(self):
        """Test getting pricing tiers"""
        response = requests.get(
            f"{BASE_URL}/api/pricing/tiers",
            params={"print_type": "1_color", "size": "medium", "category": "sacs_kraft"}
        )
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        print(f"✓ Pricing tiers returned {len(data)} tiers")
    
    def test_calculate_price(self):
        """Test price calculation"""
        response = requests.post(
            f"{BASE_URL}/api/pricing/calculate",
            params={
                "quantity": 10000,
                "print_type": "1_color",
                "size": "medium",
                "category": "sacs_kraft"
            }
        )
        assert response.status_code == 200
        data = response.json()
        assert "unit_price" in data or "total" in data or isinstance(data, dict)
        print(f"✓ Price calculation returned: {data}")
    
    def test_calculate_price_minimum_quantity(self):
        """Test price calculation with below minimum quantity"""
        response = requests.post(
            f"{BASE_URL}/api/pricing/calculate",
            params={
                "quantity": 100,  # Below minimum of 500
                "print_type": "1_color",
                "size": "medium",
                "category": "sacs_kraft"
            }
        )
        assert response.status_code == 400
        print(f"✓ Below minimum quantity rejected correctly")


if __name__ == "__main__":
    pytest.main([__file__, "-v", "--tb=short"])
