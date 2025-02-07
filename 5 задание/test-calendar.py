import unittest
import datetime
from calendar import Event, Calendar

class TestCalendar(unittest.TestCase):

    def setUp(self):
        self.calendar = Calendar()
        self.now = datetime.datetime.now()
        self.event1 = Event("Встреча", self.now + datetime.timedelta(days=1), "Обсуждение проекта")
        self.event2 = Event("День рождения", self.now + datetime.timedelta(days=5))

    def tearDown(self):
      self.calendar.clear()


    def test_add_event(self):
        self.calendar.add_event(self.event1)
        self.assertIn(self.event1, self.calendar.events)
        self.assertEqual(len(self.calendar.events), 1) 

    def test_remove_event(self):
        self.calendar.add_event(self.event1)
        self.calendar.add_event(self.event2)
        self.calendar.remove_event(self.event1)
        self.assertNotIn(self.event1, self.calendar.events)
        self.assertEqual(len(self.calendar.events), 1) 

    def test_edit_event(self):
        self.calendar.add_event(self.event1)
        new_event = Event("Новая встреча", self.now + datetime.timedelta(days=2), "Финальное обсуждение")
        result = self.calendar.edit_event(self.event1, new_event)
        self.assertTrue(result)
        self.assertIn(new_event, self.calendar.events)
        self.assertNotIn(self.event1, self.calendar.events)

    def test_get_upcoming_events_no_events(self):
        upcoming_events = self.calendar.get_upcoming_events(days=7)
        self.assertEqual(len(upcoming_events), 0) 

    def test_get_upcoming_events_outside_range(self):
      far_event = Event("Далекое событие", self.now + datetime.timedelta(days=15))
      self.calendar.add_event(far_event)
      upcoming_events = self.calendar.get_upcoming_events(days=7)
      self.assertNotIn(far_event, upcoming_events)

if __name__ == '__main__':
    unittest.main()