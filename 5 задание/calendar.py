import datetime

class Event:
    def __init__(self, title, date_time, description=""):
        self.title = title
        self.date_time = date_time
        self.description = description

    def __eq__(self, other):
        if isinstance(other, Event):
            return (self.title == other.title and
                    self.date_time == other.date_time and
                    self.description == other.description)
        return False

class Calendar:
    def __init__(self):
        self.events = []

    def add_event(self, event):
        self.events.append(event)

    def remove_event(self, event):
        if event in self.events:
            self.events.remove(event)

    def edit_event(self, old_event, new_event):
      try:
        index = self.events.index(old_event)
        self.events[index] = new_event
      except ValueError:
        return False
      return True

    def get_upcoming_events(self, days=7):
        today = datetime.datetime.now()
        future_date = today + datetime.timedelta(days=days)
        upcoming_events = [event for event in self.events if event.date_time <= future_date]
        return upcoming_events

    def clear(self):
      self.events = []