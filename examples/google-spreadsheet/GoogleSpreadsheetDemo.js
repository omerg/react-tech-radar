import React, {useEffect, useState} from 'react';

import * as Tabletop from "tabletop";
import Radar from "../../src/components/Radar/Radar";

//Data fetched from tabletop is cached for this number of seconds.
const CACHE_TTL = 10;

const GOOGLE_SPREADSHEET_LINK = "https://docs.google.com/spreadsheets/d/1XkfUX8auztSkMoHwBEraDjHZgx7NEH59OyUZH-0IQGw/edit";

function GoogleSpreadSheetDemo() {

    //state variable data
    const [data, setData] = useState([]);

    const setup = {
        rings: ['adopt', 'assess', 'hold'],
        quadrants: ['back-end & infrastructure', 'front-end', 'tools', 'language-and-frameworks'],
        data: data,
        dataUrl: GOOGLE_SPREADSHEET_LINK
    };

    //effect is used to fetch data
    //when component is mounted.
    useEffect(() => {

        const getDataFromCache = (cacheKey) => {

            const scheduleInvalidate = (timeToLive) => {

                const radarCache = setTimeout(() => {
                    console.log("Radar cache invalidated: " + radarCache);
                    localStorage.removeItem("RADAR_DATA_" + setup.dataUrl);
                }, timeToLive * 1000);
                console.log("Radar cache set: " + radarCache);
            };

            //fetch data from google spreadsheets via tabletop
            //and store it in state
            const getFromTableTop = () => {
                Tabletop.init({
                    key: cacheKey,
                    callback: (data) => {

                        //update state
                        setData(data);

                        //update cache
                        localStorage.setItem("RADAR_DATA_" + setup.dataUrl, JSON.stringify(data));

                        //clean cache when expired
                        scheduleInvalidate(CACHE_TTL);

                    },
                    simpleSheet: true
                });
            };

            //get from cache or fetch from spreadsheet
            const cachedData = localStorage.getItem("RADAR_DATA_" + setup.dataUrl);
            if (cachedData) {

                console.log("Cache hit");
                setData(JSON.parse(cachedData));

                //clean cache when expired
                scheduleInvalidate(CACHE_TTL);
            } else {
                getFromTableTop();
            }
        };

        getDataFromCache(setup.dataUrl);

    }, [setup.dataUrl, CACHE_TTL]);

    return (
        <div className="App">
            <Radar {...setup} />
        </div>
    );

}

export default GoogleSpreadSheetDemo;
