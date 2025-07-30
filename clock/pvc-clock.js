   
class PVCClock
{
    constructor(id='pvcClock', format='hh:mm:ss', options={color: 'rgba(255,255,255,0.8)', fontSize: '40px'})
    {
        this.id = id;
        this.options = options;
    }

    init()
    {
        this.format = format;
        this.clockElement = this.renderClock();
        document.body.appendChild(this.clockElement);
        document.getElementById(this.id + '_Clock_Gio').textContent = '00';
        document.getElementById(this.id + '_Clock_Phut').textContent = '00';
        document.getElementById(this.id + '_Clock_Tick').textContent = ':';
        document.getElementById('Clock_Network_Error').style.display = 'none';
        setInterval(function(){flashTick();},1000);
        this.updateTime();
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

    
    function flashTick()
    {
        document.getElementById(this.id + '_Clock_Tick').textContent = ':';
        setTimeout(function()
        {
            document.getElementById(this.id + '_Clock_Tick').textContent = '';
        },500);
    }

    function updateTime()
    {
        var now = new Date();
        var hours = now.getHours().toString().padStart(2, '0');
        var minutes = now.getMinutes().toString().padStart(2, '0');
        var seconds = now.getSeconds().toString().padStart(2, '0');

        document.getElementById(this.id + '_Clock_Gio').textContent = hours;
        document.getElementById(this.id + '_Clock_Phut').textContent = minutes;
        
        if (this.format == 'hh:mm:ss') 
        {
            document.getElementById(this.id + '_Clock_Giay').textContent = seconds;
        }
    }
    
}



document.write(renderClock());


