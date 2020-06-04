from jsonschema import validate
from jsonschema.exceptions import ValidationError, SchemaError


user_schema = {
    "type": "object",
    "properties": {
        "email": {
            "type": "string",
            # email should be valid
            "pattern": "^[a-zA-Z0-9!#_$%&'*+/=?`{|}~^-]+(?:[.][a-zA-Z0-9!#_$%&'*+/=?`{|}~^-]+)*@(?:[a-zA-Z1-9-]+[.])+[a-zA-Z]{2,6}$",
            "error_msg": "Please provide a valid Email",
        },
        "password": {
            "type": "string",
            # the password must have at least 8 characters, one lowercase alphabet, one uppercase letter, one numeric, and one special character(@$!%*?&)
            "pattern": "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&])[A-Za-z0-9@$!%*?&]{8,}$",
            "minLength": 8,
            "error_msg": "Password must contain a special characters, a lowercase letter, an uppercase letter and a numeric character",
        },
    },
    "error_msg": "The data is missing required values",
    "required": ["email", "password"],
    "additionalProperties": False
}

def validate_user(data):
    try:
        validate(data, user_schema)
    except ValidationError as validation_error:
        return {'ok': False, 'error': validation_error.schema["error_msg"]}
    except SchemaError as schema_error:
        return {'ok': False, 'error': 'schema error'}
    return {'ok': True, 'user_data': data}
