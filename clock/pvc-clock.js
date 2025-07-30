   
class PVCClock
{
    constructor(id='pvcClock', format='hh:mm:ss', options={color: 'rgba(255,255,255,0.8)', fontSize: '40px'})
    {
        this.id = id;
        this.options = options;
    }

    function renderClock()
    {
        var clock = documecreateElement('div');
        clock.className = 'Clock';
        clock.style.color = this.options.color;
        clock.style.fontSize = this.options.fontSize;
            var tbl = document.createElement('table');
                var tr = document.createElement('tr');
                    var td1 = document.createElement('td');
                    td1.innerHTML = `<span id="${this.id}_Clock_Gio"></span>`;
                    var td2 = document.createElement('td');
                    td2.style.width = '10px';
                    td2.innerHTML = `<center><span id="${this.id}_Clock_Tick"></span></center>`;
                    var td3 = document.createElement('td');
                    td3.innerHTML = `<span id="${this.id}_Clock_Phut"></span>`;
                tr.appendChild(td1);
                tr.appendChild(td2);
                tr.appendChild(td3);
                    if (this.format == 'hh:mm:ss') 
                    {
                        var td4 = document.createElement('td');
                        td4.innerHTML = `<span id="${this.id}_Clock_Giay"></span>`;
                        tr.appendChild(td4);
                    }
                    var td5 = document.createElement('td');
                    td5.innerHTML = '<span id="Clock_Network_Error" style="color:orange;font-size:14px;display:none;">Mạng lỗi!</span><span id="Clock_Tick2"></span>';
                tr.appendChild(td5);
            tbl.appendChild(tr);
        clock.appendChild(tbl);
        return clock;
    }

    
    function TickFlash()
    {
        document.getElementById(this.id + '_Clock_Tick').textContent = ':';
        setTimeout(function()
        {
            document.getElementById(this.id + '_Clock_Tick').textContent = '';
        },500);
    }
    setInterval(function(){TickFlash();},1000);
}



document.write(renderClock());

function Clock_Init() {
    document.getElementById('Clock_Gio').textContent = '00';
    document.getElementById('Clock_Phut').textContent = '00';
    document.getElementById('Clock_Tick').textContent = ':';
    document.getElementById('Clock_Tick2').textContent = ':';
    document.getElementById('Clock_Network_Error').style.display = 'none';
}
Clock_Init();

function Clock_UpdateTime() {
    var field_name = '';
    var edit_id = '';
    var value = '';

    fetch('/giacuoc/clock/gettime.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `field=${encodeURIComponent(field_name)}&value=${encodeURIComponent(value)}&id=${encodeURIComponent(edit_id)}`
    })
    .then(response => response.text())
    .then(response => {
        var Tach = response.split(':');
        document.getElementById('Clock_Gio').textContent = Tach[0];
        document.getElementById('Clock_Phut').textContent = Tach[1];
        document.getElementById('Clock_Network_Error').style.display = 'none';
    })
    .catch(() => {
        document.getElementById('Clock_Network_Error').style.display = '';
    });
}
Clock_UpdateTime();
var Clock_UpdateTime_TimeOut;
Clock_UpdateTime_TimeOut = setInterval(function(){Clock_UpdateTime();},30000);


let ThoiGianDieuChinh = 90;
var TocDoDieuChinh = 2;
var SoLanDieuChinh = 0;
var DongBo_TimeOut;

function DongBoThoiGianVoiPC() {
    let SaiSo = 2;
    let SaiSoAm = -2;
    var date = new Date();
    var h = parseInt(date.getHours()); 
    var m = parseInt(date.getMinutes());

    var Gio = parseInt(document.getElementById('Clock_Gio').textContent);
    var Phut = parseInt(document.getElementById('Clock_Phut').textContent);

    if (h == Gio) {
        var LechPhut = m - Phut;
        if ((LechPhut > 0 && LechPhut <= SaiSo) || (LechPhut < 0 && LechPhut >= SaiSoAm)) {
            m = m < 10 ? '0' + m : m;
            document.getElementById('Clock_Phut').textContent = m;
            clearInterval(Clock_UpdateTime_TimeOut);
            Clock_UpdateTime_TimeOut = setInterval(function(){Clock_UpdateTime();},30000);
        }
    }

    SoLanDieuChinh = SoLanDieuChinh + 2;

    if (SoLanDieuChinh >= ThoiGianDieuChinh) {
        clearInterval(DongBo_TimeOut);
    }
}

DongBo_TimeOut = setInterval(function(){DongBoThoiGianVoiPC();},TocDoDieuChinh*1000);