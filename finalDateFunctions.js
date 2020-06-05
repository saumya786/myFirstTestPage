var arr= ["America/Indiana/Indianapolis","America/New_York","America/Chicago","Asia/Calcutta"];
var offset= [-5,-5,-6,5.5];
var offsetWithDST= [-4,-4,-5,5.5];
arr.forEach((value)=>{
    let option1= document.createElement('option');
    option1.appendChild(document.createTextNode(value));
    let option2= document.createElement('option');
    option2.appendChild(document.createTextNode(value));
    document.getElementById('timeZones1').appendChild(option1);
    document.getElementById('timeZones2').appendChild(option2);
});
/**
 * @description This function is mainly used to find number of particular day in a week
 * @param {Date} start Start Date From When the Date is to be Calculated
 * @param {Date} end End Date Upto Which the number of days is to be Found
 * @param {Number} dayNum Numbering of the day is Done in this Manner Sunday= 0, Monday = 1, and so on
 * @returns {Number} Number of Days present in the interval
 */
function getNumberOfWeekDays(start, end, dayNum= 0){
    dayNum = dayNum || 0;
    var daysInInterval = Math.ceil((end.getTime() - start.getTime()) / (1000 * 3600 * 24));
    var toNextTargetDay = (7 + dayNum - start.getDay()) % 7;
    var daysFromFirstTargetDay = Math.max(daysInInterval - toNextTargetDay, 0);
    return Math.ceil(daysFromFirstTargetDay / 7);
}
/**
 * This function is used to find the changed Date and Set the Date Accordingly
 * @param {Number} timeVal The Particular Block which is to be converted
 */
function changeDate(timeVal){
    let currentTime= null,timeToBeSet= null,timeZone1= null,timeZoneToBeConverted= null;
    if(timeVal==1){
        currentTime= new Date(document.getElementById('time1').value);
        console.log(currentTime);
        timeToBeSet= document.getElementById('time2');
        timeZone1= document.getElementById('timeZones1').selectedIndex;
        timeZoneToBeConverted= document.getElementById('timeZones2').selectedIndex;
    }
    else if(timeVal==2){
        currentTime= new Date(document.getElementById('time2').value);
        timeToBeSet= document.getElementById('time1');
        timeZone1= document.getElementById('timeZones2').selectedIndex;
        timeZoneToBeConverted= document.getElementById('timeZones1').selectedIndex;
    }
    let currentMonth= currentTime.getMonth()+1;
    let utcOffset= 0;
    if(currentMonth==3){
        if(currentTime.getDate()<=14){
            let OnlyDate= new Date(currentTime.getFullYear(),currentTime.getMonth(),currentTime.getDate());
            let StartingDate= new Date(currentTime.getFullYear(),currentTime.getMonth(),1);
            let numberOfSundays= getNumberOfWeekDays(StartingDate,OnlyDate);
            if(OnlyDate.getDay()==0)
                numberOfSundays+=1;
            if(numberOfSundays>=2)
                utcOffset= offsetWithDST[timeZone1];
            else
                utcOffset= offset[timeZone1];
        }
        else{
            utcOffset= offsetWithDST[timeZone1];
        }
    }
    else if(currentMonth>3 && currentMonth<11){
        utcOffset= offsetWithDST[timeZone1];
    }
    else if(currentMonth==11){
        if(currentTime.getDate()<=7){
            let OnlyDate= new Date(currentTime.getFullYear(),currentTime.getMonth(),currentTime.getDate());
            let StartingDate= new Date(currentTime.getFullYear(),currentTime.getMonth(),1);
            let numberOfSundays= getNumberOfWeekDays(StartingDate,OnlyDate);
            if(OnlyDate.getDay()==0)
                numberOfSundays+=1;
            if(numberOfSundays>=2)
                utcOffset= offsetWithDST[timeZone1];
            else
                utcOffset= offset[timeZone1];
        }
        else{
            utcOffset= offsetWithDST[timeZone1];
        }
    }
    else{
        utcOffset= offset[timeZone1];
    }
    let tempDateString= currentTime.toLocaleString('en-US') + " UTC";
    let dateObjectForCurrentTime = new Date(tempDateString);
    console.log(dateObjectForCurrentTime.toUTCString());
    let utcDateInMiliSeconds= dateObjectForCurrentTime.getTime() - (utcOffset * 3600 * 1000);
    let utcDate= new Date(utcDateInMiliSeconds);
    let convertedDateString= utcDate.toLocaleString("en-US",{timeZone: arr[timeZoneToBeConverted]})+" UTC";
    let convertedDate= new Date(convertedDateString);
    console.log(convertedDate);
    let convertedDateStringJson= convertedDate.toJSON();
    console.log(convertedDateStringJson);
    timeToBeSet.value= convertedDateStringJson.substr(0,convertedDateStringJson.length-8);
    return false;
}
