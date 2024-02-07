// Copyright (c) 2023, Mohammed Anas and contributors
// For license information, please see license.txt

 frappe.ui.form.on("Ride Booking", {
 	refresh(frm) {
        frm.add_custom_button("Change Rate",()=>{
            frappe.prompt({
                fieldname:"rate",
                label:"Rate",
                fieldtype: "Float",
                reqd:1,
            }, (data)=>{
                frm.set_value("pricekm",data.rate)
                frm.save()
            })
        })

 	},
    pricekm(frm){
        for(let item of frm.doc.items){
            const amount = frm.doc.pricekm * item.distance_in_km;
            item.amount = amount;
        }

        frm.refresh_field("items");
    },
    total_amount(frm, cdt ,cdn){
        {

            const selectedRows = frm.items(cdt);

            // Initialize a variable to store the sum
            let sumValue = 0;
          
            // Loop through each selected row
            for (const row of selectedRows) {
              // Get the value to add based on the field name
              const valueToAdd = row.get("field_name");
          
              // Add the value to the sum
              sumValue += valueToAdd;
            }
            total_amount = sumValue
          
            // const selectedRows = frm.get_selected_children(cdt);

            // for (let item of frm.doc.items) {
            //     totalAmount += item.amount;
            //   }
            //   frm.total_amount = totalAmount;
            // }
            frm.refresh_field("total_amount");
    
    }
}
     });

 //Writing a code to update child values in the table(items) instatantly as price changes it should apperar in amount
frappe.ui.form.on("Ride Booking Item",{

//This function is called whenever the "distance_in_km" field is changed 
//for any row in the child table.

    distance_in_km(frm, cdt, cdn){
//which row to update 
//This line retrieves the specific child table row object where the change occurred.     //It uses the cdt and cdn arguments to identify the row
        const row = frappe.get_doc(cdt, cdn)

 // update the amount for that row
//This line calculates the amount based on the updated distance and the price per kilometer 
//stored in the parent document "Ride Booking" (accessed using frm.doc.pricekm).
        row.amount =row.distance_in_km*frm.doc.pricekm;

        frm.refresh_field("items");
    }
 })
 
