// make function to run for every page
$(function () {
    // make sure search results element exists
    if ($("#search-results").length !== 0) {
        // get the query and handle null
        var params = new URLSearchParams(window.location.search);
        var query = params.get("q")
        if (query === null) {
            query = ""
        }

        // update elements with search title
        $(".search-term").text(query.trim())
        $("#site-search").val(query.trim())

        // show the correct message
        if (query.trim().toLowerCase() === "dune") {
            $("#search-results").show()
        }
        else {
            $("#no-results").show()
        }
    }

    // make sure the request list element exists
    if ($(".request-list").length !== 0) {
        voting();
    }

    // make sure the request form element exists
    if ($("#request-form").length !== 0) {
        addRequest();
    }

});

// vote stuff

// function to disable vote button, display updated vote count, and change style of button
function voting() {
    // put event checker on request list buttons
    $(".request-list").on("click", ".vote-button", function () {
        // get the book title
        var sibling = $(this).prev()
        var title = sibling.find("h3").text()

        // get the count and update
        var voteCountElem = $(this).find(".vote-count")
        var currentCount = parseInt(voteCountElem.text())
        voteCountElem.text(currentCount + 1)

        // update the button and disable
        $(this).addClass("voted")
        $(this).prop("disabled", true)

        // add message of vote
        var messageElement = $("<p>").addClass("vote-thanks").text("Thanks for voting! We recorded your vote for " + title + ".")
        sibling.append(messageElement)

    })
}

// function to add a request to the list
/// prevents the refrsh of the page, gets the information from the form elements, builds a new form-list item and appends
function addRequest() {
    // event handler on form
    $("#request-form").on("submit", function (event) {
        // don't refresh
        event.preventDefault()

        // get the info from the tags
        var title = $(this).find("#req-title").val().trim()
        var author = $(this).find("#req-author").val().trim()

        // build new element
        var newItemElement = $("<li>").addClass("request")
        var infoDiv = $("<div>")
        infoDiv.append($("<h3>").text(title))
        infoDiv.append($("<p>").text(author))
        infoDiv.append($("<p>").addClass("request-by").text("Requested by you"))

        var voteBtn = $("<button>").attr("type", "button").addClass("vote-button")
        voteBtn.html('Vote (<span class="vote-count">0</span>)')

        newItemElement.append(infoDiv)
        newItemElement.append(voteBtn)

        // append the request to the request list
        var requestList = $(".request-list")
        requestList.append(newItemElement)

        // update the form boxes to be empty and button to be right
        $(this).find("#req-title").val("")
        $(this).find("#req-author").val("")
        $(this).find("#req-reason").val("")
        $(this).find("button").text("Send another request");


    })
}