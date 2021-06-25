import unittest

def sort_by_label(pc: dict):
    if not pc['label']:
        return ''
    for item in pc['label'].split():
        try:
            item = int(item)
            return item
        except:
            return pc['label']


class TestDB(unittest.TestCase):
    def test_getter_all(self):
        pc = {
            'label': None
        }
        self.assertIsInstance(sort_by_label(pc), bool)


if __name__ == '__main__':
    unittest.main()