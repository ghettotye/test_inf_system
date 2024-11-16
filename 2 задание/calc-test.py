import unittest

class TestCalculator(unittest.TestCase):
    def setUp(self):
        self.calculator = Calculator()

    def test_add(self):
        self.assertEqual(self.calculator.add(3, 5), 8)
        self.assertEqual(self.calculator.add(-2, 4), 2)
        self.assertEqual(self.calculator.add(0, 5), 5)

    def test_subtract(self):
        self.assertEqual(self.calculator.subtract(10, 4), 6)
        self.assertEqual(self.calculator.subtract(2, 5), -3)
        self.assertEqual(self.calculator.subtract(0, 8), -8)

    def test_multiply(self):
        self.assertEqual(self.calculator.multiply(6, 7), 42)
        self.assertEqual(self.calculator.multiply(-3, 2), -6)
        self.assertEqual(self.calculator.multiply(0, 5), 0)

    def test_divide(self):
        self.assertEqual(self.calculator.divide(8, 2), 4)
        with self.assertRaises(ValueError):
            self.calculator.divide(5, 0)
        self.assertEqual(self.calculator.divide(9, 3), 3)

    def test_invalid_input(self):
        with self.assertRaises(TypeError):
            self.calculator.add('abc', 5)

if __name__ == '__main__':
    unittest.main()