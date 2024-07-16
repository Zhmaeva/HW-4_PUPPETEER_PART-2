Feature: Reserving a seat at the cinema
    Scenario: Booking a seat in a cinema
        Given user is on "http://qamid.tmweb.ru/client/index.php" page
        When user selects a date
        When user selects the movie and time
        When user selects a free seat
        When user clicks on the book button
        When user clicks on the get code button
        Then user get the code and text "Электронный билет"
    Scenario: Should not reserve occupied seats
        Given user is on "http://qamid.tmweb.ru/client/index.php" page
        When user selects a date
        When user selects the movie and time
        When user selects a occupied seat
        When user clicks on the disabled book button
        Then reserve button is not active
