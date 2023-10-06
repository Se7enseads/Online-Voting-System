from app import app
from models import CandidateModel, UserModel, VotesModel, db

# Delete all existing records from the tables
with app.app_context():
    VotesModel.query.delete()
    UserModel.query.delete()
    CandidateModel.query.delete()
    db.session.commit()

# Add data to the database
with app.app_context():

    db.session.commit()

print('Database seeded successfully.')
