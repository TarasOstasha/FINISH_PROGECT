$.getJSON("/data/Info-table.json", function(data){

           $('#table-blog').DataTable( {
               data: data,
               columns: [
                   { data: "Name" },
                   { data: "Address" },
                   { data: "Country" },
                   { data: "Phone" },
                   { data: "Personal_Id" },
                   { data: "Credit_card_info" }
               ]
           } );

       });