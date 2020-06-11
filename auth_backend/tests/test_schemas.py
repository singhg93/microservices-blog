import unittest
from app.schemas import validate_user

class SchemaTest(unittest.TestCase):

    def test_good_data(self):
        good_data = {
            "email": "test@domain.com",
            "password": "goodPass123@"
        }
        valid_data = validate_user(good_data)
        self.assertTrue(valid_data['ok'])
