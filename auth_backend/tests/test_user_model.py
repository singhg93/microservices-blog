import unittest
from app.models import User, db

class UserModelTestCase(unittest.TestCase):

    def setUp(self):
        '''
        Create all the tables before any test
        '''
        db.create_all()

    def tearDown(self):
        '''
        After the tests are done,
        remove the database session
        and drop all the tables
        '''
        db.session.remove()
        db.drop_all()

    def test_password_setter(self):
        '''
        Test setting the user password
        '''
        user = User(email="test@gmail.com", password="human")
        self.assertTrue(user.password_hash is not None)

    def test_no_password_getter(self):
        '''
        Test that the password is not accessible directly
        '''
        user = User(email="test@gmail.com", password="human")
        with self.assertRaises(AttributeError):
            user.password

    def test_password_verification(self):
        '''
        Test user password verification
        Verifies a given password against the password hash
        stored in the database
        '''
        user = User(password="human")
        self.assertTrue(user.verify_password("human"))
        self.assertFalse(user.verify_password("robot"))

    def test_password_salts_are_random(self):
        '''
        Test that no password hashes are same
        '''
        user1 = User(password="robot")
        user2 = User(password="robot")
        self.assertTrue(user1.password_hash != user2.password_hash)


    def test_add_user(self):
        '''
        Test adding a user to the database
        '''
        user = User(email='test@gmail.com', password='human')
        db.session.add(user)
        db.session.commit()
        user = User.query.filter_by(email='test@gmail.com').first()
        self.assertIsNotNone(user)
