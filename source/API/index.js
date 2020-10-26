import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

const QuoteOfDayAPI = async() => {
    
    function get_quote_of_the_day() {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
         if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.responseText);

            }
        };
        xhttp.open("GET", "https://quotes.rest/qod?category=inspire", true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.setRequestHeader("X-Theysaidso-Api-Secret", "myworkoutapp");
        xhttp.send();
    }

    try {
    } catch (error) {
        console.log(error)
    }
    
};

export default QuoteOfDayAPI;