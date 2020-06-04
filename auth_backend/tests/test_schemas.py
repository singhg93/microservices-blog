from app.schemas import validate_user

# the schema should pass the following tests
# 1. it should only pass when both the password and email is provided
# 2. it should only pass when a valid email is provided
# 3. it should only pass when all the requirement for the password are met.
    # Password requirement are as follows:
    # a. Password must be 8 characters long
    # b. Password must have at least one uppercase letter
    # c. Password must have at least one lowercase letter
    # d. Password must have at least one numeric character
    # e. Password must have at least one special character
# 4. it should not accept any extra properties


def test_user_schema():
    '''
    Test to check that the user_schema only validates
    if both the email and password are provided.
    '''
    good_data = {
        'email': 'email@domain.com',
        'password': 'Passsword123@'
    }

    bad_email = {
        "email": "bad email",
        "password": "ThisTooShallPass123@"
    }


    bad_email_result = validate_user(bad_email)
    good_validate_result = validate_user(good_data)
    assert good_validate_result['ok'] == True
    assert bad_email_result['ok'] == False
    assert bad_email_result['error'] == 'Please provide a valid Email'

def test_both_properties():
    only_email = {'email': 'thisisan@email.com'}
    email_result = validate_user(only_email)
    only_pass = {'password': 'thisIsAPassword123@'}
    pass_result = validate_user(only_pass)
    assert email_result['ok'] == False
    assert pass_result['ok'] == False
    assert 'missing required values' in email_result['error'] 
    assert 'missing required values' in pass_result['error'] 

def test_password_pattern():
    less_than_8 = {"email": "some_email@domain.com", "password": "Sh0r7@"}
    no_uppercase = {"email": "some_email@domain.com", "password": "nouppercasel3tt3r@"}
    no_lowercase = {"email": "some_email@domain.com", "password": "NOLOWERCASEL3TT3R@"}
    no_numeric = {"email": "some_email@domain.com", "password": "NoNumbersAllowed@"}
    no_special = {"email": "some_email@domain.com", "password": "No5pecialCharacters"}
    less_than_8_result = validate_user(less_than_8)
    no_uppercase_result = validate_user(no_uppercase)
    no_lowercase_result = validate_user(no_lowercase)
    no_numeric_result = validate_user(no_numeric)
    no_special_result = validate_user(no_special)

    assert less_than_8_result['ok'] == False
    assert 'Password must contain' in less_than_8_result['error']
    assert no_uppercase_result['ok'] == False
    assert 'Password must contain' in no_uppercase_result['error']
    assert no_lowercase_result['ok'] == False
    assert 'Password must contain' in no_lowercase_result['error']
    assert no_numeric_result['ok'] == False
    assert 'Password must contain' in no_numeric_result['error']
    assert no_special_result['ok'] == False
    assert 'Password must contain' in no_special_result['error']
