from flask_login import UserMixin
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import validates

db = SQLAlchemy()

DEFAULT_IMAGE = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAlgAAADrCAMAAACCeRgcAAAAElBMVEXU7vonqeGz4fUzruRNuOd9zO5GHk8FAAAEjklEQVR42u3dUXLbOgxAURMg9r/l13l1yjqJE1EiZzL1Of/5uwMqsiTcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAC+E1F3ETdYIaq3B9lLXVxTle2DbC21xXmV7bleNzidlbTYldVz3YHIlOjtmH6Dw6odlWlosbCrIV1pcUy2OcriiN6astg7r1zCs3JemVmsn1fK4ofMK2WxeF4N7mdxYF65gOdHzCuHId/MK4chP2peGVmcmVe9KiKqevuCkcV7efixq0oji6P691kNlUYWh+TklVM3srg2rzJmntjKG/yRh7saylnIwnk1lLOQhfNq6M5C1s2rIdpnbnBqXg3lIot182oIF1ksnFdD9/AM6+bVUMJi4bwaXL0zPa+ExY55dUgXFnPzSljsmFfCYse8EhY75tVhKSwm55X/CpmWi7oKN0g5Ma/8pMO6eTUj/QjNsnk1lKcbWNfVkJ7H4k2t66o8msybWNdVeJmCd6dX9t/ySlcpLN707BVxGyKq58muvEvBm3i26XK+K6/Ys16kj4LwTkRV/+3shudInyHl/aH3IYaK6a58H4u/VG/ZPpMVU135bjJ/RC1alRrpS5E8ZrUirUgfemdusWUd7cpH13gSw9mzLNInk7mrdWtLIm084dS+iR66Yl1XQ4aumOjqelmR1uhwl21ehq7Ysc8rQ1fs2OeVumLL/sGuK7bsHyxdsWVfauiKHftSu65YOK+G0hU79junrpicV70i7q9+tedKV8zMq4rbEJXtidQV8/udh3qaja6Y3O8cUePVr0hdseA7RWMJfda9LF1x+Xt9lW2Ie1m64uK86p/dB43UFZfmVX5+0VWPufl/kHPzaqgPf5mlK87Oq6EebmhlL/evuDCvhn67i4i3ZKrpiruc7mqcfY+i64qJ+1ftmV6PWemKiX0T0b7Qq+KX6tl0xdxegGoH6Irp/Ti6Yssek9IVW/Z5dV2xY+9SpK7YsX8wdMWWPXGlK7bsSy1dsWWvZemKLfudu664OK9mZpbvQHKuq6F0xZb9zpHtA5uXWLDfudox3eXVq8kzXQ3R2/fSuHo5dbKrodIpyHtxvquhumnFo7rS1RCVrq0YYqKr6X2+vVT1qmpJV0NE3YWoXtmirlTEg1rUVT459sJh+Jr6oq7Gq19/H4o9/YzzmqJ9arorjzNw4CSs2a7cwuLASdhnu3LHnXfyyEFobzgrLrFqWVd54zXF8YFlvzPXrt27rtgRVumKHf8Uhq7YEpau2BGWrtgSlq7YEpau2BKWrtgSVuiKLfexdMWOsLqu2BFW0xV7nm7QFVe1T6Su2PIEaemKLc+8h664Jp4Uoit2fBur64pNb0LriiviyAuB9jszrR/9Zmikrjgu2pEFz1FpLwDLvvHeeq9ferZmXjEn7Hdmi64rdojUFTuUrvhph6Gu+ELXFT/pMktXfC1SV/yUsnTF9yJ1xQ6R9juzRW/NHl723Sm1MJXFIu13ZovKA1kZV8yrdAqyRaVpxRbx1pZNvCwWVf0xKlWxTPzPXl4AAAAAAAAAAAAAAAAAAAAAAAAAAACAf9t/nvItVRtKC0AAAAAASUVORK5CYII="


class UserModel(UserMixin, db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    national_id = db.Column(db.Integer, nullable=False, unique=True)
    name = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(120), nullable=False, unique=True)
    password = db.Column(db.String(), nullable=False)
    admin = db.Column(db.Integer, default=0)

    votes = db.relationship('VotesModel', back_populates='user')

    @validates('national_id')
    def validate_national_id(self, key, national_id):  # pylint: disable=unused-argument
        if not national_id:
            raise ValueError('Enter a valid national ID.')
        existing_user = UserModel.query.filter_by(
            national_id=national_id).first()
        if existing_user and existing_user.id != self.id:
            raise ValueError('National ID must be unique.')
        return national_id

    @validates('email')
    def validate_email(self, key, email):  # pylint: disable=unused-argument
        if not email:
            raise ValueError('Enter a valid email.')
        existing_user = UserModel.query.filter_by(email=email).first()
        if existing_user and existing_user.id != self.id:
            raise ValueError('Email must be unique.')
        return email

    @validates('password')
    def validate_password(self, key, password):  # pylint: disable=unused-argument
        if len(password) < 8:
            raise ValueError('Password should be at least 8 characters.')
        return password


class VotesModel(db.Model):
    __tablename__ = 'votes'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    voter_id = db.Column(db.Integer, db.ForeignKey(
        'users.national_id'), nullable=False, unique=True)
    president = db.Column(db.Integer, nullable=False)
    vice_pres = db.Column(db.Integer, nullable=False)

    user = db.relationship('UserModel', back_populates='votes')

    @validates('president', 'vice_pres')
    def validate_candidates(self, key, value):  # pylint: disable=unused-argument
        if not 1 <= value <= 5:
            raise ValueError('Invalid candidate number.')
        return value


class CandidateModel(db.Model):
    __tablename__ = 'candidates'

    id = db.Column(db.Integer, primary_key=True)
    candidate_num = db.Column(db.Integer, nullable=False, unique=True)
    first_name = db.Column(db.String(80), nullable=False)
    last_name = db.Column(db.String(80))
    certificate = db.Column(db.String(120), nullable=False)
    position = db.Column(db.String(80), nullable=False)
    pic_path = db.Column(db.String(120), default=DEFAULT_IMAGE)
    agenda = db.Column(db.String(300), default="No agenda")
