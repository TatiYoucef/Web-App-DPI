from django.test import TestCase
from .models import User, Patient
from django.core.exceptions import ValidationError
from django.core.exceptions import ValidationError


class TestUserModel(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username='testuser',
            email='testuser@example.com',
            password='testpassword',
            role='Patient'
        )

    def test_user_creation(self):
        user = self.user
        self.assertEqual(user.username, 'testuser')
        self.assertEqual(user.email, 'testuser@example.com')
        self.assertTrue(user.check_password('testpassword'))
        self.assertEqual(user.role, 'Patient')

    def test_user_str_representation(self):
        user = self.user
        self.assertEqual(str(user), 'testuser')


    def test_user_invalid_creation(self):
        """ Test invalid creation of a user (no password). """
        user = User(
            username='invaliduser',
            email='invaliduser@example.com',
            password='',  # Invalid password (empty)
            role='Patient'
        )
        if not user.password:
            raise ValidationError("Password cannot be empty.")
        with self.assertRaises(ValidationError):  
            user.full_clean() 

