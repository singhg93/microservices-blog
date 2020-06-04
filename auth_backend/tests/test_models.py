import pytest

# unit tests models

from app.models import User

def test_new_user():
    '''
    Test an instance of the user object. the email passed to
    the object should be stored, the password must be hashed
    and stored. The password property should not be accesible
    '''
    new_user = User(email='test@email.com', password='password')
    assert new_user.email == 'test@email.com'
    assert new_user.password_hash is not None
    assert new_user.password_hash != 'password'
    with pytest.raises(AttributeError):
        new_user.password

def test_verify_password():
    '''
    Test verification of password only passes when correct password
    is supplied and fails when a wrong password is supplied
    '''
    new_user = User(password="somePassword")
    assert new_user.verify_password("newPassword") == False
    assert new_user.verify_password("somePassword") == True

def test_random_salts():
    '''
    Test to verify that the salts are created randomly and no two
    password hashes have same value.
    '''
    new_user = User(password="robot")
    another_user = User(password="robot")
    assert new_user.password_hash != another_user.password_hash
