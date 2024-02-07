# Copyright (c) 2023, Mohammed Anas and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document


class RideBooking(Document):
 def before_save(self):
    self.set_items_amounts()
    self.set_total_amount()
      
 def set_items_amounts(self):
	#iterate over all the items
	#calculate amount = price_per_km * distance_in_km
  for items in self.items:
     items.amount = self.pricekm * items.distance_in_km
    
    #Function to calculate the total_amount in ride booking doctype
     
 def set_total_amount(self):
     #total_amount = sum of amount in items
     self.total_amount= sum(item.amount for item in self.items)
      
