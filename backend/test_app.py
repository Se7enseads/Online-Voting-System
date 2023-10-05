import os
import tempfile
import pytest
from app import app, db  # Import your Flask app and database instance
from models import UserModel, VotesModel, CandidateModel

@pytest.fixture
def client():
    # Create a test client using Flask's test_client
    db_fd, app.config['DATABASE'] = tempfile.mkstemp()
    app.config['TESTING'] = True
    client = app.test_client()

    with app.app_context():
        db.create_all()

    yield client

    os.close(db_fd)
    os.unlink(app.config['DATABASE'])

def test_index(client):
    # Test the home page
    response = client.get('/')
    assert response.status_code == 200
    assert b'Welcome to your Flask app' in response.data

def test_user_resource(client):
    # Test the UserResource endpoint
    response = client.get('/api/user/1')
    assert response.status_code == 404  # Assuming there's no user with ID 1 in the test database

def test_login_resource(client):
    # Test the LoginResource endpoint
    response = client.post('/api/login', json={
        'email': 'test@example.com',
        'password': 'testpassword',
        'remember': True
    })
    assert response.status_code == 401  # Assuming this is an invalid login

def test_profile_resource(client):
    # Test the Profile endpoint
    response = client.get('/api/profile')
    assert response.status_code == 401  # Assuming not logged in, so should return 401 Unauthorized

def test_candidate_resource(client):
    # Test the Candidate endpoint
    response = client.get('/api/candidate')
    assert response.status_code == 200
    # You can add more assertions to check the response data

def test_candidate_register_resource(client):
    # Test the CandidateRegister endpoint
    response = client.get('/api/candidate_register')
    assert response.status_code == 401  # Assuming not logged in, should return 401 Unauthorized

def test_register_resource(client):
    # Test the RegisterResource endpoint
    response = client.post('/api/sign-up', json={
        'nat_id': 123456789,
        'email': 'test@example.com',
        'name': 'Test User',
        'password1': 'testpassword',
        'password2': 'testpassword'
    })
    assert response.status_code == 201  # Assuming registration is successful

# You can add more test cases as needed for your specific endpoints and functionality

if __name__ == '__main__':
    pytest.main()
