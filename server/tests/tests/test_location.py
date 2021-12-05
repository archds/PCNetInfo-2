from django.db.models import Q
from django.test import TestCase

from hardware.models import Building, Location
from tests.graphql.mutations import (
    send_create_building_mutation,
    send_create_location_mutation, send_delete_building_mutation,
    send_delete_location_mutation, send_update_building_mutation, send_update_location_mutation
)
from tests.graphql.queries import send_buildings_query, send_locations_query


class LocationTests(TestCase):
    @classmethod
    def setUpTestData(cls):
        default_building = Building.objects.create(
            street='Test',
            house='200'
        )
        cls.default_building = default_building

        cls.default_location = Location.objects.create(
            building=default_building,
            cabinet='500',
            floor=4,
            description='Bad request in cabinet :#'
        )

    def setUp(self) -> None:
        self.location_payload = {
            'cabinet': '404',
            'floor': 4,
            'description': 'Cabinet not found :)'
        }

        self.building_payload = {
            'street': 'Founders',
            'house': '500'
        }

    def test_buildings_query(self):
        # Act
        response = send_buildings_query()

        # Assert
        self.assertNotIn('errors', response)

        [building] = response['data']['buildings']
        self.assertEqual(building['id'], str(self.default_building.pk))

    def test_locations_query(self):
        # Act
        response = send_locations_query()

        # Assert
        self.assertNotIn('errors', response)

        [location] = response['data']['locations']
        self.assertEqual(location['id'], str(self.default_location.pk))

    def test_create_building_mutation(self):
        # Act
        response = send_create_building_mutation(**self.building_payload)

        # Assert
        self.assertNotIn('errors', response)
        self.assertTrue(Building.objects.filter(~Q(pk=self.default_building.pk)).exists())

    def test_update_building_mutation(self):
        # Act
        response = send_update_building_mutation(
            id=self.default_building.pk,
            street='Another',
            house=self.building_payload['house']
        )
        self.default_building.refresh_from_db()

        # Assert
        self.assertNotIn('errors', response)
        self.assertEqual(self.default_building.street, 'Another')

    def test_delete_building_mutation(self):
        # Act
        response = send_delete_building_mutation(self.default_building.pk)

        # Assert
        self.assertNotIn('errors', response)
        self.assertFalse(Building.objects.filter(pk=self.default_building.pk).exists())

    def test_create_location_mutation(self):
        # Act
        response = send_create_location_mutation(
            building_id=self.default_building.pk,
            **self.location_payload
        )

        # Assert
        self.assertNotIn('errors', response)
        self.assertTrue(Location.objects.filter(~Q(pk=self.default_location.pk)))

    def test_update_location_mutation(self):
        # Act
        response = send_update_location_mutation(
            id=self.default_location.pk,
            building_id=self.default_building.pk,
            cabinet='500',
            floor=2,
        )
        self.default_location.refresh_from_db()

        # Assert
        self.assertNotIn('errors', response)
        self.assertEqual(self.default_location.floor, 2)

    def test_delete_location_mutation(self):
        # Act
        response = send_delete_location_mutation(self.default_location.pk)

        # Assert
        self.assertNotIn('errors', response)
        self.assertFalse(Location.objects.filter(pk=self.default_building.pk).exists())
