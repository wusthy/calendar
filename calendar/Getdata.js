/**
 * Created by Administrator on 2017/4/29.
 */

function addOptions(parent,num){
    //var parent = document.getElementById(parent);
    if(num>2000){
        var len = num-2000;
        for(var i=0;i<=len;i++)
        {
            var option =new Option(String(num-i));
            //option.setAttribute('value',(num- i).toString());
            parent.options.add(option);
        }
    }else{
        parent.options.length=0;
        for(var i=0;i<num;i++)
        {
            var option = new Option(String(i+1));
            //option.setAttribute('value', i.toString());
            parent.options[i]=option;
        }
        //parent.find('')
    }
}

function isLeapYear(year)
{
   return (year%4 === 0 && year%100 !== 0) || year%400 === 0;
}

function Days(year,month){
    /*var Monthdays = {
        '1':31,
        '2':28,
        '3':31,
        '4':30,
        '5':31,
        '6':30,
        '7':31,
        '8':31,
        '9':30,
        '10':31,
        '11':30,
        '12':31
    };*/
    var Monthdays = [31,28,31,30,31,30,31,31,30,31,30,31];

    if(isLeapYear(year) && month === 2) {
        return 29;
    }else{
        return Monthdays[month-1];
    }
}

function Showclendar(year,month,day){
    var getdate = new Date(year+'-'+month+'-'+1);
    var Wday = getdate.getDay();
    var Hbody = document.getElementById('Ctbody');
    var rows = Hbody.rows;
    var days = Days(year,month);

    var rowcount = 0;
    for(var i=1;i<=days;i++)
    {
        rows[rowcount].cells[Wday].innerHTML =i;
        if(i === day)
        {
            rows[rowcount].cells[Wday].style.background = 'red';
        }
        if(Wday === 6)
        {
            rowcount++;
            Wday =0;
        }else{
            Wday++;
        }
    }
}
window.onload = function(){
    var currentdate = new Date(),
        year = currentdate.getFullYear(),
        month = currentdate.getMonth()+ 1,
        day = currentdate.getDate();
    var HYear = document.getElementById('Year'),
        HMonth = document.getElementById('Month'),
        HDay = document.getElementById('Day');
     addOptions(HYear,year);
     addOptions(HMonth,12);
     HMonth.options[month-1].selected = true;

    var MDays = Days(year,month)
     addOptions(HDay,MDays);
     //alert(HDay.options);
     HDay.options[day-1].selected = true;
    //Showclendar(year,month,day);
}

function Ychanged(){
    var year = getNum('Year');
    var month = getNum('Month');
    var days = Days(year,month);
    var Hday = document.getElementById('Day');
    addOptions(Hday,days);
}

function Cleartbody(){
    var tbody = document.getElementById('Ctbody');
    var rows = tbody.rows;
    //alert(rows.length)
    var rlen = rows.length,
        clen = rows[0].cells.length;

    for(var i =0;i<rlen;i++)
    {
        for(var j=0;j<clen;j++)
        {
            rows[i].cells[j].innerHTML='';
            rows[i].cells[j].style.cssText='';
        }
    }
}

function getNum(Num){
    var num = document.getElementById(Num);
    var index = num.selectedIndex;
    return parseInt(num.options[index].text);
}
function changeCalendar(){
    var year = getNum('Year');
    var month = getNum('Month');
    var day = getNum('Day');
    Cleartbody();
    Showclendar(year,month,day);
}
