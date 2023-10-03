from app import app
from models import CandidateModel, UserModel, VotesModel, db

# Delete all existing records from the tables
with app.app_context():
    UserModel.query.delete()
    CandidateModel.query.delete()
    VotesModel.query.delete()
    db.session.commit()

# Create sample user data
users = [
    UserModel(national_id=123456789, name='John Doe',
              email='john@example.com', password='12345678', admin=1),
    UserModel(national_id=987654321, name='Jane Smith',
              email='jane@example.com', password='12345678', admin=0),
]

# Create sample candidate data
candidates = [
    CandidateModel(candidate_num=1, first_name='Candidate1',
                   last_name='Last1', certificate='Cert1', position='President'),
    CandidateModel(candidate_num=2, first_name='Candidate2',
                   last_name='Last2', certificate='Cert2', position='President'),
    CandidateModel(candidate_num=3, first_name='Candidate2',
                   last_name='Last2', certificate='Cert2', position='Vice-President'),
    CandidateModel(candidate_num=4, first_name='Candidate4',
                   last_name='Last4', certificate='Cert4', position='Vice-President')
]

# Create sample vote data
votes = [
    VotesModel(voter_id=123456789, president=1, vice_pres=2),
    VotesModel(voter_id=987654321, president=2, vice_pres=1),
]

# Add data to the database
with app.app_context():
    for user in users:
        db.session.add(user)

    for candidate in candidates:
        db.session.add(candidate)

    for vote in votes:
        db.session.add(vote)

    db.session.commit()

print('Database seeded successfully.')
