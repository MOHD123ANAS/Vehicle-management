# Copyright (c) 2023, Mohammed Anas and Contributors
# See license.txt

import frappe
from frappe.tests.utils import FrappeTestCase


class Testdriverslist(FrappeTestCase):
    def test_fullname_is_set_automatically(self):
        test_drivers_list = frappe.get_doc({
            "doctype": "driver list",
            "first_name": "Danny",
            "last_name": "Vicky"
        }).insert()
        
        self.assertEqual(test_drivers_list.full_name,"Danny Vicky") 