/**
 * Created separate JavaScript file for the cheesecake app.
 * Should run the same scripts as HW2
 * Designed by Aashish Anand
 * Date Created: 1/25/2022
 * Revised: 2/1/2022
 */
$(document).ready(function() {
    $("form").submit(function() {
        //gathers values from the form
        var notes = $.trim($("textarea").val());
        var flavor = $("input[name='flavor']:checked").val();
        var quantity = $("select").find(":selected").text();

        //check if the user typed up the word vegan anywhere in the text area.
        if (notes.search(/vegan/i) > -1){
            alert("Sorry, but our cheesecakes contain dairy! :(");
        }
        else {
            //users are required to choose a flavor
            if (!flavor){
                alert("Please select a flavor!");
            }
            else{
                /* removes the form element and replaces it with 
                    a thank-you text that describes the order details*/
                $("form").remove();
                if (!notes){
                    notes = "none";
                }
                $("div.form").css("padding","55px 40px")
                var thankYou = $("<p></p>").text("Thank you! Your order has been placed.");
                var orderDetails = $("<p></p>").text("You have ordered " + quantity + " " + flavor + " cheesecake(s).");
                var specialRequests = $("<p></p>").text("Special requests: " + notes);
                stylizeThankYou(thankYou, orderDetails, specialRequests);
                $("div.form").append(thankYou, orderDetails, specialRequests);

                var newOrderData = {"quantity": quantity, "flavor": flavor, "notes": notes};
                $.post("/neworder", newOrderData);
            }
        }
    });
    //helper function for the dropdown menu in footer of page
    dropdownMonthMenu();
});

function dropdownMonthMenu() {
    //changes the text in the widget to the selected month and toggles dropdown visibility
    $(".month-dropdown").mouseenter(function(){
        $(".month-select").show();
    });
    $(".month-select a").click(function(){
        var month = $(this).attr('title');
        $(".dropbtn").html(month);
        $(".month-select").hide();

        //issuing a post request for the dropdown menu everytime a month is selected
        $.post("/orders", { "selectedMonth" : month }, function(req, res, next){
            $("#cherry-li").text(req.orderData[0].quantity + " " + req.orderData[0].topping);
            $("#chocolate-li").text(req.orderData[1].quantity + " " + req.orderData[1].topping);
            $("#plain-li").text(req.orderData[2].quantity + " " + req.orderData[2].topping);
        });
    });
}

function stylizeThankYou(...messages){
    messages.forEach((arg) => {
        arg = arg.css({"color":"blue", "text-align": "center","font-size":"24px","font-weight":"bold"});
    });
}