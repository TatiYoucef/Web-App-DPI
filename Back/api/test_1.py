from django.test import TestCase
from datetime import date  # Import date to use in the test
from .models import User, Patient

class TestPatientModel(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username='testpatient',
            email='testpatient@example.com',
            password='testpassword',
            role='Patient'
        )

    def test_patient_creation(self):
        patient = Patient.objects.create(
            user=self.user,
            date_naissance=date(1990, 1, 1),  # Use datetime.date here
            address='123 Rue Test',
            phone_number='0123456789',
            nss='123456789',
            medcin_traitant='Dr. Test',
            mutuelle='Mutuelle Test'
        )

        self.assertEqual(patient.user.username, 'testpatient')
        self.assertEqual(patient.date_naissance.strftime('%Y-%m-%d'), '1990-01-01')  # Check date format
        self.assertEqual(patient.address, '123 Rue Test')
        self.assertEqual(patient.phone_number, '0123456789')
        self.assertEqual(patient.nss, '123456789')
        self.assertEqual(patient.medcin_traitant, 'Dr. Test')
        self.assertEqual(patient.mutuelle, 'Mutuelle Test')

    def test_patient_str_representation(self):
        patient = Patient.objects.create(
            user=self.user,
            date_naissance=date(1990, 1, 1),
            address='123 Rue Test',
            phone_number='0123456789',
            nss='123456789',
            medcin_traitant='Dr. Test',
            mutuelle='Mutuelle Test'
        )

        self.assertEqual(str(patient).strip(), 'testpatient')
